from fastapi import APIRouter

from app.schemas import ChatRequest, ChatResponse
from app.rag.pipeline import get_rag_response, _fallback_response

router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.post("/", response_model=ChatResponse)
def chat(request: ChatRequest):
    try:
        return get_rag_response(request.message, request.history)
    except Exception:
        return _fallback_response(request.message)
