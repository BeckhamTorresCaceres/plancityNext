"use client";
import { useMemo } from "react";
import type { Event } from "@/features/events/types/event.types";
import type { User } from "@/features/users/types/user.types";
import type { DashboardStat } from "../types/dashboard.types";
export function useDashboardStats(events: Event[], users: User[]) {
  return useMemo<DashboardStat[]>(
    () => [
      {
        label: "Eventos Aprobados",
        value: String(events.filter((e) => e.status === "APPROVED").length),
        description: "Públicos en la plataforma",
      },
      {
        label: "Por Aprobar",
        value: String(events.filter((e) => e.status === "PENDING").length),
        description: "Enviados por clientes",
      },
      {
        label: "Usuarios Registrados",
        value: String(users.length),
        description: "Clientes y administradores",
      },
      {
        label: "Categorías",
        value: String(new Set(events.map((event) => event.categoryId)).size),
        description: "Actualmente en uso",
      },
    ],
    [events, users],
  );
}
