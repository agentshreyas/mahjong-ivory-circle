import { useEffect, useState } from "react";

export type Member = {
  name: string;
  city: string;
  mobile: string;
  email: string;
  memberSince: string;
  interests: string[];
  styles: string[];
  primaryStyle: string;
  skill: string;
  guest: boolean;
  notifications: { editorial: boolean; events: boolean; system: boolean };
};

const KEY = "hsbc_mahjong_member_v1";

const defaults: Member = {
  name: "Aanya Bhatia",
  city: "Mumbai",
  mobile: "+91 98200 12345",
  email: "aanya.bhatia@example.com",
  memberSince: "2024",
  interests: ["History & Heritage", "Events Near Me"],
  styles: ["Cantonese"],
  primaryStyle: "Cantonese",
  skill: "Intermediate",
  guest: true,
  notifications: { editorial: true, events: true, system: true },
};

function read(): Member {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaults;
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

export function writeMember(patch: Partial<Member>) {
  if (typeof window === "undefined") return;
  const next = { ...read(), ...patch };
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("member-changed"));
}

export function useMember(): Member {
  const [m, setM] = useState<Member>(defaults);
  useEffect(() => {
    setM(read());
    const h = () => setM(read());
    window.addEventListener("member-changed", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("member-changed", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return m;
}