import type { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";

export function Screen({
  children,
  hideNav,
}: {
  children: ReactNode;
  hideNav?: boolean;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[var(--ground)]">
      <main className="flex-1">{children}</main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
