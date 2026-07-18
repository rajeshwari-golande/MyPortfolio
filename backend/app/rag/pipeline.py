from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate

from app.config import effective_gemini_api_key
from app.rag.indexer import get_vectorstore
from app.rag.fallback import fallback_response, detect_intent, INTENT_SOURCES
from app.schemas import ChatCitation, ChatMessage, ChatResponse

SYSTEM_PROMPT = """You are an AI Resume Assistant for Rajeshwari Golande (Python Backend / AI-ML / DevOps).

Rules:
1. Answer ONLY the question asked. If they ask about experience, do NOT discuss education unless asked.
2. Use ONLY the provided context. If context is insufficient, say what is missing briefly.
3. Keep answers short, clear, and recruiter-friendly.
4. Prefer bullet points (•). Avoid long paragraphs.
5. Always include concrete details recruiters expect when available:
   - Role / company / dates
   - Tech stack
   - What she built or owned
   - Measurable impact (metrics) when present
6. Tone: confident, positive, professional — never desperate or vague.
7. Do not invent employers, degrees, projects, or metrics."""

RAG_PROMPT = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PROMPT),
    ("human", """Question type focus: {intent}

Context (use only what matches the question):
{context}

Recruiter question: {question}

Write a short, point-wise technical answer. Lead with the direct answer, then 3–6 bullets with stack / scope / impact."""),
])


def _filter_docs_by_intent(docs, intent: str):
    preferred = INTENT_SOURCES.get(intent, [])
    if not preferred:
        return docs
    matched = [
        d for d in docs
        if d.metadata.get("source", "") in preferred
    ]
    return matched if matched else docs


def get_rag_response(message: str, history: list[ChatMessage]) -> ChatResponse:
    try:
        api_key = effective_gemini_api_key()
        if not api_key:
            return fallback_response(message)

        vectorstore = get_vectorstore()
        if not vectorstore:
            return fallback_response(message)

        intent = detect_intent(message)
        docs = vectorstore.similarity_search(message, k=6)
        docs = _filter_docs_by_intent(docs, intent)[:4]

        context = "\n\n".join(
            f"[{doc.metadata.get('source', 'Unknown')}]: {doc.page_content}"
            for doc in docs
        )

        llm = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=api_key,
            temperature=0.2,
        )

        chain = RAG_PROMPT | llm
        result = chain.invoke(
            {"context": context, "question": message, "intent": intent}
        )
        answer = result.content if hasattr(result, "content") else str(result)

        citations = []
        seen_sources = set()
        for doc in docs:
            source = doc.metadata.get("source", "Portfolio")
            if source not in seen_sources:
                seen_sources.add(source)
                citations.append(
                    ChatCitation(
                        source=source,
                        excerpt=doc.page_content[:250] + ("..." if len(doc.page_content) > 250 else ""),
                    )
                )

        return ChatResponse(answer=answer, citations=citations)

    except Exception:
        return fallback_response(message)
