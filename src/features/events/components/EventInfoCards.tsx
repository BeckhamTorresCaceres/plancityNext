import { Calendar, Clock, Users } from "lucide-react";
import type { EventInfoCardsProps } from "../types/event.types";

export default function EventInfoCards({ event }: EventInfoCardsProps) {
  return (
    <section
      aria-label="Detalles del evento"
      className="grid w-full grid-cols-1 gap-4 pt-14 sm:grid-cols-3"
    >
      <article className="theme-transition flex h-32 flex-col justify-between rounded-2xl border border-theme bg-card p-5 shadow-xl">
        <Calendar className="h-5 w-5 text-purple-400" aria-hidden="true" />
        <div>
          <span className="mb-0.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Date
          </span>
          <time
            dateTime={event.date}
            className="block text-base font-bold tracking-tight text-fg sm:text-lg"
          >
            {event.date}
          </time>
        </div>
      </article>
      <article className="theme-transition flex h-32 flex-col justify-between rounded-2xl border border-theme bg-card p-5 shadow-xl">
        <Clock className="h-5 w-5 text-purple-400" aria-hidden="true" />
        <div>
          <span className="mb-0.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Time
          </span>
          <time
            dateTime="22:00"
            className="block text-base font-bold tracking-tight text-fg sm:text-lg"
          >
            10:00 PM
          </time>
        </div>
      </article>
      <article className="theme-transition flex h-32 flex-col justify-between rounded-2xl border border-theme bg-card p-5 shadow-xl">
        <Users className="h-5 w-5 text-purple-400" aria-hidden="true" />
        <div>
          <span className="mb-0.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Attending
          </span>
          <p className="text-base font-bold tracking-tight text-fg sm:text-lg">
            {event.capacity}
          </p>
        </div>
      </article>
    </section>
  );
}
