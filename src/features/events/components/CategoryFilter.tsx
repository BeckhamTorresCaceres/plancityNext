"use client";

import type { CategoryFilterProps } from "../types/event.types";

export default function CategoryFilter({
  categories,
  selectedId,
  onSelect,
}: CategoryFilterProps) {
  const items = [{ id: "all", name: "All" }, ...categories];
  return (
    <nav
      className="theme-transition w-full overflow-x-auto border-y border-theme"
      aria-label="Filter by category"
    >
      <ul className="flex min-w-max items-center justify-between px-1 py-3">
        {items.map((item) => {
          const isActive = selectedId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                className={`cursor-pointer whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ${isActive ? "border border-green-500 text-green-500" : "border border-transparent text-muted hover:text-fg"}`}
              >
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
