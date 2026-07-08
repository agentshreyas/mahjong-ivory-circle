import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const [step, setStep] = useState<"form" | "otp" | "preferences">("form");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [resendIn, setResendIn] = useState(30);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [interests, setInterests] = useState<string[]>(["History & Heritage", "Events Near Me"]);
  const [styles, setStyles] = useState<string[]>(["Cantonese"]);
  const [primaryStyle, setPrimaryStyle] = useState("Cantonese");
  const [skill, setSkill] = useState("Casual");

  const mobileValid = /^[6-9]\d{9}$/.test(mobile.replace(/\s+/g, ""));
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSendCode = useMemo(
    () => name.trim().length >= 2 && !!city && mobileValid && emailValid && consent,
    [name, city, mobileValid, emailValid, consent],
  );
  const otpValid = otp.every((c) => /\d/.test(c));

  useEffect(() => {
    if (step !== "otp") return;
    setResendIn(30);
    const t = setInterval(() => setResendIn((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [step]);

  const stepTitles: Record<typeof step, string> = {
    form: "Join the Circle",
    otp: "Enter your code",
    preferences: "A little about you",
  };

  return (
    <div className="relative flex h-full flex-col bg-[var(--ivory)]">
      <TopBar back title={stepTitles[step]} />

      <div className="flex-1 overflow-y-auto px-6 pb-10">
        <div className="mb-6 flex items-center gap-2">
          {(["form", "otp", "preferences"] as const).map((s, i) => (
            <div
              key={s}
              className={`h-[2px] flex-1 rounded-full ${
                ["form", "otp", "preferences"].indexOf(step) >= i
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
              We'll send a one‑time code to verify it's you. Sign up only — the Circle is invitation-led and has no separate sign-in.
            </p>

            <div className="mt-7 space-y-5">
              <Field label="Full name" value={name} onChange={setName} placeholder="Your name" />
              <div>
                <label className="text-[10px] uppercase tracking-[0.22em] text-[var(--taupe)]">City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-2 w-full appearance-none border-0 border-b border-[var(--hairline)] bg-transparent pb-2 font-display text-[18px] text-[var(--ink)] focus:border-[var(--gold)] focus:outline-none"
                >
                  <option value="">Select your city</option>
                  {CITIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
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
              <Field label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
              {!!email && !emailValid && (
                <p className="-mt-3 text-[11px] text-[var(--hsbc)]">Enter a valid email.</p>
              )}
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
                Complete every field and tick the consent to continue.
              </p>
            )}
          </>
        )}

        {step === "otp" && (
          <>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">Step 2 of 3</p>
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
                  ref={(el) => (otpRefs.current[i] = el)}
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
              onClick={() => setStep("preferences")}
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

        {step === "preferences" && (
          <>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">Step 3 of 3</p>
            <h2 className="mt-1 font-display text-[26px] leading-tight text-[var(--ink)]">
              Style, skill & interests.
            </h2>
            <p className="mt-2 text-[13px] text-[var(--taupe)]">
              So we may recommend the right rooms, reads and tables. All optional — you can skip.
            </p>

            <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[var(--taupe)]">
              Styles you play · tap once to select, again to mark primary
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {STYLES.map((s) => {
                const active = styles.includes(s);
                const isPrimary = primaryStyle === s;
                return (
                  <button
                    key={s}
                    onClick={() => {
                      if (!active) {
                        setStyles([...styles, s]);
                        if (!primaryStyle) setPrimaryStyle(s);
                      } else if (!isPrimary) {
                        setPrimaryStyle(s);
                      } else {
                        setStyles(styles.filter((x) => x !== s));
                        if (isPrimary) setPrimaryStyle(styles.filter((x) => x !== s)[0] ?? "");
                      }
                    }}
                    className={`rounded-full border px-3.5 py-1.5 text-[12px] transition ${
                      isPrimary
                        ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--ink)]"
                        : active
                          ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--ivory)]"
                          : "border-[var(--hairline)] bg-[var(--sand)]/60 text-[var(--ink)]"
                    }`}
                  >
                    {isPrimary && "★ "}{s}
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[var(--taupe)]">Your skill</p>
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

            <div className="mt-9 flex gap-3">
              <button
                onClick={() => {
                  writeMember({
                    name: name.trim(),
                    city,
                    mobile: `+91 ${mobile.replace(/(\d{5})(\d{5})/, "$1 $2")}`,
                    email,
                    interests: [],
                    styles: [],
                    primaryStyle: "",
                    skill: "",
                    guest: false,
                  });
                  navigate({ to: "/home" });
                }}
                className="flex-1 rounded-2xl border border-[var(--ink)]/15 py-3.5 text-[14px] font-medium text-[var(--ink)] active:bg-[var(--sand)]"
              >
                Skip
              </button>
              <button
                onClick={() => {
                  writeMember({
                    name: name.trim(),
                    city,
                    mobile: `+91 ${mobile.replace(/(\d{5})(\d{5})/, "$1 $2")}`,
                    email,
                    interests,
                    styles,
                    primaryStyle,
                    skill,
                    guest: false,
                  });
                  navigate({ to: "/home" });
                }}
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

function Field({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.22em] text-[var(--taupe)]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full border-0 border-b border-[var(--hairline)] bg-transparent pb-2 font-display text-[18px] text-[var(--ink)] placeholder:text-[var(--taupe)]/60 focus:border-[var(--gold)] focus:outline-none"
      />
    </div>
  );
}