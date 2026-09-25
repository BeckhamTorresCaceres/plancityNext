"use client";

import { useState } from "react";

export function useEventPoster() {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => setIsFavorite((current) => !current);

  const shareEvent = async (title: string, text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: window.location.href });
      } catch {
        /* cancelled */
      }
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return { isFavorite, toggleFavorite, shareEvent };
}
