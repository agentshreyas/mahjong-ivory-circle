import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#1f1a16] py-6 sm:py-10 flex items-start justify-center">
      <div className="relative w-[390px] max-w-full">
        {/* Phone shell */}
        <div className="relative mx-auto h-[844px] w-[390px] max-w-full overflow-hidden rounded-[44px] border-[10px] border-[#0e0a08] bg-[var(--ivory)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
          {/* Dynamic island */}
          <div className="pointer-events-none absolute left-1/2 top-2 z-30 h-[26px] w-[110px] -translate-x-1/2 rounded-full bg-black" />
          {/* Status bar spacer */}
          <div className="h-[34px] w-full" />
          {/* Content */}
          <div className="flex h-[calc(844px-34px)] flex-col overflow-y-auto bg-[var(--ivory)] [-webkit-overflow-scrolling:touch]">
            {children}
          </div>
        </div>
        <p className="mt-4 text-center text-[11px] uppercase tracking-[0.2em] text-[var(--sand)]/50">
          HSBC Mahjong Circle — Prototype
        </p>
      </div>
    </div>
  );
}