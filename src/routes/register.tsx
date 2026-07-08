import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { TopBar } from "@/components/app/top-bar";
import { Check } from "lucide-react";
import { writeMember } from "@/lib/member-store";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Join · HSBC Mahjong Circle" }] }),
  component: Register,
});

const INTERESTS = [
  "History & Heritage",
  "Learn to Play",
  "Events Near Me",
  "Meet Players",
  "Etiquette",
  "Scoring & Strategy",
];
const STYLES = ["Cantonese", "Hong Kong", "Japanese Riichi", "American", "Indian house rules"];
const SKILLS = ["New to the game", "Casual", "Intermediate", "Seasoned"];
const CITIES = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Kolkata", "Chennai", "Pune"];

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "otp" | "prefs" | "details">("phone");
  const [mobile, setMobile] = useState("");
  const [consent, setConsent] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [resendIn, setResendIn] = useState(30);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [skill, setSkill] = useState("Casual");
  const [interests, setInterests] = useState<string[]>(["History & Heritage", "Events Near Me"]);
  const [style, setStyle] = useState("Cantonese");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");

  const mobileValid = /^[6-9]\d{9}$/.test(mobile.replace(/\s+/g, ""));
  const canSendCode = mobileValid && consent;
  const otpValid = otp.every((c) => /\d/.test(c));

  useEffect(() => {
    if (step !== "otp") return;
    setResendIn(30);
    const t = setInterval(() => setResendIn((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [step]);

  const stepTitles: Record<typeof step, string> = {
    phone: "Join the Circle",
    otp: "Enter your code",
    prefs: "Your preferences",
    details: "A little about you",
  };

  const finish = (opts: { skipDetails?: boolean; skipPrefs?: boolean } = {}) => {
    writeMember({
      name: opts.skipDetails ? "" : name.trim(),
      city: opts.skipDetails ? "" : city,
      mobile: `+91 ${mobile.replace(/(\d{5})(\d{5})/, "$1 $2")}`,
      email: "",
      interests: opts.skipPrefs ? [] : interests,
      styles: opts.skipPrefs ? [] : style ? [style] : [],
      primaryStyle: opts.skipPrefs ? "" : style,
      skill: opts.skipPrefs ? "" : skill,
      guest: false,
    });
    navigate({ to: "/home" });
  };

  return (
    <div className="relative flex h-full flex-col bg-[var(--ivory)]">
      <TopBar back title={stepTitles[step]} />

      <div className="flex-1 overflow-y-auto px-6 pb-10">
        <div className="mb-6 flex items-center gap-2">
          {(["phone", "otp", "prefs", "details"] as const).map((s, i) => (
            <div
              key={s}
              className={`h-[2px] flex-1 rounded-full ${
                ["phone", "otp", "prefs", "details"].indexOf(step) >= i
                  ? "bg-[var(--hsbc)]"
                  : "bg-[var(--hairline)]"
              }`}
            />
          ))}
        </div>

        {step === "phone" && (
          <>
            <h2 className="mt-1 font-display text-[26px] leading-tight text-[var(--ink)]">
              Your mobile number.
            </h2>
            <p className="mt-2 text-[13px] text-[var(--taupe)]">
              We'll send a one‑time code to verify it's you. Nothing more required to enter.
            </p>

            <div className="mt-7 space-y-5">
              <div>
                <label className="text-[10px] uppercase tracking-[0.22em] text-[var(--taupe)]">Mobile number</label>
                <div className="mt-2 flex items-center gap-2 border-b border-[var(--hairline)] pb-2 focus-within:border-[var(--gold)]">
                  <span className="font-display text-[18px] text-[var(--ink)]">+91</span>
                  <input
                    inputMode="numeric"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    placeholder="98200 12345"
                    className="w-full border-0 bg-transparent font-display text-[18px] text-[var(--ink)] placeholder:text-[var(--taupe)]/60 focus:outline-none"
                  />
                </div>
                {!!mobile && !mobileValid && (
                  <p className="mt-1 text-[11px] text-[var(--hsbc)]">Enter a valid 10-digit Indian mobile.</p>
                )}
              </div>
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
                I agree to the Circle's Terms &amp; Privacy and to occasional dispatches about
                events, editorials and the Gaurav Gupta collection.
              </span>
            </label>

            <button
              disabled={!canSendCode}
              onClick={() => setStep("otp")}
              className={`mt-7 w-full rounded-2xl py-3.5 text-[14px] font-medium transition ${
                canSendCode
                  ? "bg-[var(--hsbc)] text-[var(--ivory)] shadow-[0_8px_24px_-8px_rgba(219,0,17,0.4)] active:bg-[var(--hsbc-pressed)]"
                  : "cursor-not-allowed bg-[var(--sand)] text-[var(--taupe)]"
              }`}
            >
              Send code
            </button>
            {!canSendCode && (
              <p className="mt-2 text-center text-[11px] text-[var(--taupe)]">
                Enter a valid mobile and tick the consent to continue.
              </p>
            )}
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="mt-1 font-display text-[26px] leading-tight text-[var(--ink)]">
              Enter your code.
            </h2>
            <p className="mt-2 text-[13px] text-[var(--taupe)]">
              We sent a 6-digit code to +91 {mobile.replace(/(\d{5})(\d{5})/, "$1 $2")}. It is valid for 5 minutes.
            </p>

            <div className="mt-8 flex justify-center gap-2">
              {otp.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    otpRefs.current[i] = el;
                  }}
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 1);
                    setOtp((prev) => {
                      const next = [...prev];
                      next[i] = v;
                      return next;
                    });
                    if (v && i < 5) otpRefs.current[i + 1]?.focus();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
                  }}
                  className={`h-12 w-10 rounded-xl border bg-[var(--sand)]/50 text-center font-display text-[20px] text-[var(--ink)] focus:border-[var(--gold)] focus:outline-none ${
                    d ? "border-[var(--ink)]/20" : "border-[var(--hairline)]"
                  }`}
                />
              ))}
            </div>

            <p className="mt-5 text-center text-[12px] text-[var(--taupe)]">
              Didn't receive it?{" "}
              {resendIn > 0 ? (
                <span>Resend in {resendIn}s</span>
              ) : (
                <button
                  onClick={() => setResendIn(30)}
                  className="text-[var(--ink)] underline underline-offset-2"
                >
                  Resend code
                </button>
              )}
            </p>

            <button
              disabled={!otpValid}
              onClick={() => setStep("prefs")}
              className={`mt-8 w-full rounded-2xl py-3.5 text-[14px] font-medium ${
                otpValid
                  ? "bg-[var(--hsbc)] text-[var(--ivory)] active:bg-[var(--hsbc-pressed)]"
                  : "cursor-not-allowed bg-[var(--sand)] text-[var(--taupe)]"
              }`}
            >
              Verify
            </button>
          </>
        )}

        {step === "prefs" && (
          <>
            <h2 className="mt-1 font-display text-[26px] leading-tight text-[var(--ink)]">
              Your preferences.
            </h2>
            <p className="mt-2 text-[13px] text-[var(--taupe)]">
              So we may recommend the right rooms, reads and tables.
            </p>

            <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[var(--taupe)]">Skill level</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSkill(s)}
                  className={`rounded-full border px-3.5 py-1.5 text-[12px] transition ${
                    skill === s
                      ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--ivory)]"
                      : "border-[var(--hairline)] bg-[var(--sand)]/60 text-[var(--ink)]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[var(--taupe)]">Interests</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {INTERESTS.map((tag) => {
                const active = interests.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() =>
                      setInterests((p) => (active ? p.filter((x) => x !== tag) : [...p, tag]))
                    }
                    className={`rounded-full border px-3.5 py-1.5 text-[12px] transition ${
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

            <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[var(--taupe)]">Playing style</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s === style ? "" : s)}
                  className={`rounded-full border px-3.5 py-1.5 text-[12px] transition ${
                    style === s
                      ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--ivory)]"
                      : "border-[var(--hairline)] bg-[var(--sand)]/60 text-[var(--ink)]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="mt-9 flex gap-3">
              <button
                onClick={() => { setSkill(""); setInterests([]); setStyle(""); setStep("details"); }}
                className="flex-1 rounded-2xl border border-[var(--ink)]/15 py-3.5 text-[14px] font-medium text-[var(--ink)] active:bg-[var(--sand)]"
              >
                Skip
              </button>
              <button
                onClick={() => setStep("details")}
                className="flex-1 rounded-2xl bg-[var(--hsbc)] py-3.5 text-[14px] font-medium text-[var(--ivory)] active:bg-[var(--hsbc-pressed)]"
              >
                Continue
              </button>
            </div>
          </>
        )}

        {step === "details" && (
          <>
            <h2 className="mt-1 font-display text-[26px] leading-tight text-[var(--ink)]">
              A little about you.
            </h2>
            <p className="mt-2 text-[13px] text-[var(--taupe)]">
              Optional — helps us address you and find tables nearby.
            </p>

            <div className="mt-6">
              <label className="text-[10px] uppercase tracking-[0.22em] text-[var(--taupe)]">
                City <span className="text-[var(--taupe)]/70">· optional</span>
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-2 w-full appearance-none border-0 border-b border-[var(--hairline)] bg-transparent pb-2 font-display text-[18px] text-[var(--ink)] focus:border-[var(--gold)] focus:outline-none"
              >
                <option value="">Select your city</option>
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div className="mt-6">
              <label className="text-[10px] uppercase tracking-[0.22em] text-[var(--taupe)]">
                Name <span className="text-[var(--taupe)]/70">· optional</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-2 w-full border-0 border-b border-[var(--hairline)] bg-transparent pb-2 font-display text-[18px] text-[var(--ink)] placeholder:text-[var(--taupe)]/60 focus:border-[var(--gold)] focus:outline-none"
              />
            </div>

            <div className="mt-9 flex gap-3">
              <button
                onClick={() => finish({ skipDetails: true })}
                className="flex-1 rounded-2xl bg-[var(--hsbc)]/70 py-3.5 text-[14px] font-medium text-[var(--ivory)] active:bg-[var(--hsbc)]/80"
              >
                Skip and enter
              </button>
              <button
                onClick={() => finish()}
                className="flex-1 rounded-2xl bg-[var(--hsbc)] py-3.5 text-[14px] font-medium text-[var(--ivory)] active:bg-[var(--hsbc-pressed)]"
              >
                Enter the Circle
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

