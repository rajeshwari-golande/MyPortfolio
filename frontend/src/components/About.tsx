"use client";

import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/ui/Card";
import { aboutContent } from "@/lib/data";
import { Code2, Brain, Server, Cloud } from "lucide-react";

const highlights = [
  { icon: Server, label: "Backend Engineering", desc: "FastAPI, REST, PostgreSQL" },
  { icon: Brain, label: "AI/ML Engineering", desc: "RAG, LLMs, LangChain" },
  { icon: Cloud, label: "DevOps & Cloud", desc: "Docker, AWS, CI/CD" },
  { icon: Code2, label: "System Design", desc: "Microservices, Scalable APIs" },
];

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="section-container">
        <SectionHeader
          label="About Me"
          title="Engineering with Purpose"
          subtitle="Building reliable systems at the intersection of backend engineering and AI — learning deeply, shipping thoughtfully, and aiming to create technology that serves people and the world."
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {aboutContent.paragraphs.map((para, i) => (
              <Card key={i} delay={i * 0.1} hover={false}>
                <p className="text-muted leading-relaxed">{para}</p>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            {highlights.map(({ icon: Icon, label, desc }, i) => (
              <Card key={label} delay={i * 0.1}>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{label}</h3>
                    <p className="text-sm text-muted mt-1">{desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
