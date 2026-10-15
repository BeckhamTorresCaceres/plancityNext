import { createHash, randomBytes } from "node:crypto";
import { getPrisma } from "@/server/db/prisma";

export const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1_000;

export function hashSessionToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await getPrisma().sessions.create({
    data: {
      user_id: userId,
      token_hash: hashSessionToken(token),
      expires_at: expiresAt,
    },
  });

  return { token, expiresAt };
}

export async function revokeSession(token: string): Promise<void> {
  await getPrisma().sessions.updateMany({
    where: {
      token_hash: hashSessionToken(token),
      revoked_at: null,
    },
    data: { revoked_at: new Date() },
  });
}
