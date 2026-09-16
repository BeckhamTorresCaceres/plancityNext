'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ label = "All events" }: { label?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="group inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-medium text-xl transition-colors cursor-pointer bg-transparent border-none p-0"
    >
      <ArrowLeft className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:-translate-x-1.5" />
      <span>{label}</span>
    </button>
  );
}