from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate

from app.config import effective_gemini_api_key
from app.rag.indexer import get_vectorstore
from app.rag.fallback import fallback_response
from app.schemas import ChatCitation, ChatMessage, ChatResponse

SYSTEM_PROMPT = """You are an AI Resume Assistant for Rajeshwari Golande, a Python Backend Engineer
with AI/ML and DevOps expertise. Answer recruiter questions accurately based ONLY on the provided context.
Be professional, concise, and highlight relevant technical skills and achievements.
If the context doesn't contain enough information, say so honestly.
Always focus on engineering capabilities: backend development, AI/ML, DevOps, and system design."""

RAG_PROMPT = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PROMPT),
    ("human", """Context from portfolio documents:
{context}

Question: {question}

Provide a helpful, professional answer for a recruiter."""),
])


def get_rag_response(message: str, history: list[ChatMessage]) -> ChatResponse:
    try:
        api_key = effective_gemini_api_key()
        if not api_key:
            return fallback_response(message)

        vectorstore = get_vectorstore()
        if not vectorstore:
            return fallback_response(message)

        docs = vectorstore.similarity_search(message, k=4)
        context = "\n\n".join(
            f"[{doc.metadata.get('source', 'Unknown')}]: {doc.page_content}"
            for doc in docs
        )

        llm = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=api_key,
            temperature=0.3,
        )

        chain = RAG_PROMPT | llm
        result = chain.invoke({"context": context, "question": message})
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
