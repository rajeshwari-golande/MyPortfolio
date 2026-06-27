import os
import pickle
from pathlib import Path

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.schema import Document

from app.config import settings, effective_gemini_api_key
from app.rag.documents import PORTFOLIO_DOCUMENTS

_vectorstore = None


def _get_embeddings():
    api_key = effective_gemini_api_key()
    if not api_key:
        return None
    try:
        return GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=api_key,
        )
    except Exception:
        return None


def build_vectorstore():
    embeddings = _get_embeddings()
    if not embeddings:
        return None

    try:
        docs = [
            Document(page_content=d["content"], metadata={"source": d["source"]})
            for d in PORTFOLIO_DOCUMENTS
        ]

        splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        chunks = splitter.split_documents(docs)

        vectorstore = FAISS.from_documents(chunks, embeddings)

        index_path = Path(settings.faiss_index_path)
        index_path.mkdir(parents=True, exist_ok=True)
        vectorstore.save_local(str(index_path))

        return vectorstore
    except Exception:
        return None


def get_vectorstore():
    global _vectorstore
    if _vectorstore is not None:
        return _vectorstore

    embeddings = _get_embeddings()
    if not embeddings:
        return None

    try:
        index_path = Path(settings.faiss_index_path)
        if index_path.exists() and (index_path / "index.faiss").exists():
            _vectorstore = FAISS.load_local(
                str(index_path),
                embeddings,
                allow_dangerous_deserialization=True,
            )
        else:
            _vectorstore = build_vectorstore()
    except Exception:
        _vectorstore = None

    return _vectorstore
