import { CalendarDays, Grid2X2, Tag, Users } from "lucide-react";
import type { AdminNavigationItem, AdminSection } from "../types/admin.types";

export const ADMIN_NAVIGATION: AdminNavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Grid2X2 },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "users", label: "Users", icon: Users },
  { id: "categories", label: "Categories", icon: Tag },
];

export const ADMIN_SECTION_TITLES: Record<AdminSection, string> = {
  dashboard: "Dashboard",
  events: "Events",
  users: "Users",
  categories: "Categories",
};
