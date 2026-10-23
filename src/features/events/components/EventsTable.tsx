"use client";

import { Check, Clock, Search, X } from "lucide-react";
import { events } from "../data/events.data";
import { useAdminEvents, type AdminStatusFilter } from "../hooks/useAdminEvents";

export default function EventsTable() {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filteredEvents,
    counts,
    approveEvent,
    rejectEvent,
  } = useAdminEvents(events);

  const filterTabs: { id: AdminStatusFilter; label: string; count: number }[] = [
    { id: "ALL", label: "Todos", count: counts.all },
    { id: "PENDING", label: "Pendientes", count: counts.pending },
    { id: "APPROVED", label: "Aprobados", count: counts.approved },
    { id: "REJECTED", label: "Rechazados", count: counts.rejected },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Gestión de Eventos
          </h2>
          <p className="mt-1 text-sm text-[#8e8e93]">
            Revisa y modera las publicaciones enviadas por los clientes. Solo los eventos aprobados son públicos.
          </p>
        </div>
        {counts.pending > 0 && (
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-medium text-amber-300">
            <Clock size={14} className="animate-pulse" />
            <span>{counts.pending} {counts.pending === 1 ? "evento pendiente" : "eventos pendientes"} de aprobación</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Status filter tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`flex cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white text-black shadow-sm"
                    : "border border-white/8 bg-[#0a0a0a] text-[#8e8e93] hover:border-white/20 hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    isActive
                      ? "bg-black/10 text-black"
                      : tab.id === "PENDING" && tab.count > 0
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-white/10 text-[#8e8e93]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="flex w-full max-w-xs items-center gap-2 rounded-xl border border-white/8 bg-[#0a0a0a] px-3 py-2">
          <Search size={16} className="text-[#8e8e93]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por nombre, ciudad o autor..."
            className="w-full bg-transparent text-xs text-white outline-none placeholder:text-[#636366]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/8 bg-[#0a0a0a]">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="border-b border-white/8 text-[#8e8e93]">
            <tr>
              <th className="px-5 py-4 font-medium">Evento</th>
              <th className="px-5 py-4 font-medium">Publicado por</th>
              <th className="px-5 py-4 font-medium">Fecha / Ciudad</th>
              <th className="px-5 py-4 font-medium">Precio</th>
              <th className="px-5 py-4 font-medium">Estado</th>
              <th className="px-5 py-4 text-right font-medium">Acción (Admin)</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-[#8e8e93]">
                  No se encontraron eventos con los filtros seleccionados.
                </td>
              </tr>
            ) : (
              filteredEvents.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-white/6 transition-colors hover:bg-white/[0.02] last:border-0"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-white">{event.name}</p>
                    <p className="line-clamp-1 max-w-xs text-xs text-[#8e8e93]">
                      {event.description}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-xs text-[#a1a1aa]">
                    {event.authorName ?? "Cliente"}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xs text-white">{event.date}</p>
                    <p className="text-xs text-[#8e8e93]">{event.location}</p>
                  </td>
                  <td className="px-5 py-4 font-medium text-white">
                    ${event.price}
                  </td>
                  <td className="px-5 py-4">
                    {event.status === "PENDING" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                        Pendiente
                      </span>
                    )}
                    {event.status === "APPROVED" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Aprobado (Público)
                      </span>
                    )}
                    {event.status === "REJECTED" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                        Rechazado
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {event.status !== "APPROVED" && (
                        <button
                          type="button"
                          onClick={() => approveEvent(event.id)}
                          title="Aprobar evento para publicación"
                          className="flex cursor-pointer items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1.5 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20 hover:text-emerald-200"
                        >
                          <Check size={14} />
                          <span>Aprobar</span>
                        </button>
                      )}
                      {event.status !== "REJECTED" && (
                        <button
                          type="button"
                          onClick={() => rejectEvent(event.id)}
                          title="Rechazar evento"
                          className="flex cursor-pointer items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1.5 text-xs font-medium text-rose-300 transition-colors hover:bg-rose-500/20 hover:text-rose-200"
                        >
                          <X size={14} />
                          <span>Rechazar</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
