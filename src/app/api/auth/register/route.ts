import { NextResponse } from "next/server";
import { registerUser } from "@/server/modules/auth/auth.service";
import { checkAuthRateLimit } from "@/server/security/rate-limit";
import {
  isSameOriginRequest,
  readJson,
  registerSchema,
} from "@/server/security/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "INVALID_ORIGIN" }, { status: 403 });
  }

  const body = await readJson(request);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_INPUT", details: parsed.error.issues.map(({ path, message }) => ({ path, message })) },
      { status: 400 },
    );
  }

  const retryAfter = checkAuthRateLimit(
    request,
    "register",
    parsed.data.email,
    5,
    60 * 60 * 1_000,
  );
  if (retryAfter !== null) {
    return NextResponse.json(
      { error: "RATE_LIMITED" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  try {
    await registerUser(parsed.data);
    return NextResponse.json(
      {
        message:
          "Si el correo puede registrarse, la cuenta está lista. Intenta iniciar sesión para continuar.",
      },
      { status: 202 },
    );
  } catch {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
