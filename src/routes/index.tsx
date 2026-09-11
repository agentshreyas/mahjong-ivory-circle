import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { TataMark } from "@/components/store/tata-mark";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tata NutriKorner — Tata groceries in minutes" },
      {
        name: "description",
        content:
          "Tata NutriKorner delivers Tata Sampann, Tata Salt, Tata Tea, Tata Soulfull and Himalayan essentials to your pincode in minutes.",
      },
      { property: "og:title", content: "Tata NutriKorner — Tata groceries in minutes" },
      {
        property: "og:description",
        content: "Tata Sampann, Tata Salt, Tata Tea and Himalayan water, delivered in minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/login" }), 1800);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center bg-white px-8 text-center">
      <TataMark size="lg" tone="dark" />
      <p className="mt-4 text-[12.5px] font-semibold text-[var(--slate)]">
        Trusted Tata nutrition, delivered in minutes.
      </p>
      <button
        onClick={() => navigate({ to: "/login" })}
        className="mt-10 rounded-[11px] bg-[var(--emerald)] px-7 py-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white"
      >
        Get started
      </button>
      <p className="absolute bottom-8 text-[9.5px] font-semibold text-[var(--slate)]/70">
        Demo prototype · brand names shown for illustration
      </p>
    </div>
  );
}
