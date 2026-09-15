'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ label = "Volver" }: { label?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}