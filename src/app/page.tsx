import EventExplorer from "./components/EventExplorer";
import { categories, events } from "./data/data";

export default function Home() {
  return (
    <main className="min-h-screen bg-page text-fg theme-transition flex flex-col justify-center px-6 sm:px-16 lg:px-28">
      <section className="max-w-6xl pt-35 pb-15">
        <p className="text-blue-500 text-sm sm:text-base font-semibold tracking-widest uppercase mb-6">
          Your city. Your events.
        </p>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-none mb-8">
          Discover what&apos;s{' '}
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            happening
          </span>{' '}
          near you.
        </h1>

        <p className="theme-transition text-muted text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed space-y-1">
          <span>Browse events across music, sports, arts, food, and more.</span>
          <br />
          <span>Log in to save your favorites.</span>
        </p>
      </section>

      <EventExplorer events={events} categories={categories} />
    </main>
  );
}
