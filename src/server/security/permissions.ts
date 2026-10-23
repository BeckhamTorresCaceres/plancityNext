import type { SafeUser } from "@/server/modules/auth/auth.service";

export function isAdmin(user: Pick<SafeUser, "role">): boolean {
  return user.role === "ADMIN";
}

export function isClient(user: Pick<SafeUser, "role">): boolean {
  return user.role === "USER";
}

export function canCreateEvents(user: Pick<SafeUser, "role">): boolean {
  return user.role === "USER" || user.role === "ADMIN";
}

export function canApproveEvents(user: Pick<SafeUser, "role">): boolean {
  return user.role === "ADMIN";
}

export function canPublishDirectly(user: Pick<SafeUser, "role">): boolean {
  return user.role === "ADMIN";
}
