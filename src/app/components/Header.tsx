'use client';

import { useState } from 'react';
import Link from "next/link";
import LoginModal from "./Login";
import RegisterModal from './Register';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <header className="theme-transition fixed top-0 left-0 w-full h-20 bg-header backdrop-blur-md border-b border-theme flex items-center justify-between px-8 z-50">
        <Link href="/" className="theme-transition text-2xl sm:text-3xl font-bold tracking-tight text-fg">
          PlanCity
        </Link>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <button 
            onClick={() => setIsLoginOpen(true)}
            className="theme-transition text-fg hover:opacity-80 text-xl font-medium cursor-pointer"
          >
            Log in
          </button>
          
          <button 
            onClick={() => setIsRegisterOpen(true)}
            className="theme-transition bg-inverse text-inverse px-4 py-2 rounded-full text-xl font-medium hover:opacity-90 cursor-pointer"
          >
            Sign up
          </button>
        </div>
      </header>

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </>
  );
}
