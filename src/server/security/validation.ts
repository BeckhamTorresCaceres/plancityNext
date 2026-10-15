import { z } from "zod";

const email = z.string().trim().toLowerCase().email().max(254);

export const registerSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email,
  password: z.string().min(12).max(128),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1).max(128),
});

export async function readJson(request: Request): Promise<unknown | null> {
  const maxBytes = 8_192;
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > maxBytes) return null;
  if (!request.body) return null;

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } catch {
    return null;
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  const body = new TextDecoder().decode(bytes);

  try {
    return JSON.parse(body) as unknown;
  } catch {
    return null;
  }
}

export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).origin === new URL(request.url).origin;
    } catch {
      return false;
    }
  }

  const fetchSite = request.headers.get("sec-fetch-site");
  return fetchSite === "same-origin" || fetchSite === "none";
}
