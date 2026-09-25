"use client";
import { categories } from "@/features/events/data/events.data";
import { events } from "@/features/events/data/events.data";
import { useCategoryStats } from "../hooks/useCategoryStats";
export default function CategoriesView() {
  const stats = useCategoryStats(categories, events);
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Categories</h2>
        <p className="mt-1 text-sm text-[#8e8e93]">
          Organize events by category.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((category) => (
          <article
            key={category.id}
            className="rounded-2xl border border-white/8 bg-[#0a0a0a] p-5"
          >
            <div className="mb-4 h-2 w-12 rounded-full bg-linear-to-r from-[#0a84ff] to-[#bf5af2]" />
            <h3 className="font-semibold text-white">{category.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#8e8e93]">
              {category.description}
            </p>
            <p className="mt-5 text-sm text-white">
              <span className="font-semibold">{category.eventCount}</span>{" "}
              events
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
