import EventExplorer from "@/features/events/components/EventExplorer";
import { categories, events } from "@/features/events/data/events.data";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-page px-6 text-fg theme-transition sm:px-16 lg:px-28">
      <section className="max-w-6xl pb-15 pt-35">
        <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-blue-500 sm:text-base">
          Your city. Your events.
        </p>
        <h1 className="mb-8 text-5xl font-extrabold leading-none tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
          Discover what&apos;s
          <span className="bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            happening
          </span>
          near you.
        </h1>
        <p className="theme-transition max-w-2xl text-lg leading-relaxed text-muted sm:text-xl md:text-2xl">
          <span>Browse events across music, sports, arts, food, and more.</span>
          <br />
          <span>Log in to save your favorites.</span>
        </p>
      </section>
      <EventExplorer events={events} categories={categories} />
    </main>
  );
}
