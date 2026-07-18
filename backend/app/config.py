from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql://portfolio:portfolio@db:5432/portfolio"
    gemini_api_key: str = ""
    cors_origins: str = "http://localhost:3000,http://frontend:3000"
    faiss_index_path: str = "/app/data/faiss_index"
    rag_documents_path: str = "/app/data/documents"
    # Contact email delivery (optional — form still saves to DB without these)
    contact_to_email: str = ""
    resend_api_key: str = ""
    resend_from_email: str = "Portfolio Contact <onboarding@resend.dev>"
    web3forms_access_key: str = ""

    class Config:
        env_file = ".env"


settings = Settings()


def effective_gemini_api_key() -> str:
    """Only standard Google AI Studio keys (AIza...) work with LangChain."""
    key = settings.gemini_api_key.strip()
    return key if key.startswith("AIza") else ""
