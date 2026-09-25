"use client";

import { X } from "lucide-react";
import type { RegisterModalProps } from "../types/auth.types";

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  if (!isOpen) return null;
  return (
    <div className="theme-transition fixed inset-0 z-50 flex items-center justify-center bg-overlay px-4 backdrop-blur-md">
      <div className="theme-transition relative w-full max-w-md rounded-3xl border border-theme bg-modal p-8 text-fg shadow-2xl backdrop-blur-2xl">
        <button
          type="button"
          onClick={onClose}
          className="theme-transition absolute right-5 top-5 cursor-pointer rounded-full bg-card-inner p-1.5 text-muted hover:text-fg hover:opacity-80"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Crea una cuenta
          </h2>
          <p className="mt-1 text-sm text-muted">
            Únete a PlanCity para descubrir eventos
          </p>
        </div>
        <form
          onSubmit={(event) => event.preventDefault()}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Nombre completo"
            className="theme-transition w-full rounded-xl border border-theme bg-input px-4 py-3 text-sm text-fg outline-none focus:ring-2 focus:ring-[var(--border-hover)]"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="theme-transition w-full rounded-xl border border-theme bg-input px-4 py-3 text-sm text-fg outline-none focus:ring-2 focus:ring-[var(--border-hover)]"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="theme-transition w-full rounded-xl border border-theme bg-input px-4 py-3 text-sm text-fg outline-none focus:ring-2 focus:ring-[var(--border-hover)]"
          />
          <button
            type="submit"
            className="theme-transition mt-2 w-full cursor-pointer rounded-xl bg-inverse py-3 text-sm font-medium text-inverse shadow-lg hover:opacity-90"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-muted-2">
          Al registrarte, aceptas los términos y condiciones de PlanCity.
        </p>
      </div>
    </div>
  );
}
