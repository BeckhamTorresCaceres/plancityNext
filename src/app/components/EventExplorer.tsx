'use client';

import { useMemo, useState } from "react";
import CardEvent from "./CardEvent";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";
import { Category, Event } from "@/app/interfaces/type";

interface EventExplorerProps {
  events: Event[];
  categories: Category[];
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function EventExplorer({ events, categories }: EventExplorerProps) {
  const [query, setQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  const filteredEvents = useMemo(() => {
    const q = normalize(query.trim());

    return events.filter((event) => {
      const category = categories.find((cat) => cat.id === event.categoryId);
      const matchesCategory =
        selectedCategoryId === "all" || event.categoryId === selectedCategoryId;

      if (!matchesCategory) return false;
      if (!q) return true;

      const haystack = [
        event.name,
        event.location,
        event.description,
        category?.name ?? "",
      ]
        .map(normalize)
        .join(" ");

      return haystack.includes(q);
    });
  }, [events, categories, query, selectedCategoryId]);

  return (
    <>
      <section className="pt-10 pb-15 space-y-8">
        <SearchBar value={query} onChange={setQuery} />
        <CategoryFilter
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />
      </section>

      <section className="pb-40">
        {filteredEvents.length === 0 ? (
          <p className="theme-transition text-muted text-center py-16">
            No events match your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const category = categories.find((cat) => cat.id === event.categoryId);

              return (
                <CardEvent
                  key={event.id}
                  event={event}
                  categoryName={category?.name}
                />
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
