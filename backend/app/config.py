from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql://portfolio:portfolio@db:5432/portfolio"
    gemini_api_key: str = ""
    cors_origins: str = "http://localhost:3000,http://frontend:3000"
    faiss_index_path: str = "/app/data/faiss_index"
    rag_documents_path: str = "/app/data/documents"

    class Config:
        env_file = ".env"


settings = Settings()


def effective_gemini_api_key() -> str:
    """Only standard Google AI Studio keys (AIza...) work with LangChain."""
    key = settings.gemini_api_key.strip()
    return key if key.startswith("AIza") else ""
