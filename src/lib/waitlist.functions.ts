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

    return { ok: true };
  });
