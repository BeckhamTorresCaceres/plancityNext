'use client';

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-2 theme-transition" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search events, cities, categories..."
        aria-label="Search events, cities, categories"
        className="theme-transition w-full rounded-full border border-theme bg-input py-3 pl-12 pr-5 text-sm text-fg outline-none focus:border-[var(--border-hover)]"
      />
    </div>
  );
}
