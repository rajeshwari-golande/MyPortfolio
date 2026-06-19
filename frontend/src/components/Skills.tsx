"use client";

import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/ui/Card";
import { skillCategories } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-surface/20">
      <div className="section-container">
        <SectionHeader
          label="Skills"
          title="Technical Arsenal"
          subtitle="Production-ready skills across backend, AI/ML, cloud, and DevOps."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skillCategories.map((category, i) => (
            <Card key={category.title} delay={i * 0.05}>
              <h3 className="text-sm font-mono uppercase tracking-wider text-accent mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm bg-background border border-border rounded-lg text-foreground hover:border-accent/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
