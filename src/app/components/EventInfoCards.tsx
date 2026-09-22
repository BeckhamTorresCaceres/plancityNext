import { Calendar, Clock, Users } from "lucide-react";
import { EventInfoCardsProps } from "@/app/interfaces/type";


export default function EventInfoCards({ event }: EventInfoCardsProps) {
  return (
    <section aria-label="Detalles del evento" className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-14">
      <article className="theme-transition bg-card border border-theme rounded-2xl p-5 flex flex-col justify-between h-32 shadow-xl">
        <Calendar className="w-5 h-5 text-purple-400" aria-hidden="true" />
        <div>
          <span className="block text-xs font-semibold text-muted tracking-wider uppercase mb-0.5">
            Date
          </span>
          <time dateTime={event.date} className="text-base sm:text-lg font-bold text-fg tracking-tight block">
            {event.date}
          </time>
        </div>
      </article>

      <article className="theme-transition bg-card border border-theme rounded-2xl p-5 flex flex-col justify-between h-32 shadow-xl">
        <Clock className="w-5 h-5 text-purple-400" aria-hidden="true" />
        <div>
          <span className="block text-xs font-semibold text-muted tracking-wider uppercase mb-0.5">
            Time
          </span>
          <time dateTime="22:00" className="text-base sm:text-lg font-bold text-fg tracking-tight block">
            10:00 PM
          </time>
        </div>
      </article>

      <article className="theme-transition bg-card border border-theme rounded-2xl p-5 flex flex-col justify-between h-32 shadow-xl">
        <Users className="w-5 h-5 text-purple-400" aria-hidden="true" />
        <div>
          <span className="block text-xs font-semibold text-muted tracking-wider uppercase mb-0.5">
            Attending
          </span>
          <p className="text-base sm:text-lg font-bold text-fg tracking-tight">
            {event.capacity}
          </p>
        </div>
      </article>
    </section>
  );
}
