import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Phone } from "lucide-react";
import { writeUser } from "@/lib/user-store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Tata NutriKorner" },
      { name: "description", content: "Sign in with your phone number to shop on Tata NutriKorner." },
      { property: "og:title", content: "Sign in — Tata NutriKorner" },
      { property: "og:description", content: "Sign in with your phone number to shop on Tata NutriKorner." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const valid = phone.replace(/\D/g, "").length === 10;

  return (
    <div className="flex h-full flex-1 flex-col bg-[var(--ground)]">
      <div className="rounded-b-[37px] bg-[var(--emerald)] px-6 pb-10 pt-12">
        <p className="kicker text-[var(--pastel)]">Welcome to Tata NutriKorner</p>
        <h1 className="mt-2 text-[27px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
          Log in to shop Tata
          <br />
          your neighbourhood
        </h1>
      </div>

      <div className="flex-1 px-6 pt-7">
        <p className="kicker text-[var(--emerald-deep)]">Mobile number</p>
        <div className="mt-2 flex items-center gap-2 rounded-[11px] bg-white px-3 py-3">
          <Phone size={16} className="text-[var(--slate)]" />
          <span className="text-[14px] font-extrabold text-[var(--ink)]">+91</span>
          <input
            inputMode="numeric"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            placeholder="98765 43210"
            className="w-full bg-transparent text-[14px] font-bold tracking-wide text-[var(--ink)] outline-none placeholder:font-medium placeholder:text-[var(--slate)]"
          />
        </div>

        <button
          disabled={!valid}
          onClick={() => {
            writeUser({ phone });
            navigate({ to: "/otp" });
          }}
          className="mt-4 w-full rounded-[11px] bg-[var(--emerald)] py-3.5 text-[12px] font-extrabold uppercase tracking-[0.12em] text-white disabled:opacity-40"
        >
          Send OTP
        </button>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-[var(--emerald-deep)]/15" />
          <span className="kicker text-[var(--emerald-deep)]/60">or</span>
          <span className="h-px flex-1 bg-[var(--emerald-deep)]/15" />
        </div>

        <button
          onClick={() => navigate({ to: "/details" })}
          className="w-full rounded-[11px] border border-[var(--emerald)]/30 bg-white py-3.5 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[var(--emerald-deep)]"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-[11px] font-semibold leading-relaxed text-[var(--emerald-deep)]/70">
          By continuing you agree to our Terms of Use and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
