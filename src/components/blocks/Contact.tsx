"use client";

import Section from "@/src/components/layouts/Section";
import { Card, CardContent } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Textarea } from "@/src/components/ui/Textarea";
import { useState } from "react";
import { sendContactEmail } from "@/app/actions/contact";
import { trackEvent } from "@/src/lib/analytics";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    try {
      const result = await sendContactEmail({
        name,
        company: "",
        email,
        budget: "Not specified",
        timeline: timeline || "Not specified",
        message,
      });

      if (result.success) {
        setStatus("success");
        setStatusMessage(result.message);
        trackEvent("contact_form_submit_success", { location: "contact_section" });
        setName("");
        setEmail("");
        setTimeline("");
        setMessage("");

        setTimeout(() => {
          setStatus("idle");
          setStatusMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setStatusMessage(result.message);
        trackEvent("contact_form_submit_error", {
          location: "contact_section",
          reason: "validation_or_service",
        });
      }
    } catch {
      setStatus("error");
      setStatusMessage("An unexpected error occurred. Please try again later.");
      trackEvent("contact_form_submit_error", {
        location: "contact_section",
        reason: "unexpected",
      });
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s plan your next release"
      subtitle="Tell us what you're building and your timeline. We reply within 24 hours with a clear next-step plan."
      className="bg-bg py-10"
    >
      <div className="w-full">
        <Card className="bg-surface border-border-subtle">
          <CardContent className="p-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium tracking-[0.16em] uppercase text-slate">Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium tracking-[0.16em] uppercase text-text-muted">Email</label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    type="email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium tracking-[0.16em] uppercase text-text-muted">Timeline</label>
                <Input
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  placeholder="e.g. MVP in 6 weeks"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium tracking-[0.16em] uppercase text-text-muted">What are you building?</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Briefly describe product goals, constraints, and what success looks like."
                  required
                />
              </div>

              {status === "success" && (
                <div className="rounded-lg bg-success/10 border border-success/20 p-4">
                  <p className="text-sm text-success font-medium">{statusMessage}</p>
                </div>
              )}

              {status === "error" && (
                <div className="rounded-lg bg-error/10 border border-error/20 p-4">
                  <p className="text-sm text-error font-medium">{statusMessage}</p>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <p className="text-xs text-slate">Average response time: under 24 hours.</p>

                <Button
                  type="submit"
                  variant="primary"
                  className="bg-accent text-white rounded-full hover:bg-accent-hover hover:border-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Send message"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
