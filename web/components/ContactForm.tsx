"use client";

import { useState } from "react";

type Topic = "General" | "Conference" | "Teaching" | "Partnership" | "Press" | "Other";

const TOPICS: Topic[] = ["General", "Conference", "Teaching", "Partnership", "Press", "Other"];

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    topic: "General" as Topic,
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Send failed (${res.status})`);
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-lg bg-white border border-mist shadow-omi-sm p-8 md:p-10 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-heritage/15 border border-gold-heritage/40 mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F2C54A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display font-bold text-indigo-deep text-2xl">Message received.</h3>
        <p className="mt-3 text-graphite leading-relaxed">
          Thanks for reaching out. Someone from the Outpouring team will be in touch within two business days.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setForm({ firstName: "", lastName: "", email: "", organization: "", topic: "General", message: "" });
          }}
          className="mt-6 text-sm font-display font-semibold text-gold-heritage hover:text-indigo-deep transition-colors"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-white border border-mist shadow-omi-sm p-6 md:p-8 space-y-5">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-display font-semibold text-graphite mb-1.5">
            First name <span className="text-[#B83636]">*</span>
          </label>
          <input
            type="text"
            required
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="w-full px-3 py-2.5 rounded-md border border-mist bg-white text-indigo-deep text-sm focus:outline-none focus:border-gold-heritage focus:ring-2 focus:ring-gold-heritage/20"
          />
        </div>
        <div>
          <label className="block text-xs font-display font-semibold text-graphite mb-1.5">
            Last name <span className="text-[#B83636]">*</span>
          </label>
          <input
            type="text"
            required
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="w-full px-3 py-2.5 rounded-md border border-mist bg-white text-indigo-deep text-sm focus:outline-none focus:border-gold-heritage focus:ring-2 focus:ring-gold-heritage/20"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-display font-semibold text-graphite mb-1.5">
          Email <span className="text-[#B83636]">*</span>
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-3 py-2.5 rounded-md border border-mist bg-white text-indigo-deep text-sm focus:outline-none focus:border-gold-heritage focus:ring-2 focus:ring-gold-heritage/20"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-display font-semibold text-graphite mb-1.5">
            Organization <span className="text-graphite/50">(optional)</span>
          </label>
          <input
            type="text"
            value={form.organization}
            onChange={(e) => setForm({ ...form, organization: e.target.value })}
            className="w-full px-3 py-2.5 rounded-md border border-mist bg-white text-indigo-deep text-sm focus:outline-none focus:border-gold-heritage focus:ring-2 focus:ring-gold-heritage/20"
          />
        </div>
        <div>
          <label className="block text-xs font-display font-semibold text-graphite mb-1.5">Topic</label>
          <select
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value as Topic })}
            className="w-full px-3 py-2.5 rounded-md border border-mist bg-white text-indigo-deep text-sm focus:outline-none focus:border-gold-heritage focus:ring-2 focus:ring-gold-heritage/20"
          >
            {TOPICS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-display font-semibold text-graphite mb-1.5">
          Message <span className="text-[#B83636]">*</span>
        </label>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-3 py-2.5 rounded-md border border-mist bg-white text-indigo-deep text-sm focus:outline-none focus:border-gold-heritage focus:ring-2 focus:ring-gold-heritage/20 resize-none"
        />
      </div>

      {error && (
        <div className="text-sm text-[#B83636] bg-[#B83636]/5 border border-[#B83636]/20 rounded-md px-3 py-2.5">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary w-full !justify-center disabled:opacity-70 disabled:cursor-wait"
      >
        {submitting ? "Sending…" : "Send message"}
        {!submitting && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 7h12m-5-5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <p className="text-[11px] text-graphite/60 leading-relaxed text-center">
        We read every message and respond within two business days.
      </p>
    </form>
  );
}
