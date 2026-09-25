"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import type { CardEventProps } from "../types/event.types";

export default function CardEvent({
  event,
  categoryName = "General",
}: CardEventProps) {
  return (
    <div className="theme-card group mx-auto flex h-full w-full flex-col overflow-hidden rounded-3xl border border-theme bg-card shadow-2xl transition-transform hover:scale-[1.01]">
      <div className="theme-transition relative mx-3 mt-3 aspect-[16/10] w-auto overflow-hidden rounded-2xl bg-card-inner">
        <Image
          src={
            event.images?.[0] ||
            "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"
          }
          alt={event.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
        {categoryName && (
          <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-md">
            {categoryName}
          </span>
        )}
        <span className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
          {event.price === 0 ? "Free" : `$${event.price}`}
        </span>
      </div>
      <div className="theme-transition flex flex-1 flex-col justify-between px-5 pb-5 pt-4 text-fg">
        <div>
          <h3 className="mb-3 line-clamp-1 text-lg font-bold tracking-tight">
            {event.name}
          </h3>
          <div className="theme-transition mb-4 space-y-1.5 text-xs text-muted sm:text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-muted-2" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0 text-muted-2" />
              <span>{event.date}</span>
            </div>
          </div>
        </div>
        <div className="theme-transition flex items-center justify-between border-t border-theme pt-4">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Users className="h-4 w-4 text-muted-2" />
            <span>{event.capacity} capacity</span>
          </div>
          <Link
            href={`/events/${event.id}`}
            className="inline-flex h-11 items-center justify-center rounded-full border border-blue-500/40 bg-transparent px-4 py-1.5 text-center text-sm font-medium text-blue-400 transition-all hover:bg-blue-500 hover:text-white"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
