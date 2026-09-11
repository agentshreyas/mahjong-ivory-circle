import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-[#06251a] py-6 sm:py-10">
      <div className="relative w-[390px] max-w-full">
        <div className="relative mx-auto h-[844px] w-[390px] max-w-full overflow-hidden rounded-[44px] border-[12px] border-[#02150e] bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
          <div className="pointer-events-none absolute left-1/2 top-3 z-30 h-[28px] w-[100px] -translate-x-1/2 rounded-full bg-black" />
          <div className="absolute inset-x-0 top-0 z-20 h-[44px] w-full bg-black" />
          <div className="h-[44px] w-full" />
          <div className="no-bar flex h-[calc(844px-44px)] flex-col overflow-y-auto bg-[var(--pastel)] [-webkit-overflow-scrolling:touch]">
            {children}
          </div>
        </div>
        <p className="kicker mt-4 text-center text-[var(--mint)]/60">GreenBasket — prototype</p>
      </div>
    </div>
  );
}
