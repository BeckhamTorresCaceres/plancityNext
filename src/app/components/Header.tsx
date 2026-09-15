'use client';

import { useState } from 'react';
import Link from "next/link";
import LoginModal from "./Login";
import RegisterModal from './Register';

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-20 bg-[#000003]/60 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8 z-50">
        <Link href="/" className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          PlanCity
        </Link>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="text-white hover:text-gray-200 text-sm font-medium cursor-pointer"
          >
            Log in
          </button>
          
          <button 
            onClick={() => setIsRegisterOpen(true)}
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer"
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