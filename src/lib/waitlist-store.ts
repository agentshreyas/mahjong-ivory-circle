export type WaitlistEntry = {
  name: string;
  email: string;
  city: string;
  referredBy?: string;
  reason?: string;
  submittedAt: string;
};

const KEY = "hsbc_mahjong_waitlist_v1";

export function addWaitlistEntry(entry: Omit<WaitlistEntry, "submittedAt">) {
  if (typeof window === "undefined") return;
  const raw = window.localStorage.getItem(KEY);
  const list: WaitlistEntry[] = raw ? JSON.parse(raw) : [];
  list.push({ ...entry, submittedAt: new Date().toISOString() });
  window.localStorage.setItem(KEY, JSON.stringify(list));
}