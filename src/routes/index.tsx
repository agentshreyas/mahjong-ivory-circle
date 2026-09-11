import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ShoppingBasket } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GreenBasket — Groceries delivered in minutes" },
      {
        name: "description",
        content:
          "GreenBasket delivers fresh fruit, dairy, staples and daily essentials to your pincode in minutes.",
      },
      { property: "og:title", content: "GreenBasket — Groceries delivered in minutes" },
      {
        property: "og:description",
        content: "Fresh produce, dairy and daily essentials, delivered to your door.",
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
    <div className="flex h-full flex-1 flex-col items-center justify-center bg-[var(--emerald)] px-8 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-[24px] bg-[var(--pastel)]">
        <ShoppingBasket size={38} strokeWidth={2.2} className="text-[var(--emerald-deep)]" />
      </div>
      <h1 className="mt-6 text-[34px] font-extrabold leading-none tracking-[-0.03em] text-white">
        GreenBasket
      </h1>
      <p className="mt-2 text-[13px] font-semibold text-[var(--mint)]">
        Fresh everything. In minutes.
      </p>
      <button
        onClick={() => navigate({ to: "/login" })}
        className="kicker mt-10 rounded-[9px] bg-[var(--pastel)] px-6 py-3 text-[10px] text-[var(--emerald-deep)]"
      >
        Get started
      </button>
    </div>
  );
}
