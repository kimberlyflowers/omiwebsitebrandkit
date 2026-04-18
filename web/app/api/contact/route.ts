import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = {
  firstName: string;
  lastName: string;
  email: string;
  organization?: string;
  topic: string;
  message: string;
};

/* Contact submissions.
   Delivery options (wire whichever you prefer by setting env vars):
   - RESEND_API_KEY + CONTACT_INBOX_EMAIL → sends via Resend
   - Falls back to console logging so the form still "works" before
     email is wired.
*/

async function sendWithResend(body: Body) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_INBOX_EMAIL;
  if (!apiKey || !to) return false;

  const payload = {
    from: "OMI Website <website@outpouringmissions.org>",
    to: [to],
    reply_to: body.email,
    subject: `[OMI · ${body.topic}] ${body.firstName} ${body.lastName}`,
    text: [
      `From: ${body.firstName} ${body.lastName} <${body.email}>`,
      body.organization ? `Org: ${body.organization}` : "",
      `Topic: ${body.topic}`,
      ``,
      body.message,
    ]
      .filter(Boolean)
      .join("\n"),
  };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return res.ok;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { firstName, lastName, email, message } = body;
  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Try Resend first; always log so the submission isn't lost.
  const sent = await sendWithResend(body).catch(() => false);

  if (!sent) {
    // eslint-disable-next-line no-console
    console.log("[contact] new submission (email not configured):", body);
  }

  return NextResponse.json({ ok: true, delivered: sent });
}
