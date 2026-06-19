"use client";

import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/ui/Card";
import { achievements } from "@/lib/data";
import {
  Trophy,
  Code,
  Briefcase,
  FileText,
  Award,
  Star,
} from "lucide-react";

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 bg-surface/20">
      <div className="section-container">
        <SectionHeader
          label="Achievements"
          title="Track Record"
          subtitle="Competitive programming, hackathons, research, and professional milestones."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card delay={0}>
            <div className="flex items-center gap-3 mb-4">
              <Code className="text-accent" size={22} />
              <h3 className="font-semibold text-foreground">Coding Platforms</h3>
            </div>
            <div className="space-y-4">
              {achievements.coding.map((item) => (
                <div key={item.platform} className="p-3 rounded-lg bg-background border border-border">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{item.platform}</span>
                    <Star size={14} className="text-accent" />
                  </div>
                  <p className="text-accent font-mono text-sm mt-1">{item.stat}</p>
                  <p className="text-xs text-muted mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="text-accent-red" size={22} />
              <h3 className="font-semibold text-foreground">Hackathons</h3>
            </div>
            <div className="space-y-3">
              {achievements.hackathons.map((item) => (
                <div key={item.event} className="p-3 rounded-lg bg-background border border-border">
                  <p className="font-medium text-foreground text-sm">{item.event}</p>
                  <p className="text-accent text-sm font-mono mt-1">{item.result}</p>
                  <p className="text-xs text-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card delay={0.2}>
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="text-accent" size={22} />
              <h3 className="font-semibold text-foreground">Internships</h3>
            </div>
            <div className="space-y-3">
              {achievements.internships.map((item) => (
                <div key={item.company} className="p-3 rounded-lg bg-background border border-border">
                  <p className="font-medium text-foreground">{item.company}</p>
                  <p className="text-sm text-muted">{item.role}</p>
                  <p className="text-xs font-mono text-accent mt-1">{item.period}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card delay={0.3}>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="text-accent" size={22} />
              <h3 className="font-semibold text-foreground">Research</h3>
            </div>
            <div className="space-y-3">
              {achievements.research.map((item) => (
                <div key={item.title} className="p-3 rounded-lg bg-background border border-border">
                  <p className="font-medium text-foreground text-sm leading-snug">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted mt-2">{item.venue}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 text-xs bg-accent/10 text-accent rounded">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card delay={0.4} className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-accent-red" size={22} />
              <h3 className="font-semibold text-foreground">Certifications</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {achievements.certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="p-4 rounded-lg bg-background border border-border text-center"
                >
                  <p className="font-medium text-foreground text-sm">{cert.name}</p>
                  <p className="text-xs text-muted mt-1">{cert.issuer}</p>
                  <p className="text-xs font-mono text-accent mt-2">{cert.year}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
