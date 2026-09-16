'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Oculta el loader cuando la ruta o los parámetros cambian completamente
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  // Intercepta clics globales en enlaces internos
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      if (!target) return;

      const href = target.getAttribute('href');
      const targetAttr = target.getAttribute('target');

      // Verifica que sea un enlace interno y válido
      if (
        href &&
        href.startsWith('/') &&
        targetAttr !== '_blank' &&
        href !== `${pathname}${window.location.search}`
      ) {
        setIsLoading(true);
      }
    };

    const attachListeners = () => {
      const anchors = document.querySelectorAll('a[href^="/"]');
      anchors.forEach((anchor) => {
        anchor.addEventListener('click', handleAnchorClick as EventListener);
      });
    };

    attachListeners();

    // Observa cambios en el DOM por si se renderizan nuevos enlaces dinámicamente
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      const anchors = document.querySelectorAll('a[href^="/"]');
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener);
      });
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/50 backdrop-blur-md transition-all duration-300 animate-fadeIn">
      <div className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl">
        {/* Spinner estilo Apple / Neon */}
        <div className="w-10 h-10 border-3 border-white/20 border-t-blue-500 rounded-full animate-spin" />
        
        <span className="text-xs font-semibold tracking-wider text-gray-300 uppercase">
          Loading PlanCity...
        </span>
      </div>
    </div>
  );
}