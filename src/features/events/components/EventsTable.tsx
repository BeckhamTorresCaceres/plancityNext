"use client";

import { Search } from "lucide-react";
import { events } from "../data/events.data";
import { useAdminEvents } from "../hooks/useAdminEvents";

export default function EventsTable() {
  const { search, setSearch, filteredEvents } = useAdminEvents(events);
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Events</h2>
        <p className="mt-1 text-sm text-[#8e8e93]">
          Manage the events published on PlanCity.
        </p>
      </div>
      <div className="flex max-w-md items-center gap-2 rounded-xl border border-white/8 bg-[#0a0a0a] px-3 py-2.5">
        <Search size={16} className="text-[#8e8e93]" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search events..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#636366]"
        />
      </div>
      <div className="overflow-x-auto rounded-2xl border border-white/8 bg-[#0a0a0a]">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-white/8 text-[#8e8e93]">
            <tr>
              <th className="px-5 py-4 font-medium">Event</th>
              <th className="px-5 py-4 font-medium">Date</th>
              <th className="px-5 py-4 font-medium">Location</th>
              <th className="px-5 py-4 font-medium">Capacity</th>
              <th className="px-5 py-4 font-medium">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr
                key={event.id}
                className="border-b border-white/6 last:border-0"
              >
                <td className="px-5 py-4 font-medium text-white">
                  {event.name}
                </td>
                <td className="px-5 py-4 text-[#8e8e93]">{event.date}</td>
                <td className="px-5 py-4 text-[#8e8e93]">{event.location}</td>
                <td className="px-5 py-4 text-[#8e8e93]">{event.capacity}</td>
                <td className="px-5 py-4 text-white">${event.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
