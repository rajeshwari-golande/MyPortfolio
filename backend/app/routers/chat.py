from fastapi import APIRouter

from app.config import effective_gemini_api_key
from app.rag.fallback import fallback_response
from app.schemas import ChatRequest, ChatResponse

router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.post("/", response_model=ChatResponse)
def chat(request: ChatRequest):
    if not effective_gemini_api_key():
        return fallback_response(request.message)

    try:
        from app.rag.pipeline import get_rag_response

        return get_rag_response(request.message, request.history)
    except Exception:
        return fallback_response(request.message)
