"use client";

import { useMemo, useState } from "react";
import type { Category, Event } from "../types/event.types";

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function useEventExplorer(events: Event[], categories: Category[]) {
  const [query, setQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  const filteredEvents = useMemo(() => {
    const normalizedQuery = normalize(query.trim());

    return events.filter((event) => {
      const category = categories.find((item) => item.id === event.categoryId);
      const matchesCategory =
        selectedCategoryId === "all" || event.categoryId === selectedCategoryId;

      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;

      return [
        event.name,
        event.location,
        event.description,
        category?.name ?? "",
      ]
        .map(normalize)
        .join(" ")
        .includes(normalizedQuery);
    });
  }, [events, categories, query, selectedCategoryId]);

  return {
    query,
    setQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    filteredEvents,
  };
}
