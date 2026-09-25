"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { BackButtonProps } from "../types/event.types";

export default function BackButton({ label = "All events" }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="group inline-flex cursor-pointer items-center gap-2 border-none bg-transparent p-0 text-xl font-medium text-blue-500 transition-colors hover:text-blue-400"
    >
      <ArrowLeft
        size={18}
        className="transition-transform group-hover:-translate-x-1"
      />
      {label}
    </button>
  );
}
