"use client";

import { usePageLoader } from "../hooks/usePageLoader";

export default function PageLoader() {
  const { isLoading } = usePageLoader();
  if (!isLoading) return null;

  return (
    <div className="theme-transition fixed inset-0 z-[100] flex flex-col items-center justify-center bg-overlay backdrop-blur-md">
      <div className="theme-transition flex flex-col items-center gap-4 rounded-3xl border border-theme bg-modal p-6 shadow-2xl backdrop-blur-xl">
        <div className="h-10 w-10 animate-spin rounded-full border-3 border-theme border-t-blue-500" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          Loading PlanCity...
        </span>
      </div>
    </div>
  );
}
