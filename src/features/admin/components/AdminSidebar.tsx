"use client";

import Link from "next/link";
import { ChevronLeft, LogOut } from "lucide-react";
import { ADMIN_NAVIGATION } from "../constants/admin-navigation";
import { useAdminNavigation } from "../hooks/useAdminNavigation";
import type { AdminSidebarProps } from "../types/admin.types";

export default function AdminSidebar({
  collapsed,
  onToggleCollapse,
}: AdminSidebarProps) {
  const { section } = useAdminNavigation();

  return (
    <aside
      className={`flex h-screen shrink-0 flex-col overflow-hidden border-r border-white/8 bg-[#0a0a0a] transition-[width] duration-200 ${collapsed ? "w-16" : "w-55"}`}
    >
      <div
        className={`flex h-15 shrink-0 items-center gap-2.5 border-b border-white/8 ${collapsed ? "px-5" : "px-5"}`}
      >
        <Link
          href="/admin"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-[#0a84ff] to-[#bf5af2] text-[11px] font-bold text-white"
        >
          PC
        </Link>
        {!collapsed && (
          <span className="whitespace-nowrap text-[15px] font-semibold text-white">
            PlanCity Admin
          </span>
        )}
      </div>
      <nav className="flex-1 space-y-1 p-2.5">
        {ADMIN_NAVIGATION.map(({ id, label, icon: Icon }) => {
          const active = section === id;
          return (
            <Link
              key={id}
              href={id === "dashboard" ? "/admin" : `/admin/${id}`}
              title={collapsed ? label : undefined}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${active ? "bg-white/10 text-white" : "text-[#8e8e93] hover:bg-white/5 hover:text-white"} ${collapsed ? "justify-center px-0" : ""}`}
            >
              <Icon size={17} strokeWidth={1.8} className="shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-1 border-t border-white/8 p-2.5">
        <button
          type="button"
          onClick={onToggleCollapse}
          title={collapsed ? "Expand" : "Collapse"}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#8e8e93] transition-colors hover:bg-white/5 hover:text-white ${collapsed ? "justify-center px-0" : ""}`}
        >
          <ChevronLeft
            size={16}
            className={`shrink-0 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
          />
          {!collapsed && <span>Collapse</span>}
        </button>
        <Link
          href="/"
          title={collapsed ? "Exit Admin" : undefined}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#ff453a] transition-colors hover:bg-white/5 ${collapsed ? "justify-center px-0" : ""}`}
        >
          <LogOut size={16} className="shrink-0" />
          {!collapsed && <span>Exit Admin</span>}
        </Link>
      </div>
    </aside>
  );
}
