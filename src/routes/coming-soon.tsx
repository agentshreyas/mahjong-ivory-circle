import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalHeader } from "./privacy";
import { SiteFooter } from "./landing";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/coming-soon")({
  head: () => ({
    meta: [
      { title: "Coming Soon — Mahjong Circle" },
      { name: "description", content: "This experience is currently being curated." },
    ],
  }),
  component: ComingSoon,
});

function ComingSoon() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--ivory)] text-[var(--ink)]">
      <LegalHeader />
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--hsbc)]/10 text-[var(--hsbc)]">
          <Clock size={28} strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-[32px] leading-tight md:text-[42px]">
          Coming Soon
        </h1>
        <p className="mt-4 max-w-[400px] text-[14px] leading-relaxed text-[var(--taupe)]">
          This experience is currently being curated. We will unveil more details before the Circle opens to members.
        </p>
        <Link
          to="/landing"
          className="mt-10 inline-block rounded-full border border-[var(--ink)]/15 px-6 py-3 text-[13px] font-medium transition hover:bg-[var(--sand)]"
        >
          Return to Mahjong Circle
        </Link>
      </div>
      <SiteFooter />
    </div>
  );
}
