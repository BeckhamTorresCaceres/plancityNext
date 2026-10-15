import "server-only";
import { cookies } from "next/headers";
import { getSessionUser, type SafeUser } from "@/server/modules/auth/auth.service";
import { isAdmin } from "@/server/security/permissions";
import { SESSION_COOKIE_NAME } from "@/server/security/session-cookie";

export class AuthorizationError extends Error {
  constructor(public readonly status: 401 | 403) {
    super(status === 401 ? "UNAUTHENTICATED" : "FORBIDDEN");
    this.name = "AuthorizationError";
  }
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return getSessionUser(token);
}

export async function requireUser(): Promise<SafeUser> {
  const user = await getCurrentUser();
  if (!user) throw new AuthorizationError(401);
  return user;
}

export async function requireAdmin(): Promise<SafeUser> {
  const user = await requireUser();
  if (!isAdmin(user)) throw new AuthorizationError(403);
  return user;
}
