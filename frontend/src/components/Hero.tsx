"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, ArrowDown, Download, FolderOpen } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
import Button from "@/components/ui/Button";
import { personalInfo } from "@/lib/data";

function ProfilePhoto({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative p-1.5 rounded-2xl bg-gradient-to-br from-accent/40 via-accent/20 to-accent/5 shadow-[0_0_32px_rgba(250,204,21,0.15)] ${className}`}
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden ring-2 ring-accent/50 ring-offset-2 ring-offset-background">
        <Image
          src="/images/profile.jpg"
          alt={`${personalInfo.name} — professional headshot`}
          fill
          className="object-cover object-top"
          priority
          sizes="(max-width: 1024px) 112px, 220px"
        />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-[100dvh] min-h-[600px] flex flex-col pt-16 grid-pattern overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-accent-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 flex-1 flex items-center min-h-0 py-4 sm:py-6">
        <div className="w-full grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Mobile: name row + compact photo */}
            <div className="flex items-start justify-between gap-4 mb-3 lg:hidden">
              <div className="min-w-0 flex-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Open to Software Engineering Roles
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                  <span className="gradient-text">{personalInfo.name}</span>
                </h1>
              </div>
              <ProfilePhoto className="w-24 h-28 sm:w-28 sm:h-32 shrink-0" />
            </div>

            {/* Desktop: badge + name */}
            <div className="hidden lg:block">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-mono mb-3">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Open to Software Engineering Roles
              </div>
              <h1 className="text-5xl xl:text-6xl font-bold leading-tight mb-3">
                <span className="gradient-text">{personalInfo.name}</span>
              </h1>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-accent font-medium mb-2 lg:mb-3">
              {personalInfo.title}
            </p>

            <p className="text-muted text-sm sm:text-base leading-relaxed mb-4 lg:mb-5 max-w-xl">
              {personalInfo.summary}
            </p>

            <div className="flex flex-wrap gap-2 mb-3 lg:mb-4">
              <Button href="/#projects" variant="primary" size="sm" className="sm:!px-5 sm:!py-2.5 sm:!text-sm">
                <FolderOpen size={15} />
                View Projects
              </Button>
              <Button href="/resume" variant="outline" size="sm" className="sm:!px-5 sm:!py-2.5 sm:!text-sm">
                <Download size={15} />
                Download Resume
              </Button>
              <Button href="/#contact" variant="ghost" size="sm" className="sm:!px-5 sm:!py-2.5 sm:!text-sm">
                Contact Me
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-muted hover:text-accent hover:border-accent/30 transition-all text-sm"
              >
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-muted hover:text-accent hover:border-accent/30 transition-all text-sm"
              >
                <LinkedInIcon className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-muted hover:text-accent hover:border-accent/30 transition-all text-sm"
              >
                <Mail size={15} />
                Email
              </a>
            </div>
          </motion.div>

          {/* Desktop photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex justify-end shrink-0"
          >
            <ProfilePhoto className="w-52 h-60 xl:w-56 xl:h-64" />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 shrink-0 pb-5 flex justify-center"
      >
        <a
          href="/#about"
          className="text-muted hover:text-accent transition-colors animate-bounce"
          aria-label="Scroll to About"
        >
          <ArrowDown size={20} />
        </a>
      </motion.div>
    </section>
  );
}
