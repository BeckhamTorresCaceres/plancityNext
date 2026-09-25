"use client";

import Link from "next/link";
import LoginModal from "@/features/auth/components/Login";
import RegisterModal from "@/features/auth/components/Register";
import MobileMenu from "@/features/auth/components/MobileMenu";
import ThemeToggle from "@/features/theme/components/ThemeToggle";
import { useAuthModals } from "@/features/auth/hooks/useAuthModals";

export default function Header() {
  const {
    isLoginOpen,
    isRegisterOpen,
    openLogin,
    closeLogin,
    openRegister,
    closeRegister,
  } = useAuthModals();

  return (
    <>
      <header className="theme-transition fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between border-b border-theme bg-header px-6 backdrop-blur-md sm:px-8">
        <Link
          href="/"
          className="theme-transition text-2xl font-bold tracking-tight text-fg sm:text-3xl"
        >
          PlanCity
        </Link>
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <button
            type="button"
            onClick={openLogin}
            className="theme-transition cursor-pointer text-xl font-medium text-fg hover:opacity-80"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={openRegister}
            className="theme-transition cursor-pointer rounded-full bg-inverse px-4 py-2 text-xl font-medium text-inverse hover:opacity-90"
          >
            Sign up
          </button>
        </div>
        <MobileMenu onLogin={openLogin} onRegister={openRegister} />
      </header>
      <RegisterModal isOpen={isRegisterOpen} onClose={closeRegister} />
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
    </>
  );
}
