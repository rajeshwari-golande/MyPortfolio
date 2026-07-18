"""Intent-routed fallback when Gemini or FAISS is unavailable."""

from app.rag.documents import PORTFOLIO_DOCUMENTS
from app.schemas import ChatCitation, ChatResponse

# Intent → preferred document sources (order matters)
INTENT_SOURCES: dict[str, list[str]] = {
    "experience": ["Experience - PTC", "Experience - ACTDBI"],
    "education": ["Education"],
    "projects": [
        "Project - FinSight AI",
        "Project - MLOpsHub",
        "Project - InterviewAI",
    ],
    "skills": ["Skills"],
    "achievements": ["Achievements"],
    "summary": ["Resume - Summary", "Skills"],
}


def detect_intent(question: str) -> str:
    q = question.lower()

    if any(
        w in q
        for w in (
            "education",
            "college",
            "university",
            "degree",
            "pccoe",
            "coursework",
            "graduat",
            "academic",
            "b.e",
            "be computer",
        )
    ):
        return "education"

    if any(
        w in q
        for w in (
            "experience",
            "intern",
            "internship",
            "work history",
            "worked",
            "ptc",
            "actdbi",
            "job",
            "role",
            "employment",
            "professional",
        )
    ):
        return "experience"

    if any(
        w in q
        for w in (
            "project",
            "built",
            "finsight",
            "mlopshub",
            "interviewai",
            "portfolio app",
        )
    ):
        return "projects"

    if any(
        w in q
        for w in (
            "skill",
            "technolog",
            "tech stack",
            "stack",
            "know",
            "languages",
            "tools",
            "framework",
        )
    ):
        return "skills"

    if any(
        w in q
        for w in (
            "achievement",
            "hackathon",
            "leetcode",
            "certif",
            "award",
            "codechef",
        )
    ):
        return "achievements"

    return "summary"


def _docs_for_sources(sources: list[str]) -> list[dict]:
    by_source = {d["source"]: d for d in PORTFOLIO_DOCUMENTS}
    return [by_source[s] for s in sources if s in by_source]


def _format_experience(docs: list[dict]) -> str:
    lines = [
        "Rajeshwari's professional experience (internships):",
        "",
    ]
    for doc in docs:
        text = doc["content"]
        title = text.split("\n")[0].strip()
        tech = ""
        achievements = ""
        for line in text.split("\n"):
            if line.startswith("Technologies:"):
                tech = line.replace("Technologies:", "").strip()
            if line.startswith("Achievements:"):
                achievements = line.replace("Achievements:", "").strip()

        lines.append(f"• {title}")
        if tech:
            lines.append(f"  Tech: {tech}")
        if achievements:
            lines.append(f"  Impact: {achievements}")
        lines.append("")
    lines.append(
        "Best fit: Backend / AI-ML / MLOps roles involving Python, APIs, Docker, and data/ML pipelines."
    )
    return "\n".join(lines).strip()


def _format_education(docs: list[dict]) -> str:
    return (
        "Education:\n"
        "• B.E. Computer Engineering — Pimpri Chinchwad College of Engineering (PCCOE), Pune\n"
        "• Duration: 2022 – 2026\n"
        "• Coursework: DSA, DBMS, OS, Computer Networks, Machine Learning, Artificial Intelligence\n"
        "• Focus: applying academic foundations to backend, AI/ML, and production systems"
    )


def _format_projects(docs: list[dict]) -> str:
    lines = ["Key projects:", ""]
    for doc in docs:
        name = doc["source"].replace("Project - ", "")
        tech = ""
        metrics = ""
        problem = ""
        for line in doc["content"].split("\n"):
            line = line.strip()
            if line.startswith("Tech Stack:"):
                tech = line.replace("Tech Stack:", "").strip()
            elif line.startswith("Metrics:"):
                metrics = line.replace("Metrics:", "").strip()
            elif line.startswith("Problem:"):
                problem = line.replace("Problem:", "").strip()
        lines.append(f"• {name}")
        if problem:
            lines.append(f"  Problem: {problem}")
        if tech:
            lines.append(f"  Stack: {tech}")
        if metrics:
            lines.append(f"  Results: {metrics}")
        lines.append("")
    return "\n".join(lines).strip()


def _format_skills(docs: list[dict]) -> str:
    if not docs:
        return "Skills data is not available."
    content = docs[0]["content"].replace("Technical Skills:\n", "").strip()
    lines = ["Core technical skills:", ""]
    for line in content.split("\n"):
        line = line.strip()
        if line:
            lines.append(f"• {line}")
    lines.append("")
    lines.append(
        "Strongest areas: Python backend (FastAPI), PostgreSQL, Docker/CI-CD, and RAG/LLM systems."
    )
    return "\n".join(lines)


def _format_achievements(docs: list[dict]) -> str:
    if not docs:
        return "Achievements data is not available."
    content = docs[0]["content"].replace("Achievements:\n", "").strip()
    lines = ["Highlights recruiters often ask about:", ""]
    for line in content.split("\n"):
        line = line.strip()
        if line:
            lines.append(f"• {line}")
    return "\n".join(lines)


def _format_summary(docs: list[dict]) -> str:
    return (
        "Quick profile for recruiters:\n"
        "• Role focus: Python Backend Engineer | AI/ML | DevOps\n"
        "• Core stack: Python, FastAPI, PostgreSQL, Docker, AWS, LangChain/FAISS, Gemini\n"
        "• Experience: ML DevOps Intern at PTC; Data Analytics/ML Intern at ACTDBI\n"
        "• Projects: FinSight AI (RAG), MLOpsHub (ML lifecycle), InterviewAI (AI interviews)\n"
        "• Education: B.E. Computer Engineering, PCCOE (2022–2026)\n"
        "• Ask about experience, projects, or skills for more detail."
    )


def _format_answer(intent: str, docs: list[dict]) -> str:
    formatters = {
        "experience": _format_experience,
        "education": _format_education,
        "projects": _format_projects,
        "skills": _format_skills,
        "achievements": _format_achievements,
        "summary": _format_summary,
    }
    return formatters.get(intent, _format_summary)(docs)


def fallback_response(question: str) -> ChatResponse:
    """Intent-routed, recruiter-style answers when Gemini/FAISS is unavailable."""
    intent = detect_intent(question)
    sources = INTENT_SOURCES.get(intent, INTENT_SOURCES["summary"])
    relevant = _docs_for_sources(sources)

    if not relevant:
        relevant = PORTFOLIO_DOCUMENTS[:2]

    answer = _format_answer(intent, relevant)
    citations = [
        ChatCitation(
            source=doc["source"],
            excerpt=doc["content"][:200] + ("..." if len(doc["content"]) > 200 else ""),
        )
        for doc in relevant[:3]
    ]
    return ChatResponse(answer=answer, citations=citations)
