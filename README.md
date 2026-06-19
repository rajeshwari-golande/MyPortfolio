# Rajeshwari Golande — Portfolio Platform

A production-grade personal portfolio website showcasing backend engineering, AI/ML, and DevOps expertise. Built as a full-stack platform with Next.js frontend, FastAPI backend, PostgreSQL database, and an AI-powered resume assistant using RAG.

## Problem Statement

Traditional student portfolios fail to communicate production engineering capabilities to recruiters at top technology and FinTech companies. This platform presents Rajeshwari Golande as a **Python Backend Engineer with AI/ML and DevOps expertise** — someone who can design, build, deploy, and maintain production-grade systems.

## System Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Next.js 15    │────▶│   FastAPI       │────▶│   PostgreSQL    │
│   Frontend      │     │   Backend       │     │   Database      │
│   (Port 3000)   │     │   (Port 8000)   │     │   (Port 5432)   │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                        ┌────────▼────────┐
                        │  RAG Pipeline   │
                        │  Gemini + FAISS │
                        │  + LangChain    │
                        └─────────────────┘
```

**Services:**
- **Frontend** — Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **Backend** — FastAPI with REST APIs for blog, contact, and AI chat
- **Database** — PostgreSQL for blog posts and contact submissions
- **AI Layer** — Gemini API + LangChain + FAISS vector store for RAG-powered resume assistant
- **DevOps** — Docker containers orchestrated via Docker Compose

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | Next.js 15+, TypeScript, Tailwind CSS, Framer Motion |
| Backend | FastAPI, Python 3.12 |
| Database | PostgreSQL 16 |
| AI | Gemini API, LangChain, FAISS |
| DevOps | Docker, Docker Compose, GitHub Actions |
| Cloud | AWS EC2, AWS S3 |

## Installation Guide

### Prerequisites

- Node.js 20+
- Python 3.12+
- Docker & Docker Compose
- PostgreSQL 16 (if running locally without Docker)
- Gemini API key (for AI assistant)

### Quick Start with Docker (Recommended)

```bash
# Clone the repository
git clone <repo-url>
cd portfolio

# Set your Gemini API key (optional — fallback mode works without it)
cp backend/.env.example backend/.env
# Edit backend/.env and add GEMINI_API_KEY

# Start all services
docker compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Local Development (Without Docker)

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with DATABASE_URL and GEMINI_API_KEY
uvicorn app.main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
npm run dev
```

## Docker Setup

Three containers are defined in `docker-compose.yml`:

| Container | Image | Port | Purpose |
|-----------|-------|------|---------|
| `portfolio-frontend` | Custom (Node 20) | 3000 | Next.js application |
| `portfolio-backend` | Custom (Python 3.12) | 8000 | FastAPI API server |
| `portfolio-db` | postgres:16-alpine | 5432 | PostgreSQL database |

**Volumes:**
- `postgres_data` — Persistent database storage
- `faiss_data` — Persistent FAISS vector index

## Deployment Guide

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed AWS EC2 deployment instructions.

**Summary:**
1. Launch EC2 instance (t3.medium recommended)
2. Install Docker and Docker Compose
3. Configure security groups (80, 443, 22)
4. Clone repository and set environment variables
5. Run `docker compose up -d --build`
6. Configure Nginx reverse proxy with SSL (Let's Encrypt)
7. Upload resume PDF and project screenshots to S3

## API Documentation

Interactive API docs available at `http://localhost:8000/docs` when the backend is running.

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/blog/` | List all blog posts |
| GET | `/api/blog/{slug}` | Get blog post by slug |
| POST | `/api/contact/` | Submit contact form |
| POST | `/api/chat/` | AI resume assistant query |

**Contact Request:**
```json
{
  "name": "Jane Recruiter",
  "email": "jane@company.com",
  "subject": "Backend Engineer Role",
  "message": "I'd like to discuss an opportunity..."
}
```

**Chat Request:**
```json
{
  "message": "What projects has Rajeshwari built?",
  "history": []
}
```

**Chat Response:**
```json
{
  "answer": "Rajeshwari has built three major projects...",
  "citations": [
    {
      "source": "Project - FinSight AI",
      "excerpt": "FinSight AI - Enterprise Financial Research Assistant..."
    }
  ]
}
```

## Database Schema

### blog_posts
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Auto-increment ID |
| title | VARCHAR(255) | Post title |
| slug | VARCHAR(255) UNIQUE | URL slug |
| excerpt | TEXT | Short description |
| content | TEXT | Full HTML content |
| tags | VARCHAR[] | Tag array |
| read_time_minutes | INTEGER | Estimated read time |
| published_at | TIMESTAMPTZ | Publication date |
| created_at | TIMESTAMPTZ | Creation timestamp |

### contact_submissions
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Auto-increment ID |
| name | VARCHAR(255) | Sender name |
| email | VARCHAR(255) | Sender email |
| subject | VARCHAR(500) | Message subject |
| message | TEXT | Message body |
| created_at | TIMESTAMPTZ | Submission timestamp |

## Website Sections

1. **Hero** — Professional landing with CTAs and social links
2. **About** — Engineering-focused introduction
3. **Experience** — Expandable timeline (PTC, ACTDBI)
4. **Education** — PCCOE Computer Engineering
5. **Skills** — Categorized technical skills
6. **Projects** — FinSight AI, MLOpsHub, InterviewAI with architecture diagrams
7. **Achievements** — Coding stats, hackathons, certifications
8. **Technical Blog** — PostgreSQL-backed blog system
9. **Resume** — View/download ATS-friendly resume
10. **AI Resume Assistant** — RAG chatbot with citations
11. **Contact** — Form stored in PostgreSQL

## Future Enhancements

- [ ] Admin dashboard for blog post management
- [ ] Email notifications for contact form submissions
- [ ] Analytics dashboard (visitor tracking)
- [ ] CI/CD pipeline with GitHub Actions
- [ ] AWS RDS migration for managed PostgreSQL
- [ ] CloudFront CDN for frontend static assets
- [ ] Real-time chat with WebSocket support
- [ ] Multi-language support
- [ ] Dark/light theme toggle
- [ ] Project screenshot gallery with S3 integration

## License

Private portfolio project. All rights reserved.
