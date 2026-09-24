
'use client';

import { useState } from 'react';
import Link from 'next/link';

import LoginModal from '@/app/components/Login';
import RegisterModal from '@/app/components/Register';
import ThemeToggle from '@/app/components/ThemeToggle';
import MobileMenu from '@/app/components/MobileMenu';

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <header className="theme-transition fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between border-b border-theme bg-header px-6 backdrop-blur-md sm:px-8">
        <Link href="/" className="theme-transition text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          PlanCity
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />

          <button type="button" onClick={() => setIsLoginOpen(true)} className="theme-transition cursor-pointer text-xl font-medium text-fg hover:opacity-80">
            Log in
          </button>

          <button type="button" onClick={() => setIsRegisterOpen(true)} className="theme-transition cursor-pointer rounded-full bg-inverse px-4 py-2 text-xl font-medium text-inverse hover:opacity-90">
            Sign up
          </button>
        </div>

        <MobileMenu onLogin={() => setIsLoginOpen(true)} onRegister={() => setIsRegisterOpen(true)} />
      </header>

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

