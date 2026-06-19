from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import engine, Base, SessionLocal
from app.routers import blog, contact, chat
from app.seed import seed_blog_posts
from app.rag.indexer import build_vectorstore


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_blog_posts(db)
    finally:
        db.close()

    if settings.gemini_api_key:
        try:
            build_vectorstore()
        except Exception:
            pass

    yield


app = FastAPI(
    title="Rajeshwari Golande Portfolio API",
    description="Backend API for portfolio website — blog, contact, and AI resume assistant",
    version="1.0.0",
    lifespan=lifespan,
)

origins = [o.strip() for o in settings.cors_origins.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(blog.router)
app.include_router(contact.router)
app.include_router(chat.router)


@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "portfolio-api"}
