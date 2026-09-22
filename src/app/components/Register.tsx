'use client';

import { X } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  if (!isOpen) return null;

  return (
    <div className="theme-transition fixed inset-0 z-50 flex items-center justify-center bg-overlay backdrop-blur-md px-4">
      <div className="theme-transition relative w-full max-w-md bg-modal backdrop-blur-2xl border border-theme rounded-3xl p-8 shadow-2xl text-fg">
        
        <button 
          onClick={onClose}
          className="theme-transition absolute top-5 right-5 text-muted hover:text-fg bg-card-inner hover:opacity-80 rounded-full p-1.5 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Crea una cuenta</h2>
          <p className="text-sm text-muted mt-1">Únete a PlanCity para descubrir eventos</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <input 
              type="text" 
              placeholder="Nombre completo" 
              className="theme-transition w-full bg-input border border-theme rounded-xl px-4 py-3 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-[var(--border-hover)]"
            />
          </div>

          <div>
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              className="theme-transition w-full bg-input border border-theme rounded-xl px-4 py-3 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-[var(--border-hover)]"
            />
          </div>

          <div>
            <input 
              type="password" 
              placeholder="Contraseña" 
              className="theme-transition w-full bg-input border border-theme rounded-xl px-4 py-3 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-[var(--border-hover)]"
            />
          </div>

          <button 
            type="submit" 
            className="theme-transition w-full bg-inverse text-inverse font-medium py-3 rounded-xl hover:opacity-90 text-sm shadow-lg mt-2 cursor-pointer"
          >
            Registrarse
          </button>
        </form>

        <p className="text-xs text-center text-muted-2 mt-6">
          Al registrarte, aceptas los términos y condiciones de PlanCity.
        </p>
      </div>
    </div>
  );
}
