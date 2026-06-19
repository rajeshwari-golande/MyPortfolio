"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  id?: string;
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  id,
  label,
  title,
  subtitle,
  align = "left",
}: SectionHeaderProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${align === "center" ? "text-center" : ""}`}
    >
      <span className="inline-block text-sm font-mono uppercase tracking-widest text-accent mb-3">
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted text-lg max-w-2xl">{subtitle}</p>
      )}
      <div
        className={`mt-4 h-1 w-16 bg-accent rounded-full ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}
