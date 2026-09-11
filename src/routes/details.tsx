import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { writeUser } from "@/lib/user-store";

export const Route = createFileRoute("/details")({
  head: () => ({
    meta: [
      { title: "Your delivery details — GreenBasket" },
      { name: "description", content: "Add your name, pincode and address so we can deliver." },
      { property: "og:title", content: "Your delivery details — GreenBasket" },
      { property: "og:description", content: "Add your name, pincode and address so we can deliver." },
    ],
  }),
  component: Details,
});

function Field({
  label,
  value,
  onChange,
  placeholder,
  hint,
  numeric,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  hint?: string;
  numeric?: boolean;
  maxLength?: number;
}) {
  return (
    <div className="mt-4">
      <p className="kicker text-[var(--emerald-deep)]">{label}</p>
      <input
        value={value}
        inputMode={numeric ? "numeric" : "text"}
        maxLength={maxLength}
        onChange={(e) => onChange(numeric ? e.target.value.replace(/\D/g, "") : e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-[11px] bg-white px-3 py-3 text-[13.5px] font-bold text-[var(--ink)] outline-none placeholder:font-medium placeholder:text-[var(--slate)]"
      />
      {hint && (
        <p className="mt-1 text-[10.5px] font-semibold text-[var(--emerald-deep)]/60">{hint}</p>
      )}
    </div>
  );
}

function Details() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const ready = name.trim().length > 1 && pincode.length === 6;

  return (
    <div className="flex h-full flex-1 flex-col bg-[var(--pastel)]">
      <div className="rounded-b-[37px] bg-[var(--emerald)] px-6 pb-9 pt-12">
        <p className="kicker text-[var(--pastel)]">Step 3 of 3</p>
        <h1 className="mt-2 text-[26px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
          Where should we
          <br />
          deliver?
        </h1>
      </div>

      <div className="flex-1 px-6 pb-8 pt-5">
        <Field label="Full name" value={name} onChange={setName} placeholder="Aryan Singh" />
        <Field
          label="Pincode"
          value={pincode}
          onChange={setPincode}
          placeholder="560001"
          numeric
          maxLength={6}
        />
        <Field
          label="Address"
          value={address}
          onChange={setAddress}
          placeholder="Flat, building, street, area"
          hint="Required at checkout — you can add it later."
        />

        <button
          disabled={!ready}
          onClick={() => {
            writeUser({
              name: name.trim(),
              pincode,
              address: address.trim() || "Address pending",
            });
            navigate({ to: "/welcome" });
          }}
          className="mt-7 w-full rounded-[11px] bg-[var(--emerald)] py-3.5 text-[12px] font-extrabold uppercase tracking-[0.12em] text-white disabled:opacity-40"
        >
          Save & continue
        </button>
      </div>
    </div>
  );
}
