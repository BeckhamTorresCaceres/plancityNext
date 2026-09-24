
'use client';

import { useState } from 'react';
import { MoreHorizontal, LogIn, UserPlus, Sun } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface MobileMenuProps {
  onLogin: () => void;
  onRegister: () => void;
}

export default function MobileMenu({ onLogin, onRegister }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = () => {
    setIsOpen(false);
    onLogin();
  };

  const handleRegister = () => {
    setIsOpen(false);
    onRegister();
  };

  return (
    <div className="relative md:hidden">
      <button type="button" onClick={() => setIsOpen((prev) => !prev)} aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={isOpen} className="theme-transition flex h-10 w-10 items-center justify-center rounded-full border border-theme bg-card/70 text-fg backdrop-blur-xl transition-all duration-200 hover:bg-card active:scale-95">
        <MoreHorizontal size={21} strokeWidth={2} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-52 overflow-hidden rounded-2xl border border-theme bg-modal p-2 shadow-2xl backdrop-blur-2xl">
          <button type="button" onClick={handleLogin} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-fg transition hover:bg-black/5 dark:hover:bg-white/10">
            <LogIn size={18} />
            <span>Log in</span>
          </button>

          <button type="button" onClick={handleRegister} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-fg transition hover:bg-black/5 dark:hover:bg-white/10">
            <UserPlus size={18} />
            <span>Sign up</span>
          </button>

          <div className="my-1 h-px bg-black/10 dark:bg-white/10" />

          <div className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-fg">
            <div className="flex items-center gap-3">
              <Sun size={18} />
              <span>Theme</span>
            </div>

            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
}

