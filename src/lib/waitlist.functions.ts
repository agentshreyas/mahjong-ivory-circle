import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const waitlistSchema = z.object({
  name: z.string().trim().min(2, "Please share your full name").max(80),
  email: z.string().trim().email("A valid email, please").max(160),
  city: z.string().trim().min(2, "City is required").max(60),
  referredBy: z.string().trim().max(80).optional(),
  reason: z.string().trim().max(500).optional(),
  source: z.enum(["hero", "form"]).default("form"),
});

export const submitWaitlist = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => waitlistSchema.parse(data))
  .handler(async ({ data }) => {
    const url = process.env.SUPABASE_URL!;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY!;

    const supabasePublic = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { error } = await supabasePublic.from("waitlist").insert({
      name: data.name,
      email: data.email,
      city: data.city,
      referred_by: data.referredBy || null,
      reason: data.reason || null,
      source: data.source,
    });

    if (error) {
      throw new Error(error.message);
    }

    await notifyWaitlistEmail(data);

    return { ok: true };
  });

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function notifyWaitlistEmail(data: z.infer<typeof waitlistSchema>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; skipping waitlist notification email");
    return;
  }

  const rows = [
    ["Full name", data.name],
    ["Email", data.email],
    ["City", data.city],
    ["Referred by", data.referredBy || "—"],
    ["Reason", data.reason || "—"],
    ["Source", data.source],
  ];

  const html = `
    <h2>New Mahjong Circle invitation request</h2>
    <table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;font-family:sans-serif">
      ${rows.map(([label, value]) => `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`).join("")}
    </table>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.WAITLIST_NOTIFY_EMAIL || "mahjong@nexaarhq.com",
      reply_to: data.email,
      subject: `New invitation request — ${data.name}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Failed to send waitlist notification email", await res.text());
  }
}
