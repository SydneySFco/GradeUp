"use client";

import Section from "@/src/components/layouts/Section";
import { Card, CardContent } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Textarea } from "@/src/components/ui/Textarea";
import { useMemo, useState } from "react";
import { sendContactEmail } from "@/app/actions/contact";

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
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("loading");
    setStatusMessage("");

    try {
      const result = await sendContactEmail({
        name,
        company,
        email,
        budget,
        timeline,
        message,
      });

      if (result.success) {
        setStatus("success");
        setStatusMessage(result.message);
        setName("");
        setCompany("");
        setEmail("");
        setBudget(budgetOptions[0]);
        setTimeline(timelineOptions[0]);
        setMessage("");

        setTimeout(() => {
          setStatus("idle");
          setStatusMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setStatusMessage(result.message);

        console.error("Contact form error:", result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);

      setStatus("error");
      setStatusMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s talk."
      subtitle="Share goals + constraints. We’ll reply with a clear plan and next steps."
      className="bg-bg py-10"
    >
      <div className="w-full">
        {/* Right: form */}
        <div className="w-full">
          <Card className="bg-surface border-border-subtle">
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

                {status === "success" && (
                  <div className="rounded-lg bg-success/10 border border-success/20 p-4">
                    <p className="text-sm text-success font-medium">
                      {statusMessage}
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div className="rounded-lg bg-error/10 border border-error/20 p-4">
                    <p className="text-sm text-error font-medium">
                      {statusMessage}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-slate">
                    By submitting, you agree to be contacted back about this
                    inquiry.
                  </p>

                  <Button
                    type="submit"
                    variant="primary"
                    className="bg-accent text-white rounded-full hover:bg-accent-hover hover:border-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
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
