"use client";

import { useMemo, useState } from "react";
import type { Event } from "../types/event.types";

export function useAdminEvents(initialEvents: Event[]) {
  const [search, setSearch] = useState("");
  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return initialEvents;
    return initialEvents.filter((event) =>
      `${event.name} ${event.location}`.toLowerCase().includes(query),
    );
  }, [initialEvents, search]);
  return { search, setSearch, filteredEvents };
}
