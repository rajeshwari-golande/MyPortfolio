"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Building2, MapPin, Calendar } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { experiences } from "@/lib/data";

export default function Experience() {
  const [expanded, setExpanded] = useState<string | null>(experiences[0]?.id ?? null);

  return (
    <section id="experience" className="py-24 bg-surface/20">
      <div className="section-container">
        <SectionHeader
          label="Experience"
          title="Professional Journey"
          subtitle="Hands-on experience building ML pipelines, data systems, and production infrastructure."
        />

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-6">
            {experiences.map((exp, index) => {
              const isOpen = expanded === exp.id;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative md:pl-16"
                >
                  <div className="absolute left-4 top-6 w-4 h-4 rounded-full bg-accent border-4 border-background hidden md:block" />

                  <div className="rounded-xl border border-border bg-surface/50 card-glow overflow-hidden">
                    <button
                      onClick={() => setExpanded(isOpen ? null : exp.id)}
                      className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-surface-hover/30 transition-colors"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <Building2 size={18} className="text-accent" />
                          <h3 className="text-xl font-semibold text-foreground">
                            {exp.company}
                          </h3>
                          <span className="px-2 py-0.5 text-xs font-mono bg-accent/10 text-accent rounded">
                            {exp.role}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`text-muted transition-transform shrink-0 mt-1 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 space-y-6 border-t border-border pt-6">
                            <div>
                              <h4 className="text-sm font-mono uppercase tracking-wider text-accent mb-3">
                                Responsibilities
                              </h4>
                              <ul className="space-y-2">
                                {exp.responsibilities.map((item) => (
                                  <li
                                    key={item}
                                    className="text-muted text-sm flex items-start gap-2"
                                  >
                                    <span className="text-accent mt-1">▸</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-sm font-mono uppercase tracking-wider text-accent mb-3">
                                Technologies
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {exp.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-3 py-1 text-xs font-mono bg-background border border-border rounded-full text-muted"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-mono uppercase tracking-wider text-accent mb-3">
                                Achievements
                              </h4>
                              <ul className="space-y-2">
                                {exp.achievements.map((item) => (
                                  <li
                                    key={item}
                                    className="text-muted text-sm flex items-start gap-2"
                                  >
                                    <span className="text-accent-red mt-1">★</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {"impact" in exp && exp.impact && (
                              <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                                <h4 className="text-sm font-mono uppercase tracking-wider text-accent mb-2">
                                  Impact
                                </h4>
                                <p className="text-sm text-muted">{exp.impact}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
