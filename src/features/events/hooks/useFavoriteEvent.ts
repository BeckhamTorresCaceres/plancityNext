"use client";

import { useState } from "react";

export function useFavoriteEvent() {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => setIsFavorite((current) => !current);

  return { isFavorite, toggleFavorite };
}
