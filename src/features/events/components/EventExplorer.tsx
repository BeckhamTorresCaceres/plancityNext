"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import CardEvent from "./CardEvent";
import CategoryFilter from "./CategoryFilter";
import CreateEventModal from "./CreateEventModal";
import SearchBar from "./SearchBar";
import { useEventExplorer } from "../hooks/useEventExplorer";
import type { EventExplorerProps } from "../types/event.types";

export default function EventExplorer({
  events,
  categories,
}: EventExplorerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    query,
    setQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    filteredEvents,
    addEventAsClient,
  } = useEventExplorer(events, categories);

  return (
    <>
      <section className="space-y-8 pb-15 pt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="theme-transition flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-inverse px-5 py-3 text-sm font-semibold text-inverse shadow-md hover:opacity-90 sm:self-auto"
          >
            <PlusCircle size={18} />
            <span>Publicar evento</span>
          </button>
        </div>

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

      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
        onSubmitEvent={addEventAsClient}
      />
    </>
  );
}
