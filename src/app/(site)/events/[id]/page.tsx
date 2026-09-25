import { redirect } from "next/navigation";
import BackButton from "@/features/events/components/BackButton";
import EventInfoCards from "@/features/events/components/EventInfoCards";
import EventPoster from "@/features/events/components/EventPoster";
import { categories, events } from "@/features/events/data/events.data";

export default async function EventsDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = events.find((item) => item.id === id);
  if (!event) redirect("/");
  const category = categories.find((item) => item.id === event.categoryId);

  return (
    <main className="min-h-screen bg-page px-4 py-8 text-fg theme-transition sm:px-12 lg:px-20">
      <div className="mb-6 pt-18">
        <BackButton />
      </div>
      <section
        id="details"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-6"
      >
        <EventPoster event={event} category={category} />
        <EventInfoCards event={event} />
        <section className="mt-2 space-y-3 border-t border-theme pt-8">
          <h2 className="theme-transition text-4xl font-bold tracking-tight text-fg">
            About this event
          </h2>
          <p className="theme-transition text-xl leading-relaxed text-muted">
            {event.description}
          </p>
        </section>
      </section>
    </main>
  );
}
