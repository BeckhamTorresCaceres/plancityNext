'use client';

import { useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { Event, Category } from "@/app/interfaces/type";

interface EventPosterProps {
  event: Event;
  category?: Category;
}

export default function EventPoster({ event, category }: EventPosterProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.name,
          text: event.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <section className="relative w-full h-[500px] sm:h-[580px] rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 border border-white/10 flex flex-col justify-between p-6 sm:p-8 group">
      <img 
        src={event.images?.[0] || "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"} 
        alt={event.name} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between">
        {category && (
          <span className="bg-white/10 backdrop-blur-md text-white text-xs font-medium px-4 py-1.5 rounded-full uppercase tracking-wider border border-white/10">
            {category.name}
          </span>
        )}

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer border ${
              isFavorite 
                ? "bg-red-500 text-white border-red-500" 
                : "bg-black/40 text-gray-200 border-white/10 hover:bg-black/60 hover:text-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
          
          <button 
            onClick={handleShare}
            className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-1.5">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-md">
          {event.name}
        </h1>
        <p className="text-sm sm:text-base text-gray-300 font-medium drop-shadow">
          {event.location}
        </p>
      </div>
    </section>
  );
}