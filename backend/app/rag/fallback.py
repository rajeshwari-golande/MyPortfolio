from app.rag.documents import PORTFOLIO_DOCUMENTS
from app.schemas import ChatCitation, ChatResponse


def fallback_response(question: str) -> ChatResponse:
    """Keyword-based fallback when Gemini/FAISS is unavailable."""
    q = question.lower()
    relevant = []

    for doc in PORTFOLIO_DOCUMENTS:
        content_lower = doc["content"].lower()
        keywords = q.split()
        if any(kw in content_lower for kw in keywords if len(kw) > 3):
            relevant.append(doc)

    if not relevant:
        if "project" in q:
            relevant = [d for d in PORTFOLIO_DOCUMENTS if "Project" in d["source"]]
        elif "skill" in q or "technolog" in q or "know" in q:
            relevant = [d for d in PORTFOLIO_DOCUMENTS if d["source"] == "Skills"]
        elif "ptc" in q or "intern" in q:
            relevant = [d for d in PORTFOLIO_DOCUMENTS if "Experience" in d["source"]]
        elif "backend" in q:
            relevant = [
                d for d in PORTFOLIO_DOCUMENTS
                if d["source"] in ("Skills", "Resume - Summary")
            ]

    if not relevant:
        relevant = PORTFOLIO_DOCUMENTS[:3]

    citations = [
        ChatCitation(
            source=doc["source"],
            excerpt=doc["content"][:200] + "...",
        )
        for doc in relevant[:3]
    ]

    context_text = "\n\n".join(d["content"] for d in relevant[:3])
    answer = f"Based on Rajeshwari's portfolio:\n\n{context_text[:800]}"
    if len(context_text) > 800:
        answer += "\n\n(Ask a more specific question for detailed information.)"

    return ChatResponse(answer=answer, citations=citations)
