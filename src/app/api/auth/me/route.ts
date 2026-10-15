import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSessionUser } from "@/server/modules/auth/auth.service";
import {
  clearSessionCookie,
  SESSION_COOKIE_NAME,
} from "@/server/security/session-cookie";

export const runtime = "nodejs";

export async function GET() {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  try {
    const user = await getSessionUser(token);
    if (!user) {
      const response = NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
      clearSessionCookie(response);
      return response;
    }

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
