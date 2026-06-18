import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { TopBar } from "@/components/app/top-bar";
import { Check } from "lucide-react";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Join · HSBC Mahjong Circle" }] }),
  component: Register,
});

const interests = [
  "History & Heritage",
  "Learn to Play",
  "Events Near Me",
  "Meet Players",
  "Etiquette",
  "Scoring & Strategy",
];

function Register() {
  const [step, setStep] = useState<"form" | "otp" | "interests">("form");
  const [picked, setPicked] = useState<string[]>(["History & Heritage", "Events Near Me"]);
  const [consent, setConsent] = useState(true);

  return (
    <div className="relative flex h-full flex-col bg-[var(--ivory)]">
      <TopBar back title={step === "interests" ? "Your interests" : "Join the Circle"} />

      <div className="flex-1 overflow-y-auto px-6 pb-10">
        {/* progress */}
        <div className="mb-6 flex items-center gap-2">
          {(["form", "otp", "interests"] as const).map((s, i) => (
            <div
              key={s}
              className={`h-[2px] flex-1 rounded-full ${
                ["form", "otp", "interests"].indexOf(step) >= i
                  ? "bg-[var(--hsbc)]"
                  : "bg-[var(--hairline)]"
              }`}
            />
          ))}
        </div>

        {step === "form" && (
          <>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">Step 1 of 3</p>
            <h2 className="mt-1 font-display text-[26px] leading-tight text-[var(--ink)]">
              A few quiet details.
            </h2>
            <p className="mt-2 text-[13px] text-[var(--taupe)]">
              We'll send a one‑time code to verify it's you.
            </p>

            <div className="mt-7 space-y-5">
              <Field label="Mobile number" placeholder="+91 98xxx xxxxx" />
              <Field label="Email" placeholder="you@example.com" />
            </div>

            <label className="mt-6 flex items-start gap-3 text-[12px] text-[var(--taupe)]">
              <button
                type="button"
                onClick={() => setConsent(!consent)}
                className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border ${
                  consent ? "border-[var(--hsbc)] bg-[var(--hsbc)]" : "border-[var(--hairline)] bg-transparent"
                }`}
              >
                {consent && <Check size={11} className="text-[var(--ivory)]" />}
              </button>
              <span>
                I agree to the Circle's house rules and to occasional dispatches about events,
                editorials and the Gaurav Gupta collection.
              </span>
            </label>

            <button
              onClick={() => setStep("otp")}
              className="mt-7 w-full rounded-2xl bg-[var(--hsbc)] py-3.5 text-[14px] font-medium text-[var(--ivory)] shadow-[0_8px_24px_-8px_rgba(219,0,17,0.4)] active:bg-[var(--hsbc-pressed)]"
            >
              Send code
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">Step 2 of 3</p>
            <h2 className="mt-1 font-display text-[26px] leading-tight text-[var(--ink)]">
              Enter your code.
            </h2>
            <p className="mt-2 text-[13px] text-[var(--taupe)]">
              We sent a 6‑digit code to +91 98xxx xxxxx.
            </p>

            <div className="mt-8 flex justify-center gap-2.5">
              {[2, 8, 4, 1, "", ""].map((d, i) => (
                <div
                  key={i}
                  className={`grid h-12 w-10 place-items-center rounded-xl border bg-[var(--sand)]/50 font-display text-[20px] text-[var(--ink)] ${
                    d === "" ? "border-[var(--hairline)]" : "border-[var(--ink)]/20"
                  }`}
                >
                  {d}
                </div>
              ))}
            </div>

            <p className="mt-5 text-center text-[12px] text-[var(--taupe)]">
              Didn't receive it? <span className="text-[var(--ink)] underline underline-offset-2">Resend in 24s</span>
            </p>

            <button
              onClick={() => setStep("interests")}
              className="mt-8 w-full rounded-2xl bg-[var(--hsbc)] py-3.5 text-[14px] font-medium text-[var(--ivory)] active:bg-[var(--hsbc-pressed)]"
            >
              Verify
            </button>
          </>
        )}

        {step === "interests" && (
          <>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">Step 3 of 3</p>
            <h2 className="mt-1 font-display text-[26px] leading-tight text-[var(--ink)]">
              Choose your interests.
            </h2>
            <p className="mt-2 text-[13px] text-[var(--taupe)]">
              So we may recommend the right rooms, reads and players.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {interests.map((tag) => {
                const active = picked.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() =>
                      setPicked((p) => (active ? p.filter((x) => x !== tag) : [...p, tag]))
                    }
                    className={`rounded-full border px-4 py-2 text-[12.5px] transition ${
                      active
                        ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--ivory)]"
                        : "border-[var(--hairline)] bg-[var(--sand)]/60 text-[var(--ink)]"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            <Link
              to="/home"
              className="mt-10 block w-full rounded-2xl bg-[var(--hsbc)] py-3.5 text-center text-[14px] font-medium text-[var(--ivory)] active:bg-[var(--hsbc-pressed)]"
            >
              Enter the Circle
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.22em] text-[var(--taupe)]">{label}</label>
      <input
        placeholder={placeholder}
        className="mt-2 w-full border-0 border-b border-[var(--hairline)] bg-transparent pb-2 font-display text-[18px] text-[var(--ink)] placeholder:text-[var(--taupe)]/60 focus:border-[var(--gold)] focus:outline-none"
      />
    </div>
  );
}