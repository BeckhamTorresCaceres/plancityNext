import type { AdminTopbarProps } from "../types/admin.types";

export default function AdminTopbar({ title }: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-10 flex h-15 shrink-0 items-center justify-between border-b border-white/8 bg-black/50 px-7 backdrop-blur-xl">
      <h1 className="text-[17px] font-semibold tracking-tight text-white">
        {title}
      </h1>
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 rounded-lg border border-[#30d158]/20 bg-[#30d158]/10 px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#30d158]" />
          <span className="text-xs font-medium text-[#30d158]">Live</span>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-[#0a84ff] to-[#bf5af2] text-xs font-bold text-white">
          A
        </div>
      </div>
    </header>
  );
}
