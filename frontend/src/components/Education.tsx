"use client";

import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/ui/Card";
import { education } from "@/lib/data";
import { GraduationCap, MapPin, Calendar, BookOpen } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-24">
      <div className="section-container">
        <SectionHeader
          label="Education"
          title="Academic Foundation"
          subtitle="Strong computer engineering fundamentals from a leading Pune institution."
        />

        <Card className="max-w-3xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-accent/10 text-accent">
              <GraduationCap size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                {education.institution}
              </h3>
              <p className="text-lg text-accent font-medium mt-1">
                {education.degree}
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {education.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {education.location}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={18} className="text-accent" />
              <h4 className="font-semibold text-foreground">Relevant Coursework</h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {education.coursework.map((course) => (
                <div
                  key={course}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-background border border-border"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-sm text-muted">{course}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
