"use client";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import { ADMIN_SECTION_TITLES } from "../constants/admin-navigation";
import { useAdminNavigation } from "../hooks/useAdminNavigation";
import type { AdminLayoutProps } from "../types/admin.types";

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { section, sidebarCollapsed, toggleSidebar } = useAdminNavigation();

  return (
    <div className="flex h-screen overflow-hidden bg-black text-white">
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AdminTopbar title={ADMIN_SECTION_TITLES[section]} />
        <main className="min-h-0 flex-1 overflow-y-auto bg-black p-7">
          {children}
        </main>
      </div>
    </div>
  );
}
