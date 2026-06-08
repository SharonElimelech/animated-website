export const runtime = 'edge';
import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Lead capture for the Debt Calculator.
 * POSTs a lead, validates + de-spams it, and emails a formatted notification
 * to the firm via Resend.
 *
 * Required env (see .env.example):
 *   RESEND_API_KEY          - Resend API key (if absent, the lead is logged only)
 *   LEAD_NOTIFICATION_EMAIL - inbox that receives leads
 *   LEAD_FROM_EMAIL         - verified "from" address (defaults to Resend sandbox)
 */

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const TO = process.env.LEAD_NOTIFICATION_EMAIL || "office@hadar-elimelech.co.il";
const FROM = process.env.LEAD_FROM_EMAIL || "Hadar Leads <onboarding@resend.dev>";

// Lightweight in-memory rate limiter (per IP, best-effort on serverless)
const hits = new Map<string, number[]>();
function rateLimited(ip: string, max = 5, windowMs = 60_000) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > max;
}

const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const list = (v: unknown) =>
  Array.isArray(v) && v.length ? v.map((x) => `• ${esc(x)}`).join("<br>") : "—";

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
    }

    const data = await req.json().catch(() => null);
    if (!data || typeof data !== "object") {
      return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    }

    const { name, phone, email, debt, creditors, foreclosures, company } =
      data as Record<string, unknown>;

    // Honeypot — bots fill the hidden "company" field; accept silently, do nothing
    if (company) return NextResponse.json({ ok: true });

    // Validation
    if (!name || !phone || !email || !debt) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }
    if (String(name).length > 120 || String(phone).length > 40) {
      return NextResponse.json({ error: "invalid_length" }, { status: 400 });
    }

    const html = `
      <div dir="rtl" style="font-family:Arial,Helvetica,sans-serif;background:#050505;color:#ededed;padding:28px;border-radius:14px;max-width:560px;margin:auto">
        <div style="border-bottom:1px solid #2a2418;padding-bottom:14px;margin-bottom:18px">
          <h1 style="margin:0;font-size:20px;color:#d4af37">🚨 ליד חדש ממחשבון החובות</h1>
          <p style="margin:6px 0 0;color:#a39e95;font-size:13px">התקבל דרך אתר הדר אלימלך</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:15px">
          <tr><td style="padding:8px 0;color:#a39e95;width:130px">שם מלא</td><td style="padding:8px 0;font-weight:bold">${esc(name)}</td></tr>
          <tr><td style="padding:8px 0;color:#a39e95">טלפון</td><td style="padding:8px 0;font-weight:bold" dir="ltr">${esc(phone)}</td></tr>
          <tr><td style="padding:8px 0;color:#a39e95">דוא״ל</td><td style="padding:8px 0;font-weight:bold" dir="ltr">${esc(email)}</td></tr>
          <tr><td style="padding:8px 0;color:#a39e95">סך חוב משוער</td><td style="padding:8px 0;font-weight:bold;color:#d4af37">${esc(debt)}</td></tr>
          <tr><td style="padding:8px 0;color:#a39e95;vertical-align:top">גופים</td><td style="padding:8px 0">${list(creditors)}</td></tr>
          <tr><td style="padding:8px 0;color:#a39e95;vertical-align:top">עיקולים / הגבלות</td><td style="padding:8px 0">${list(foreclosures)}</td></tr>
        </table>
      </div>`;

    if (resend) {
      const { error } = await resend.emails.send({
        from: FROM,
        to: TO,
        subject: `🚨 ליד חדש ממחשבון החובות - ${String(name)}`,
        html,
        replyTo: String(email),
      });
      if (error) {
        console.error("[calculator-submit] resend error:", error);
        return NextResponse.json({ error: "email_failed" }, { status: 502 });
      }
    } else {
      console.warn(
        "[calculator-submit] RESEND_API_KEY not set — lead captured but not emailed:",
        { name, phone, email, debt, creditors, foreclosures },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[calculator-submit] error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
