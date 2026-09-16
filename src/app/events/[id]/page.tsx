import BackButton from "@/app/components/Backbutton";
import { events, categories } from "@/app/data/data";
import { Props } from "@/app/interfaces/type";
import { redirect } from "next/navigation";
import EventPoster from "@/app/components/EventPoster";
import EventInfoCards from "@/app/components/EventInfoCards";

export default async function EventsDetails({ params }: Props) {
    const { id } = await params;
    const event = events.find((p) => p.id === id);

    if (!event) {
        redirect("/");
    }

    const category = categories.find((c) => c.id === event.categoryId);

    return (
        <main className="min-h-screen bg-black text-white px-4 sm:px-12 lg:px-20 py-8">
            <div className="pt-18 mb-6">
                <BackButton />
            </div>
            
            <section
                id="details"
                className="w-full max-w-[90rem] mx-auto flex flex-col gap-6"
            >
                {/* Poster grande */}
                <EventPoster
                    event={event}
                    category={category}
                />

                {/* Información del evento */}
                <EventInfoCards event={event} />

                {/* Sección Sobre el evento */}
                <section className="space-y-3 mt-2 pt-8">
                    <h2 className="text-4xl font-bold tracking-tight text-white">
                        About this event
                    </h2>
                    <p className="text-gray-400 text-xl leading-relaxed">
                        {event.description}
                    </p>
                </section>
            </section>
        </main>
    );
}