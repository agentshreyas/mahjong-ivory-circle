function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; skipping waitlist notification email");
    return new Response(JSON.stringify({ error: "Email not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await req.json();
  const { name, email, city, referredBy, reason, source } = data as {
    name: string;
    email: string;
    city: string;
    referredBy?: string;
    reason?: string;
    source: string;
  };

  const rows: [string, string][] = [
    ["Full name", name],
    ["Email", email],
    ["City", city],
    ["Referred by", referredBy || "—"],
    ["Reason", reason || "—"],
    ["Source", source],
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
      from: Deno.env.get("RESEND_FROM_EMAIL") || "onboarding@resend.dev",
      to: Deno.env.get("WAITLIST_NOTIFY_EMAIL") || "mahjong@nexaarhq.com",
      reply_to: email,
      subject: `New invitation request — ${name}`,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to send waitlist notification email", text);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
