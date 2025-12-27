"use client";

import Section from "@/src/components/layouts/Section";
import { Card, CardContent, CardTitle } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Textarea } from "@/src/components/ui/Textarea";
import { useMemo, useState } from "react";

const CONTACT_EMAIL = "info@gradeup.solutions"; // TODO: değiştir

function encode(value: string) {
  return encodeURIComponent(value);
}

export default function Contact() {
  const budgetOptions = useMemo(
    () => ["Not sure yet", "$5k–$15k", "$15k–$50k", "$50k+", "Retainer"],
    []
  );
  const timelineOptions = useMemo(
    () => ["ASAP", "2–4 weeks", "1–2 months", "3+ months", "Exploring"],
    []
  );

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState(budgetOptions[0]);
  const [timeline, setTimeline] = useState(timelineOptions[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "ok">("idle");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `New inquiry — ${name || "Website"}${
      company ? ` (${company})` : ""
    }`;
    const body =
      `Name: ${name}\n` +
      `Company: ${company}\n` +
      `Email: ${email}\n` +
      `Budget: ${budget}\n` +
      `Timeline: ${timeline}\n\n` +
      `Message:\n${message}\n`;

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encode(
      subject
    )}&body=${encode(body)}`;

    // Opens user's mail client
    window.location.href = mailto;
    setStatus("ok");
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Still have questions? Let’s contact us."
      subtitle="Tell us what you’re building — we’ll respond with a clear next step."
      className="bg-bg py-10"
    >
      <div className="w-full">
        {/* Right: form */}
        <div className="w-full">
          <Card className="bg-surface border-surface-soft">
            <CardContent className="p-6">
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-medium tracking-[0.16em] uppercase text-slate">
                      Name
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium tracking-[0.16em] uppercase text-slate">
                      Company
                    </label>
                    <Input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company (optional)"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium tracking-[0.16em] uppercase text-text-muted">
                    Email
                  </label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    type="email"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium tracking-[0.16em] uppercase text-text-muted">
                    Message
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe what you’re building and what success looks like."
                    required
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-slate">
                    By submitting, you agree to be contacted back about this
                    inquiry.
                  </p>

                  <Button type="submit" variant="primary" className="bg-accent text-white rounded-full hover:bg-accent-hover hover:border-accent-hover">
                    Send message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}
