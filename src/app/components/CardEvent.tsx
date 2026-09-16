'use client';

import { useState } from "react";
import Link from "next/link";
import { Heart, MapPin, Calendar, Users } from "lucide-react";
import {  Event } from "@/app/interfaces/type";

interface CardEventProps {
  event: Event;
  categoryName?: string;
  isFavorite?: boolean;
  onFavorite?: (id: string) => void;
}

export default function CardEvent({ event, categoryName = "General", isFavorite = false, onFavorite }: CardEventProps) {
  return (
    <div className="bg-[#252525] w-full  mx-auto h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col transition-all duration-300 hover:scale-[1.01] hover:border-white/20 group">
      
      {/* Contenedor de Imagen optimizado con márgenes limpios */}
      <div className="relative aspect-[16/10] w-auto mx-3 mt-3 bg-neutral-900 rounded-2xl overflow-hidden">
        <img 
          src={event.images?.[0] || "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"} 
          alt={event.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Gradiente sutil inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e]/80 via-transparent to-transparent pointer-events-none" />

        {/* Badge de Categoría */}
        {categoryName && (
          <span className="absolute top-3 left-3 bg-white/10 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
            {categoryName}
          </span>
        )}

        {/* Botón de Favorito */}
        <button 
          onClick={() => onFavorite?.(event.id)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer border ${
            isFavorite 
              ? "bg-red-500 text-white border-red-500" 
              : "bg-black/40 text-gray-200 border-white/10 hover:bg-black/60 hover:text-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>

        {/* Precio */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/10">
          {event.price === 0 ? "Free" : `$${event.price}`}
        </div>
      </div>
      
      {/* Contenido de la Card */}
      <div className="px-5 pb-5 pt-4 flex flex-col flex-1 text-white justify-between">
        <div>
          <h3 className="text-lg font-bold tracking-tight mb-3 line-clamp-1">{event.name}</h3>
          
          <div className="space-y-1.5 text-xs sm:text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
              <span>{event.date}</span>
            </div>
          </div>
        </div>

        {/* Pie de la Card (Capacidad y Botón Detalles) */}
        <div className="border-t border-white/10 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Users className="w-4 h-4 text-gray-500" />
            <span>{event.capacity} capacity</span>
          </div>

          <Link 
            href={`/events/${event.id}`} 
            className=" flex-col justify-center text-center flex h-11 w-23 bg-transparent border border-blue-500/40 text-blue-400 px-4 py-1.5 rounded-4xl text-2 font-medium hover:bg-blue-500 hover:text-white transition-all"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}