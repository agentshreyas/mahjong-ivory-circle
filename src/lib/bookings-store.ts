import { useEffect, useState } from "react";

export type Booking = { id: string; title: string; date: string; venue: string; img: string };
const KEY = "hsbc_mahjong_bookings_v1";

function read(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
function write(list: Booking[]) {
  window.localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("bookings-changed"));
}

export function toggleBooking(b: Booking) {
  const list = read();
  const exists = list.find((x) => x.id === b.id);
  write(exists ? list.filter((x) => x.id !== b.id) : [...list, b]);
}

export function isBooked(id: string) {
  return read().some((x) => x.id === id);
}

export function useBookings() {
  const [list, setList] = useState<Booking[]>([]);
  useEffect(() => {
    setList(read());
    const h = () => setList(read());
    window.addEventListener("bookings-changed", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("bookings-changed", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return list;
}