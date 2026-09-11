import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-[#0c1512] py-6 sm:py-10">
      <div className="relative w-[390px] max-w-full">
        <div className="relative mx-auto h-[844px] w-[390px] max-w-full overflow-hidden rounded-[44px] border-[10px] border-[#05100c] bg-black shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]">
          <div className="pointer-events-none absolute left-1/2 top-3 z-30 h-[26px] w-[96px] -translate-x-1/2 rounded-full bg-black" />
          <div className="absolute inset-x-0 top-0 z-20 h-[44px] w-full bg-black" />
          <div className="h-[44px] w-full" />
          <div className="no-bar flex h-[calc(844px-44px)] flex-col overflow-y-auto bg-[var(--ground)] [-webkit-overflow-scrolling:touch]">
            {children}
          </div>
        </div>
        <p className="kicker mt-4 text-center text-white/35">
          Tata NutriKorner — prototype
        </p>
      </div>
    </div>
  );
}
