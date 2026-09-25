"use client";

import Image from "next/image";
import { Heart, Share2 } from "lucide-react";
import { useEventPoster } from "../hooks/useEventPoster";
import type { EventPosterProps } from "../types/event.types";

export default function EventPoster({ event, category }: EventPosterProps) {
  const { isFavorite, toggleFavorite, shareEvent } = useEventPoster();

  return (
    <section className="theme-transition group relative flex h-[500px] w-full flex-col justify-between overflow-hidden rounded-3xl border border-theme bg-card-inner p-6 shadow-2xl sm:h-[580px] sm:p-8">
      <Image
        src={
          event.images?.[0] ||
          "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"
        }
        alt={event.name}
        fill
        sizes="100vw"
        className="absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/20" />
      <div className="relative z-10 flex items-center justify-between">
        {category && (
          <span className="rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-md">
            {category.name}
          </span>
        )}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleFavorite}
            className={`cursor-pointer rounded-full border p-2.5 backdrop-blur-md transition-colors ${isFavorite ? "border-red-500 bg-red-500 text-white" : "border-white/10 bg-black/40 text-gray-200 hover:bg-black/60 hover:text-white"}`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
          <button
            type="button"
            onClick={() => shareEvent(event.name, event.description)}
            className="cursor-pointer rounded-full border border-white/10 bg-black/40 p-2.5 text-white transition-colors hover:bg-black/60"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="relative z-10 flex flex-col gap-1.5">
        <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl">
          {event.name}
        </h1>
        <p className="text-sm font-medium text-gray-300 drop-shadow sm:text-base">
          {event.location}
        </p>
      </div>
    </section>
  );
}
