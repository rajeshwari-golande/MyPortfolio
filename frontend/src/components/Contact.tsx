"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { submitContact } from "@/lib/api";
import { personalInfo } from "@/lib/data";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await submitContact(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="section-container">
        <SectionHeader
          label="Contact"
          title="Get In Touch"
          subtitle="Open to Software Engineering, Backend, AI/ML, and MLOps roles at leading tech and FinTech companies."
          align="center"
        />

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card hover={false}>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Let&apos;s Connect
            </h3>
            <p className="text-muted mb-6 leading-relaxed">
              Whether you&apos;re a recruiter, hiring manager, or fellow engineer —
              I&apos;d love to hear from you. I typically respond within 24 hours.
            </p>
            <div className="space-y-3 text-sm">
              <p className="text-muted">
                <span className="text-accent font-mono">Email:</span>{" "}
                {personalInfo.email}
              </p>
              <p className="text-muted">
                <span className="text-accent font-mono">Location:</span> Pune,
                Maharashtra, India
              </p>
              <p className="text-muted">
                <span className="text-accent font-mono">Availability:</span> Full-time
                from June 2026
              </p>
            </div>
          </Card>

          <Card hover={false}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-muted mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:border-accent/50 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-muted mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:border-accent/50 focus:outline-none transition-colors"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm text-muted mb-1.5">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:border-accent/50 focus:outline-none transition-colors"
                  placeholder="Opportunity at..."
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-muted mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:border-accent/50 focus:outline-none transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-400 text-sm"
                >
                  <CheckCircle size={16} />
                  Message sent successfully!
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-accent-red text-sm"
                >
                  <AlertCircle size={16} />
                  {errorMsg || "Failed to send. Please try again."}
                </motion.div>
              )}

              <Button
                type="submit"
                variant="primary"
                disabled={status === "loading"}
                className="w-full"
              >
                <Send size={16} />
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
