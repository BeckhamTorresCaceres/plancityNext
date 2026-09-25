"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import type { AdminSection } from "../types/admin.types";

const SECTION_BY_PATH: Record<string, AdminSection> = {
  "/admin": "dashboard",
  "/admin/events": "events",
  "/admin/users": "users",
  "/admin/categories": "categories",
};

export function useAdminNavigation() {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const section = SECTION_BY_PATH[pathname] ?? "dashboard";

  return {
    section,
    sidebarCollapsed,
    toggleSidebar: () => setSidebarCollapsed((current) => !current),
  };
}
