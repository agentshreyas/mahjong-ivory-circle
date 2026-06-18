import type { ReactNode } from "react";
import { TopBar } from "./top-bar";
import { BottomNav } from "./bottom-nav";

interface Props {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  back?: boolean;
  hideTop?: boolean;
  hideTabs?: boolean;
  transparentTop?: boolean;
}

export function Screen({ children, title, eyebrow, back, hideTop, hideTabs, transparentTop }: Props) {
  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-[var(--ivory)]">
      {!hideTop && <TopBar title={title} eyebrow={eyebrow} back={back} transparent={transparentTop} />}
      <main className="flex-1">{children}</main>
      {!hideTabs && <BottomNav />}
    </div>
  );
}