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

        // Send confirmation email to the user
        const firstName = data.name.split(" ")[0] || data.name;
        const userHtml = `
          <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
            <p>Hi ${escapeHtml(firstName)},</p>
            <p>Thank you for your interest in joining Mahjong Circle.</p>
            <p>We've successfully received your invitation request and added your application to our waitlist. We appreciate you taking the time to tell us about yourself.</p>
            <p>At Mahjong Circle, we're building a thoughtfully curated community of people who share a passion for meaningful experiences, quality conversations, and authentic connections. Every application is reviewed carefully to ensure we maintain the experience our members expect.</p>
            <p><strong>Your Application</strong></p>
            <p>We've received the following information:<br/>
            Name: ${escapeHtml(data.name)}<br/>
            Email: ${escapeHtml(data.email)}<br/>
            City: ${escapeHtml(data.city)}<br/>
            Referral: ${escapeHtml(data.referredBy || "None")}</p>
            <p>Regards,<br/>
            From the Circle</p>
          </div>
        `;

        const userRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
            to: data.email,
            subject: "Your Mahjong Circle Application",
            html: userHtml,
          }),
        });

        if (!userRes.ok) {
          const text = await userRes.text();
          console.error("Failed to send user confirmation email via Resend", text);
        }
      } catch (err) {
        console.error("Error sending emails", err);
      }
    } else {
      console.warn("RESEND_API_KEY not set in .env file. Skipping email notification.");
    }

    // Submit to Google Apps Script
    try {
      const WAITLIST_ENDPOINT = "https://script.google.com/macros/s/AKfycbylgYhT6iBq-JJt55PdMpIXb9S0MbGoDpXAz4zwxBENH_jQXzYMCh1awiDdzyjmCeBX/exec";
      const appScriptRes = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
      });
      if (!appScriptRes.ok) {
        console.error("Failed to send data to Apps Script, status:", appScriptRes.status);
      }
    } catch (err) {
      console.error("Error sending data to Apps Script", err);
    }

    return { ok: true };
  });
