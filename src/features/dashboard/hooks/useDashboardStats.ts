"use client";
import { useMemo } from "react";
import type { Event } from "@/features/events/types/event.types";
import type { User } from "@/features/users/types/user.types";
import type { DashboardStat } from "../types/dashboard.types";
export function useDashboardStats(events: Event[], users: User[]) {
  return useMemo<DashboardStat[]>(
    () => [
      {
        label: "Total Events",
        value: String(events.length),
        description: "Available on PlanCity",
      },
      {
        label: "Categories",
        value: String(new Set(events.map((event) => event.categoryId)).size),
        description: "Currently in use",
      },
      {
        label: "Users",
        value: String(users.length),
        description: "Registered users",
      },
      {
        label: "Capacity",
        value: events
          .reduce((total, event) => total + event.capacity, 0)
          .toLocaleString(),
        description: "Combined event capacity",
      },
    ],
    [events, users],
  );
}
