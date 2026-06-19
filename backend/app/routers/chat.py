from fastapi import APIRouter

from app.schemas import ChatRequest, ChatResponse
from app.rag.pipeline import get_rag_response

router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.post("/", response_model=ChatResponse)
def chat(request: ChatRequest):
    return get_rag_response(request.message, request.history)
