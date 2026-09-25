"use client";
import { useMemo } from "react";
import type { Category, Event } from "@/features/events/types/event.types";
import type { CategoryStats } from "../types/category.types";
export function useCategoryStats(categories: Category[], events: Event[]) {
  return useMemo<CategoryStats[]>(
    () =>
      categories.map((category) => ({
        ...category,
        eventCount: events.filter((event) => event.categoryId === category.id)
          .length,
      })),
    [categories, events],
  );
}
