"use client";

import { useMemo, useState } from "react";
import type { Category, CreateEventInput, Event } from "../types/event.types";
import { events as globalEvents } from "../data/events.data";

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function useEventExplorer(initialEvents: Event[], categories: Category[]) {
  const [eventsList, setEventsList] = useState<Event[]>(initialEvents);
  const [query, setQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  const filteredEvents = useMemo(() => {
    const normalizedQuery = normalize(query.trim());

    return eventsList.filter((event) => {
      // Regla de negocio: solo los eventos aprobados por el admin son públicos
      if (event.status !== "APPROVED") return false;

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
  }, [eventsList, categories, query, selectedCategoryId]);

  const addEventAsClient = (input: CreateEventInput) => {
    const newEvent: Event = {
      id: String(Date.now()),
      name: input.name,
      description: input.description,
      date: input.date,
      location: input.location,
      price: input.price,
      capacity: input.capacity,
      categoryId: input.categoryId,
      status: "PENDING", // Nace en modo aprobación (Regla de negocio: Cliente)
      authorName: "Cliente Actual",
      images: [
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop&auto=format",
      ],
    };

    // Actualiza la lista local y la lista global compartida con el admin
    setEventsList((prev) => [newEvent, ...prev]);
    globalEvents.unshift(newEvent);
  };

  return {
    query,
    setQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    filteredEvents,
    addEventAsClient,
  };
}
