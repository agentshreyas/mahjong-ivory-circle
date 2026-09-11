import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/lib/user-store";

export const Route = createFileRoute("/otp")({
  head: () => ({
    meta: [
      { title: "Verify OTP — Tata NutriKorner" },
      { name: "description", content: "Enter the 4-digit code we sent to your phone." },
      { property: "og:title", content: "Verify OTP — Tata NutriKorner" },
      { property: "og:description", content: "Enter the 4-digit code we sent to your phone." },
    ],
  }),
  component: Otp,
});

function Otp() {
  const navigate = useNavigate();
  const user = useUser();
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(24);
  const autofilled = useRef(false);

  useEffect(() => {
    const i = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(i);
  }, []);

  // demo: the code is "read" automatically like an SMS autofill
  useEffect(() => {
    if (autofilled.current) return;
    autofilled.current = true;
    const t = setTimeout(() => setCode("4821"), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex h-full flex-1 flex-col bg-[var(--ground)]">
      <div className="rounded-b-[37px] bg-[var(--emerald)] px-6 pb-10 pt-12">
        <p className="kicker text-[var(--pastel)]">Step 2 of 3</p>
        <h1 className="mt-2 text-[26px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
          Verify your number
        </h1>
        <p className="mt-2 text-[12.5px] font-semibold text-[var(--mint)]">
          Code sent to +91 {user.phone || "98765 43210"}
        </p>
      </div>

      <div className="flex-1 px-6 pt-8">
        <div className="flex justify-between gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="grid h-14 flex-1 place-items-center rounded-[11px] bg-white text-[20px] font-extrabold text-[var(--ink)]"
            >
              {code[i] || ""}
            </div>
          ))}
        </div>
        <input
          inputMode="numeric"
          maxLength={4}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          className="mt-3 w-full rounded-[11px] bg-white/70 px-3 py-2 text-center text-[12px] font-bold text-[var(--ink)] outline-none"
          placeholder="Type the code"
        />

        <p className="mt-4 text-center text-[11.5px] font-semibold text-[var(--emerald-deep)]/70">
          {seconds > 0 ? `Resend code in 0:${String(seconds).padStart(2, "0")}` : "Resend code"}
        </p>

        <button
          disabled={code.length !== 4}
          onClick={() => navigate({ to: "/details" })}
          className="mt-6 w-full rounded-[11px] bg-[var(--emerald)] py-3.5 text-[12px] font-extrabold uppercase tracking-[0.12em] text-white disabled:opacity-40"
        >
          Verify & continue
        </button>
      </div>
    </div>
  );
}
