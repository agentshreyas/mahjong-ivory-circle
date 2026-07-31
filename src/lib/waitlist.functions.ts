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
  .validator((data: unknown) => waitlistSchema.parse(data))
  .handler(async ({ data }) => {
    const url = (import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL)!;
    const key = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY)!;

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

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const escapeHtml = (unsafe: string) => 
        unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

      const html = `
        <h2>New Mahjong Circle invitation request</h2>
        <table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;font-family:sans-serif">
          <tr><td><strong>Full name</strong></td><td>${escapeHtml(data.name)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
          <tr><td><strong>City</strong></td><td>${escapeHtml(data.city)}</td></tr>
          <tr><td><strong>Referred by</strong></td><td>${escapeHtml(data.referredBy || "—")}</td></tr>
          <tr><td><strong>Reason</strong></td><td>${escapeHtml(data.reason || "—")}</td></tr>
          <tr><td><strong>Source</strong></td><td>${escapeHtml(data.source)}</td></tr>
        </table>
      `;

      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
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
          const text = await res.text();
          console.error("Failed to send waitlist notification email via Resend", text);
        }
      } catch (err) {
        console.error("Error sending waitlist notification email", err);
      }
    } else {
      console.warn("RESEND_API_KEY not set in .env file. Skipping email notification.");
    }

    return { ok: true };
  });
