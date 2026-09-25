"use client";

import { LogIn, MoreHorizontal, Sun, UserPlus } from "lucide-react";
import ThemeToggle from "@/features/theme/components/ThemeToggle";
import { useMobileMenu } from "../hooks/useMobileMenu";
import type { MobileMenuProps } from "../types/auth.types";

export default function MobileMenu({ onLogin, onRegister }: MobileMenuProps) {
  const { isOpen, toggle, close } = useMobileMenu();

  const handleLogin = () => {
    close();
    onLogin();
  };
  const handleRegister = () => {
    close();
    onRegister();
  };

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        onClick={toggle}
        aria-label="Open menu"
        aria-expanded={isOpen}
        className="theme-transition flex h-10 w-10 items-center justify-center rounded-full border border-theme bg-card/70 text-fg backdrop-blur-xl transition-all duration-200 hover:bg-card active:scale-95"
      >
        <MoreHorizontal size={21} />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-52 overflow-hidden rounded-2xl border border-theme bg-modal p-2 shadow-2xl backdrop-blur-2xl">
          <button
            type="button"
            onClick={handleLogin}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-fg transition hover:bg-white/10"
          >
            <LogIn size={18} />
            Log in
          </button>
          <button
            type="button"
            onClick={handleRegister}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-fg transition hover:bg-white/10"
          >
            <UserPlus size={18} />
            Sign up
          </button>
          <div className="my-1 h-px bg-white/10" />
          <div className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-fg">
            <div className="flex items-center gap-3">
              <Sun size={18} />
              Theme
            </div>
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
}
