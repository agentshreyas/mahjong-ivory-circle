import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronRight,
  Gift,
  HelpCircle,
  LogOut,
  Mail,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import { Screen } from "@/components/store/screen";
import { useUser } from "@/lib/user-store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My profile — GreenBasket" },
      {
        name: "description",
        content: "Manage your address, orders, loyalty points and support in one place.",
      },
      { property: "og:title", content: "My profile — GreenBasket" },
      {
        property: "og:description",
        content: "Manage your address, orders, loyalty points and support in one place.",
      },
    ],
  }),
  component: Profile,
});

function Profile() {
  const user = useUser();

  return (
    <Screen>
      <header className="bg-[var(--emerald)] px-4 pb-8 pt-5">
        <h1 className="text-[20px] font-extrabold tracking-[-0.03em] text-white">My profile</h1>
      </header>

      <div className="-mt-5 px-4">
        <div className="card-soft p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--soft)] text-[17px] font-extrabold text-[var(--emerald-deep)]">
              {(user.name || "G").slice(0, 1).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="text-[15px] font-extrabold tracking-[-0.02em] text-[var(--ink)]">
                {user.name || "Guest"}
              </p>
              <p className="text-[11.5px] font-semibold text-[var(--slate)]">
                +91 {user.phone || "—"}
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-[11px] bg-[var(--soft)] p-3">
            <MapPin size={14} className="mt-0.5 shrink-0 text-[var(--emerald)]" />
            <div>
              <p className="text-[12px] font-bold text-[var(--ink)]">{user.address}</p>
              <p className="text-[11px] font-semibold text-[var(--slate)]">{user.pincode}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Email confirm */}
      <div className="mt-3 px-4">
        <div className="flex items-center gap-3 rounded-[16px] bg-white p-3.5">
          <Mail size={16} className="text-[var(--emerald)]" />
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] font-extrabold text-[var(--ink)]">
              {user.email || "Add your email"}
            </p>
            <p className="text-[11px] font-semibold text-[var(--slate)]">
              For invoices and order updates
            </p>
          </div>
          <span className="kicker rounded-[9px] bg-[var(--emerald)] px-2.5 py-2 text-white">
            {user.email ? "Confirm" : "Add"}
          </span>
        </div>
      </div>

      {/* Orders */}
      <div className="mt-3 px-4">
        <Link to="/orders" className="flex items-center gap-3 rounded-t-[16px] bg-white p-3.5">
          <Package size={16} className="text-[var(--emerald)]" />
          <span className="flex-1 text-[12.5px] font-extrabold text-[var(--ink)]">My orders</span>
          <ChevronRight size={15} className="text-[var(--slate)]" />
        </Link>
        <div className="h-px bg-[var(--hairline)]" />
        <Link to="/orders" className="flex items-center gap-3 rounded-b-[16px] bg-white p-3.5">
          <Truck size={16} className="text-[var(--emerald)]" />
          <span className="flex-1 text-[12.5px] font-extrabold text-[var(--ink)]">
            Track current order
          </span>
          <span className="kicker text-[var(--emerald)]">8 mins</span>
        </Link>
      </div>

      {/* Loyalty */}
      <div className="mt-3 px-4">
        <div className="rounded-[16px] bg-[var(--emerald-deep)] p-4">
          <p className="kicker text-[var(--pastel)]">Loyalty & coupons</p>
          <p className="mt-1.5 text-[22px] font-extrabold leading-none tracking-[-0.03em] text-white">
            420 points
          </p>
          <p className="mt-1.5 text-[11.5px] font-semibold text-[var(--mint)]">
            Worth ₹210 · 3 coupons available
          </p>
          <div className="mt-3 flex gap-2">
            {["FRESH50", "MILK10", "GB199"].map((c) => (
              <span
                key={c}
                className="kicker rounded-full bg-[var(--mint)] px-2.5 py-1 text-[var(--emerald-deep)]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Help */}
      <div className="mt-3 px-4">
        <div className="flex items-center gap-3 rounded-t-[16px] bg-white p-3.5">
          <HelpCircle size={16} className="text-[var(--emerald)]" />
          <div className="flex-1">
            <p className="text-[12.5px] font-extrabold text-[var(--ink)]">Help & support</p>
            <p className="text-[11px] font-semibold text-[var(--slate)]">
              care@greenbasket.in · 1800 200 400
            </p>
          </div>
        </div>
        <div className="h-px bg-[var(--hairline)]" />
        <div className="flex items-center gap-3 rounded-b-[16px] bg-white p-3.5">
          <Gift size={16} className="text-[var(--emerald)]" />
          <span className="flex-1 text-[12.5px] font-extrabold text-[var(--ink)]">
            Refer a friend, get ₹100
          </span>
        </div>
      </div>

      <div className="mt-3 px-4 pb-6">
        <Link
          to="/login"
          className="flex items-center justify-center gap-2 rounded-[16px] bg-white p-3.5 text-[12.5px] font-extrabold text-[var(--warn)]"
        >
          <LogOut size={15} /> Log out
        </Link>
      </div>
    </Screen>
  );
}
