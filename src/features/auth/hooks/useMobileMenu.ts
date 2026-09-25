"use client";

import { useState } from "react";

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((current) => !current);
  const close = () => setIsOpen(false);

  return { isOpen, toggle, close };
}
