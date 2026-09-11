import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useUser } from "@/lib/user-store";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Welcome — GreenBasket" },
      { name: "description", content: "You're in. Start shopping fresh groceries near you." },
      { property: "og:title", content: "Welcome — GreenBasket" },
      { property: "og:description", content: "You're in. Start shopping fresh groceries near you." },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const navigate = useNavigate();
  const user = useUser();
  const first = (user.name || "there").split(" ")[0];

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center bg-[var(--emerald-deep)] px-8 text-center">
      <CheckCircle2 size={44} strokeWidth={2} className="text-[var(--pastel)]" />
      <h1 className="mt-5 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
        Hi {first}, you&apos;re in.
      </h1>
      <p className="mt-3 max-w-[260px] text-[13px] font-semibold leading-relaxed text-[var(--mint)]">
        We deliver to {user.pincode} in under 20 minutes. Fresh produce, dairy, staples and daily
        essentials.
      </p>
      <button
        onClick={() => navigate({ to: "/home" })}
        className="mt-9 w-full max-w-[260px] rounded-[11px] bg-[var(--pastel)] py-3.5 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[var(--emerald-deep)]"
      >
        Start shopping
      </button>
    </div>
  );
}
