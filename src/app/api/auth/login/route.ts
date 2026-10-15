import { NextResponse } from "next/server";
import { loginUser } from "@/server/modules/auth/auth.service";
import { checkAuthRateLimit } from "@/server/security/rate-limit";
import { setSessionCookie } from "@/server/security/session-cookie";
import { isSameOriginRequest, loginSchema, readJson } from "@/server/security/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "INVALID_ORIGIN" }, { status: 403 });
  }

  const body = await readJson(request);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_INPUT", details: parsed.error.issues.map(({ path, message }) => ({ path, message })) },
      { status: 400 },
    );
  }

  const retryAfter = checkAuthRateLimit(
    request,
    "login",
    parsed.data.email,
    10,
    15 * 60 * 1_000,
  );
  if (retryAfter !== null) {
    return NextResponse.json(
      { error: "RATE_LIMITED" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  try {
    const result = await loginUser(parsed.data);
    if (!result) {
      return NextResponse.json(
        { error: "INVALID_CREDENTIALS", message: "Correo o contraseña incorrectos." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ user: result.user });
    setSessionCookie(response, result.token, result.expiresAt);
    return response;
  } catch {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
