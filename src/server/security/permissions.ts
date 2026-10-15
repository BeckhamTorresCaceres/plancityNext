import type { SafeUser } from "@/server/modules/auth/auth.service";

export function isAdmin(user: Pick<SafeUser, "role">): boolean {
  return user.role === "ADMIN";
}
