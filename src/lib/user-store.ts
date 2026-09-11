import { useEffect, useState } from "react";

export type User = {
  name: string;
  phone: string;
  pincode: string;
  address: string;
  email: string;
};

const KEY = "greengrocer.user";

const fallback: User = {
  name: "Guest",
  phone: "",
  pincode: "560001",
  address: "12, Cunningham Road, Bengaluru",
  email: "",
};

export function writeUser(patch: Partial<User>) {
  if (typeof window === "undefined") return;
  const next = { ...readUser(), ...patch };
  window.localStorage.setItem(KEY, JSON.stringify(next));
}

export function readUser(): User {
  if (typeof window === "undefined") return fallback;
  try {
    return { ...fallback, ...JSON.parse(window.localStorage.getItem(KEY) || "{}") };
  } catch {
    return fallback;
  }
}

export function useUser(): User {
  const [user, setUser] = useState<User>(fallback);
  useEffect(() => setUser(readUser()), []);
  return user;
}
