import { personalInfo } from "@/lib/data";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/30 mt-20">
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-semibold text-foreground">{personalInfo.name}</p>
            <p className="text-sm text-muted mt-1">
              Python Backend Engineer · AI/ML · DevOps
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 text-muted hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted">
          <p>
            © {new Date().getFullYear()} {personalInfo.name}. Built with Next.js,
            FastAPI, and PostgreSQL.
          </p>
        </div>
      </div>
    </footer>
  );
}
