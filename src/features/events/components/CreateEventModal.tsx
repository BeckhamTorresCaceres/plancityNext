"use client";

import { useState } from "react";
import { CheckCircle2, Clock, X } from "lucide-react";
import type { Category, CreateEventInput, CreateEventModalProps } from "../types/event.types";

export default function CreateEventModal({
  isOpen,
  onClose,
  categories,
  onSubmitEvent,
}: CreateEventModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    price: "",
    capacity: "",
    categoryId: categories[0]?.id ?? "1",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.date) return;

    const newEvent: CreateEventInput = {
      name: formData.name,
      description: formData.description,
      date: formData.date,
      location: formData.location,
      price: Number(formData.price) || 0,
      capacity: Number(formData.capacity) || 100,
      categoryId: formData.categoryId,
    };

    onSubmitEvent(newEvent);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      description: "",
      date: "",
      location: "",
      price: "",
      capacity: "",
      categoryId: categories[0]?.id ?? "1",
    });
    onClose();
  };

  return (
    <div className="theme-transition fixed inset-0 z-50 flex items-center justify-center bg-overlay px-4 backdrop-blur-md">
      <div className="theme-transition relative w-full max-w-lg rounded-3xl border border-theme bg-modal p-6 text-fg shadow-2xl backdrop-blur-2xl sm:p-8">
        <button
          type="button"
          onClick={handleResetAndClose}
          className="theme-transition absolute right-5 top-5 cursor-pointer rounded-full bg-card-inner p-1.5 text-muted hover:text-fg hover:opacity-80"
        >
          <X className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              ¡Evento enviado a revisión!
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              Tu evento ha sido registrado con estado{" "}
              <strong className="text-amber-400">Pendiente de Aprobación</strong>. Un
              administrador revisará los detalles y, al aprobarlo, aparecerá en el
              catálogo público para toda la comunidad.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="theme-transition mt-6 w-full cursor-pointer rounded-xl bg-inverse py-3 text-sm font-medium text-inverse hover:opacity-90"
            >
              Entendido
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-400">
                  Rol: Cliente
                </span>
                <span className="flex items-center gap-1 text-xs text-amber-400">
                  <Clock size={12} /> Requiere Aprobación
                </span>
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Publicar nuevo evento
              </h2>
              <p className="mt-1 text-xs text-muted">
                Completa la información. Tu publicación será revisada por un administrador antes de hacerse pública.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">
                  Título del evento *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Ej. Festival de Jazz al Parque"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="theme-transition w-full rounded-xl border border-theme bg-input px-3.5 py-2.5 text-sm text-fg outline-none focus:ring-2 focus:ring-[var(--border-hover)]"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">
                    Categoría
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                    className="theme-transition w-full rounded-xl border border-theme bg-input px-3 py-2.5 text-sm text-fg outline-none focus:ring-2 focus:ring-[var(--border-hover)]"
                  >
                    {categories.map((cat: Category) => (
                      <option key={cat.id} value={cat.id} className="bg-black text-white">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">
                    Fecha *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="DD/MM/AA"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="theme-transition w-full rounded-xl border border-theme bg-input px-3.5 py-2.5 text-sm text-fg outline-none focus:ring-2 focus:ring-[var(--border-hover)]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted">
                  Ubicación y Ciudad *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Ej. Parque Simón Bolívar, Bogotá"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="theme-transition w-full rounded-xl border border-theme bg-input px-3.5 py-2.5 text-sm text-fg outline-none focus:ring-2 focus:ring-[var(--border-hover)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">
                    Precio (USD)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0 = Gratis"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="theme-transition w-full rounded-xl border border-theme bg-input px-3.5 py-2.5 text-sm text-fg outline-none focus:ring-2 focus:ring-[var(--border-hover)]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">
                    Capacidad
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Ej. 250"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({ ...formData, capacity: e.target.value })
                    }
                    className="theme-transition w-full rounded-xl border border-theme bg-input px-3.5 py-2.5 text-sm text-fg outline-none focus:ring-2 focus:ring-[var(--border-hover)]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted">
                  Descripción
                </label>
                <textarea
                  rows={3}
                  placeholder="Cuéntale a la comunidad sobre el evento..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="theme-transition w-full rounded-xl border border-theme bg-input px-3.5 py-2.5 text-sm text-fg outline-none focus:ring-2 focus:ring-[var(--border-hover)]"
                />
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-300">
                ⚠️ Tu evento se guardará en modo <strong>aprobación</strong>. No será visible en la página principal hasta que el Administrador lo apruebe.
              </div>

              <button
                type="submit"
                className="theme-transition mt-2 w-full cursor-pointer rounded-xl bg-inverse py-3 text-sm font-medium text-inverse shadow-lg hover:opacity-90"
              >
                Enviar para Aprobación
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

