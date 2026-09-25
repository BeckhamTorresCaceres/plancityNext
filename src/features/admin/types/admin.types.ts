import type { LucideIcon } from "lucide-react";

export type AdminSection = "dashboard" | "events" | "users" | "categories";

export interface AdminNavigationItem {
  id: AdminSection;
  label: string;
  icon: LucideIcon;
}

export interface AdminLayoutProps {
  children: React.ReactNode;
}

export interface AdminSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export interface AdminTopbarProps {
  title: string;
}
