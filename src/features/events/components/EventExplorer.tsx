"use client";

import CardEvent from "./CardEvent";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";
import { useEventExplorer } from "../hooks/useEventExplorer";
import type { EventExplorerProps } from "../types/event.types";

export default function EventExplorer({
  events,
  categories,
}: EventExplorerProps) {
  const {
    query,
    setQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    filteredEvents,
  } = useEventExplorer(events, categories);

  return (
    <>
      <section className="space-y-8 pb-15 pt-10">
        <SearchBar value={query} onChange={setQuery} />
        <CategoryFilter
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />
      </section>
      <section className="pb-40">
        {filteredEvents.length === 0 ? (
          <p className="theme-transition py-16 text-center text-muted">
            No events match your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => {
              const category = categories.find(
                (item) => item.id === event.categoryId,
              );
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
