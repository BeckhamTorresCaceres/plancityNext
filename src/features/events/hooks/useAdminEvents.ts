"use client";

import { useMemo, useState } from "react";
import type { Event, EventStatus } from "../types/event.types";

export type AdminStatusFilter = "ALL" | EventStatus;

export function useAdminEvents(initialEvents: Event[]) {
  const [eventsList, setEventsList] = useState<Event[]>(initialEvents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminStatusFilter>("ALL");

  const counts = useMemo(() => {
    return {
      all: eventsList.length,
      pending: eventsList.filter((e) => e.status === "PENDING").length,
      approved: eventsList.filter((e) => e.status === "APPROVED").length,
      rejected: eventsList.filter((e) => e.status === "REJECTED").length,
    };
  }, [eventsList]);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return eventsList.filter((event) => {
      const matchesStatus =
        statusFilter === "ALL" || event.status === statusFilter;
      if (!matchesStatus) return false;

      if (!query) return true;
      return `${event.name} ${event.location} ${event.authorName ?? ""}`
        .toLowerCase()
        .includes(query);
    });
  }, [eventsList, search, statusFilter]);

  const approveEvent = (id: string) => {
    setEventsList((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "APPROVED" as EventStatus } : e)),
    );
  };

  const rejectEvent = (id: string) => {
    setEventsList((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "REJECTED" as EventStatus } : e)),
    );
  };

  return {
    eventsList,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filteredEvents,
    counts,
    approveEvent,
    rejectEvent,
  };
}
