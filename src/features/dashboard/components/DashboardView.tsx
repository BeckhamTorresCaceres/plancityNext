"use client";
import { CalendarDays, Users, Tags, Gauge } from "lucide-react";
import { events } from "@/features/events/data/events.data";
import { users } from "@/features/users/data/users.data";
import { useDashboardStats } from "../hooks/useDashboardStats";
export default function DashboardView() {
  const stats = useDashboardStats(events, users);
  const icons = [CalendarDays, Tags, Users, Gauge];
  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
        <p className="mt-1 text-sm text-[#8e8e93]">
          A quick look at the current PlanCity data.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = icons[index];
          return (
            <article
              key={stat.label}
              className="rounded-2xl border border-white/8 bg-[#0a0a0a] p-5"
            >
              <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/6 text-[#0a84ff]">
                <Icon size={18} />
              </div>
              <p className="text-3xl font-bold tracking-tight text-white">
                {stat.value}
              </p>
              <h3 className="mt-2 text-sm font-medium text-white">
                {stat.label}
              </h3>
              <p className="mt-1 text-xs text-[#636366]">{stat.description}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
