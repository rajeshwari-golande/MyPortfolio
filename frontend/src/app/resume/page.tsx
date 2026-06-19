import Link from "next/link";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { personalInfo } from "@/lib/data";

export const metadata = {
  title: "Resume | Rajeshwari Golande",
  description: "View and download Rajeshwari Golande's ATS-friendly resume.",
};

const resumeSections = [
  {
    title: "Summary",
    content:
      "Python Backend Engineer with expertise in FastAPI, PostgreSQL, AI/ML (RAG, LangChain), and DevOps (Docker, AWS). Experienced in building production-grade systems through internships at PTC and ACTDBI.",
  },
  {
    title: "Experience",
    items: [
      "PTC — ML DevOps Intern (May 2025 – Aug 2025): Built CI/CD pipelines, containerized ML services, reduced deployment time by 60%.",
      "ACTDBI — Data Analytics / ML Intern (Jan 2025 – Apr 2025): Developed data pipelines, built predictive models, optimized SQL queries by 45%.",
    ],
  },
  {
    title: "Projects",
    items: [
      "FinSight AI — Enterprise Financial Research Assistant (FastAPI, LangChain, FAISS, Gemini)",
      "MLOpsHub — Automated ML Lifecycle Platform (FastAPI, Docker, AWS S3, GitHub Actions)",
      "InterviewAI — AI-Powered Coding Interview Platform (FastAPI, Docker, Gemini API)",
    ],
  },
  {
    title: "Education",
    content:
      "B.E. Computer Engineering, PCCOE, Pune (2022 – 2026). Coursework: DSA, DBMS, OS, Networks, ML, AI.",
  },
  {
    title: "Skills",
    content:
      "Python, SQL, C++ | FastAPI, REST, JWT | PostgreSQL, MySQL | Scikit-Learn, LLMs, RAG, LangChain, FAISS | AWS EC2, S3 | Docker, GitHub Actions, Linux | System Design, Microservices",
  },
];

export default function ResumePage() {
  return (
    <div className="pt-24 pb-20">
      <div className="section-container max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="mb-10">
          <span className="inline-block text-sm font-mono uppercase tracking-widest text-accent mb-3">
            Resume
          </span>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {personalInfo.name}
          </h1>
          <p className="text-muted text-lg">{personalInfo.title}</p>
          <div className="mt-4 h-1 w-16 bg-accent rounded-full" />
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <Button href="/resume/rajeshwari-golande-resume.pdf" variant="primary">
            <Download size={18} />
            Download Resume (PDF)
          </Button>
          <Button href="/resume/rajeshwari-golande-resume-ats.txt" variant="outline">
            <FileText size={18} />
            Download ATS Version
          </Button>
        </div>

        <Card hover={false} className="mb-8">
          <div className="flex items-center gap-2 text-accent mb-4">
            <Eye size={18} />
            <h2 className="font-semibold text-foreground">Resume Preview</h2>
          </div>
          <p className="text-xs text-muted mb-6 font-mono">
            ATS-friendly format · Optimized for applicant tracking systems
          </p>

          <div className="space-y-8 border-l-2 border-accent/30 pl-6">
            {resumeSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold text-accent font-mono uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                {"content" in section && section.content && (
                  <p className="text-muted leading-relaxed">{section.content}</p>
                )}
                {"items" in section && section.items && (
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="text-muted text-sm flex items-start gap-2">
                        <span className="text-accent mt-0.5">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Card>

        <p className="text-sm text-muted text-center">
          Place PDF and ATS text files in{" "}
          <code className="text-accent font-mono">/public/resume/</code> for download
          links to work.
        </p>
      </div>
    </div>
  );
}
