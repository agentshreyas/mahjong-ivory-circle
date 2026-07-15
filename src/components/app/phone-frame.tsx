import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#1f1a16] py-6 sm:py-10 flex items-start justify-center">
      <div className="relative w-[390px] max-w-full">
        {/* smartphone shell */}
        <div className="relative mx-auto h-[844px] w-[390px] max-w-full overflow-hidden rounded-[44px] border-[12px] border-[#0e0a08] bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
          {/* Dynamic Island */}
          <div className="pointer-events-none absolute left-1/2 top-3 z-30 h-[28px] w-[100px] -translate-x-1/2 rounded-full bg-black" />
          {/* Status bar strip */}
          <div className="absolute inset-x-0 top-0 z-20 h-[44px] w-full bg-black" />
          {/* Status bar spacer */}
          <div className="h-[44px] w-full" />
          {/* Content */}
          <div className="flex h-[calc(844px-44px)] flex-col overflow-y-auto bg-[var(--ivory)] [-webkit-overflow-scrolling:touch]">
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
