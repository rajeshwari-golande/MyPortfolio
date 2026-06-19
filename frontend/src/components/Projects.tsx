"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ChevronDown,
  Database,
  Cloud,
  Layers,
  BarChart3,
} from "lucide-react";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import SectionHeader from "@/components/SectionHeader";
import Button from "@/components/ui/Button";
import { projects } from "@/lib/data";

function ArchitectureDiagram({ name }: { name: string }) {
  const layers = [
    { label: "Client Layer", items: ["Next.js UI", "REST Client"] },
    { label: "API Gateway", items: ["FastAPI", "JWT Auth", "Rate Limiting"] },
    { label: "Services", items: ["Business Logic", "AI/RAG Pipeline", "Background Jobs"] },
    { label: "Data Layer", items: ["PostgreSQL", "FAISS / S3", "Redis Cache"] },
    { label: "Infrastructure", items: ["Docker", "AWS EC2", "GitHub Actions"] },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-mono text-accent mb-3">
        <Layers size={16} />
        Architecture — {name}
      </div>
      {layers.map((layer, i) => (
        <div
          key={layer.label}
          className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border"
        >
          <span className="w-6 h-6 rounded bg-accent/10 text-accent text-xs flex items-center justify-center font-mono">
            {i + 1}
          </span>
          <div className="flex-1">
            <span className="text-xs font-mono text-muted uppercase">{layer.label}</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {layer.items.map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 text-xs bg-surface rounded text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DatabaseSchema() {
  const tables = [
    { name: "users", fields: "id, email, password_hash, role, created_at" },
    { name: "sessions", fields: "id, user_id, token, expires_at" },
    { name: "documents", fields: "id, title, s3_key, metadata, indexed_at" },
    { name: "conversations", fields: "id, user_id, messages, created_at" },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-mono text-accent mb-3">
        <Database size={16} />
        Database Schema
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        {tables.map((table) => (
          <div
            key={table.name}
            className="p-3 rounded-lg bg-background border border-border font-mono text-xs"
          >
            <span className="text-accent">{table.name}</span>
            <p className="text-muted mt-1 break-all">{table.fields}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeploymentFlow() {
  const steps = [
    "Git Push → GitHub Actions CI",
    "Run Tests & Lint Checks",
    "Build Docker Images",
    "Push to Container Registry",
    "Deploy to AWS EC2",
    "Health Check & Rollback Ready",
  ];

  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-mono text-accent mb-3">
        <Cloud size={16} />
        Deployment Flow
      </div>
      <div className="flex flex-wrap gap-2">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <span className="px-3 py-1.5 text-xs bg-background border border-border rounded-lg text-muted">
              {step}
            </span>
            {i < steps.length - 1 && (
              <span className="text-accent hidden sm:inline">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(projects[0]?.id ?? null);

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
      <div className="section-container relative">
        <SectionHeader
          label="Projects"
          title="Production-Grade Systems"
          subtitle="Enterprise applications demonstrating backend, AI/ML, and DevOps expertise."
        />

        <div className="space-y-8">
          {projects.map((project, index) => {
            const isOpen = expanded === project.id;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-border bg-surface/60 card-glow overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-accent">
                        Project {index + 1}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-foreground mt-1">
                        {project.name}
                      </h3>
                      <p className="text-lg text-muted mt-1">{project.tagline}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        href={project.github}
                        variant="outline"
                        size="sm"
                        external
                      >
                        <GitHubIcon className="w-4 h-4" />
                        GitHub
                      </Button>
                      <Button
                        href={project.demo}
                        variant="primary"
                        size="sm"
                        external
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono bg-accent/10 text-accent rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div
                        key={key}
                        className="p-4 rounded-lg bg-background border border-border text-center"
                      >
                        <BarChart3 size={16} className="text-accent mx-auto mb-2" />
                        <p className="text-lg font-bold text-foreground">{value}</p>
                        <p className="text-xs text-muted font-mono">{key}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setExpanded(isOpen ? null : project.id)}
                    className="mt-6 flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm font-medium"
                  >
                    {isOpen ? "Hide Details" : "View Architecture & Details"}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-border"
                    >
                      <div className="p-6 sm:p-8 grid lg:grid-cols-2 gap-8 bg-background/30">
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-sm font-mono uppercase tracking-wider text-accent-red mb-2">
                              Problem Statement
                            </h4>
                            <p className="text-muted text-sm leading-relaxed">
                              {project.problem}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-mono uppercase tracking-wider text-accent-red mb-2">
                              Key Features
                            </h4>
                            <ul className="space-y-1.5">
                              {project.features.map((f) => (
                                <li
                                  key={f}
                                  className="text-sm text-muted flex items-start gap-2"
                                >
                                  <span className="text-accent">▸</span>
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <DeploymentFlow />
                        </div>

                        <div className="space-y-6">
                          <ArchitectureDiagram name={project.name} />
                          <DatabaseSchema />

                          <div className="rounded-lg border border-border bg-surface p-4 aspect-video flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-full h-32 bg-gradient-to-br from-accent/10 to-accent-red/10 rounded-lg mb-3 flex items-center justify-center">
                                <span className="text-muted text-sm font-mono">
                                  Screenshot Placeholder
                                </span>
                              </div>
                              <p className="text-xs text-muted">
                                Add project screenshots to /public/projects/
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
