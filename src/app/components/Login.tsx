'use client';

import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4 transition-all">
      <div className="relative w-full max-w-md bg-neutral-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl text-white">
        
        {/* Botón de cierre */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1.5 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Encabezado */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Iniciar sesión</h2>
          <p className="text-sm text-gray-400 mt-1">Ingresa a PlanCity para continuar</p>
        </div>

        {/* Formulario */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
            />
          </div>

          <div>
            <input 
              type="password" 
              placeholder="Contraseña" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-white text-black font-medium py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm shadow-lg mt-2 cursor-pointer"
          >
            Continuar
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-6">
          Al continuar, aceptas las políticas de PlanCity.
        </p>
      </div>
    </div>
  );
}