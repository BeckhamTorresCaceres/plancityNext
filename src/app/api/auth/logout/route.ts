import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revokeSession } from "@/server/modules/auth/session.service";
import {
  clearSessionCookie,
  SESSION_COOKIE_NAME,
} from "@/server/security/session-cookie";
import { isSameOriginRequest } from "@/server/security/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "INVALID_ORIGIN" }, { status: 403 });
  }

  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (token) {
    try {
      await revokeSession(token);
    } catch {
      const response = NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
      clearSessionCookie(response);
      return response;
    }
  }

  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response);
  return response;
}
