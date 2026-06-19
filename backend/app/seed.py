from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models import BlogPost

BLOG_SEED_DATA = [
    {
        "title": "Implementing JWT Authentication in FastAPI",
        "slug": "fastapi-authentication",
        "excerpt": "A production-ready guide to building secure JWT authentication with FastAPI, including password hashing, token refresh, and role-based access control.",
        "tags": ["FastAPI", "Authentication", "JWT", "Python"],
        "read_time_minutes": 8,
        "content": """
<h2>Why JWT for Backend APIs?</h2>
<p>JSON Web Tokens provide stateless authentication ideal for REST APIs and microservices. In production FastAPI applications, JWT enables horizontal scaling without shared session storage.</p>
<h2>Core Implementation</h2>
<p>Start with <code>python-jose</code> for token encoding and <code>passlib</code> for bcrypt password hashing. Define token expiration and refresh logic from day one.</p>
<pre><code>from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401)
    return payload</code></pre>
<h2>Production Considerations</h2>
<p>Use HTTPS only, short-lived access tokens (15-30 min), refresh token rotation, and store secrets in environment variables. Implement rate limiting on auth endpoints to prevent brute force attacks.</p>
<h2>Role-Based Access</h2>
<p>Extend JWT payloads with role claims and create dependency injectors for route-level authorization. This pattern scales cleanly across microservices.</p>
""",
    },
    {
        "title": "Docker Fundamentals for Backend Engineers",
        "slug": "docker-fundamentals",
        "excerpt": "Essential Docker concepts every backend engineer needs: images, containers, multi-stage builds, and Docker Compose for local development.",
        "tags": ["Docker", "DevOps", "Containers"],
        "read_time_minutes": 6,
        "content": """
<h2>Containers vs Virtual Machines</h2>
<p>Docker containers share the host OS kernel, making them lightweight and fast to start. For backend services, this means consistent environments from development to production.</p>
<h2>Multi-Stage Builds</h2>
<p>Use multi-stage Dockerfiles to separate build dependencies from runtime. This reduces image size by 60-80% for Python applications.</p>
<pre><code>FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.12-slim
COPY --from=builder /usr/local/lib/python3.12 /usr/local/lib/python3.12
COPY . /app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0"]</code></pre>
<h2>Docker Compose</h2>
<p>Orchestrate frontend, backend, and database services with a single <code>docker-compose.yml</code>. Use named volumes for database persistence and health checks for service dependencies.</p>
""",
    },
    {
        "title": "PostgreSQL Query Optimization Techniques",
        "slug": "postgresql-optimization",
        "excerpt": "Practical strategies for optimizing PostgreSQL performance: indexing, query analysis with EXPLAIN, connection pooling, and schema design patterns.",
        "tags": ["PostgreSQL", "Database", "Performance"],
        "read_time_minutes": 10,
        "content": """
<h2>Understanding Query Plans</h2>
<p>Always use <code>EXPLAIN ANALYZE</code> before optimizing. Sequential scans on large tables are the most common performance bottleneck in production APIs.</p>
<h2>Indexing Strategy</h2>
<p>Create B-tree indexes on foreign keys and frequently filtered columns. Use partial indexes for queries with consistent WHERE clauses. Composite indexes should match your most common query patterns.</p>
<h2>Connection Pooling</h2>
<p>Configure SQLAlchemy pool size based on your deployment. A typical FastAPI service with 4 workers needs 10-20 connections max. Use PgBouncer for high-traffic deployments.</p>
<h2>Schema Design</h2>
<p>Normalize for write consistency, denormalize selectively for read performance. Use JSONB columns for flexible metadata while keeping core relational integrity.</p>
""",
    },
    {
        "title": "Building Production RAG Systems with LangChain and FAISS",
        "slug": "building-rag-systems",
        "excerpt": "End-to-end guide to building Retrieval-Augmented Generation pipelines: document ingestion, chunking strategies, vector indexing, and citation tracking.",
        "tags": ["RAG", "LangChain", "FAISS", "AI/ML"],
        "read_time_minutes": 12,
        "content": """
<h2>RAG Architecture Overview</h2>
<p>Retrieval-Augmented Generation combines document retrieval with LLM generation to produce grounded, citation-backed answers. This is essential for enterprise AI applications where hallucination is unacceptable.</p>
<h2>Document Processing Pipeline</h2>
<p>Ingest documents → chunk with overlap → embed using Gemini or OpenAI → store in FAISS vector index. Chunk size of 500 tokens with 50-token overlap works well for technical documents.</p>
<h2>FAISS for Vector Search</h2>
<p>FAISS provides efficient similarity search for millions of vectors. For production, persist indexes to disk and rebuild incrementally as documents are added.</p>
<h2>Citation Tracking</h2>
<p>Always return source metadata with generated answers. Recruiters and users need to verify AI responses against original documents — this builds trust in AI-powered systems.</p>
""",
    },
    {
        "title": "Deploying Full-Stack Applications on AWS EC2",
        "slug": "aws-deployment",
        "excerpt": "Step-by-step deployment guide for Dockerized Next.js and FastAPI applications on AWS EC2 with PostgreSQL and S3 storage.",
        "tags": ["AWS", "EC2", "Deployment", "Cloud"],
        "read_time_minutes": 9,
        "content": """
<h2>EC2 Instance Setup</h2>
<p>Launch a t3.medium instance with Ubuntu 22.04. Configure security groups for ports 80, 443, and 22. Install Docker and Docker Compose on the instance.</p>
<h2>Container Deployment</h2>
<p>Pull images from a container registry or build on-instance. Use Docker Compose with production environment variables. Set up Nginx as reverse proxy for SSL termination.</p>
<h2>Database Management</h2>
<p>Run PostgreSQL in a Docker container with persistent volumes, or use AWS RDS for managed database service. Always enable automated backups and point-in-time recovery.</p>
<h2>S3 for Static Assets</h2>
<p>Store resume PDFs, project screenshots, and ML model artifacts in S3 buckets. Configure IAM roles for EC2 instances to access S3 without hardcoded credentials.</p>
""",
    },
    {
        "title": "AI Engineering Concepts for Backend Developers",
        "slug": "ai-engineering-concepts",
        "excerpt": "Key AI engineering concepts backend developers should know: prompt engineering, embedding models, vector databases, and MLOps fundamentals.",
        "tags": ["AI/ML", "Engineering", "LLMs"],
        "read_time_minutes": 7,
        "content": """
<h2>From Backend to AI Engineering</h2>
<p>Backend engineers are uniquely positioned for AI engineering roles. The skills overlap: API design, data pipelines, system architecture, and production deployment.</p>
<h2>Prompt Engineering</h2>
<p>Treat prompts as API contracts. Use structured output formats, few-shot examples, and system prompts that define behavior boundaries. Version and test prompts like code.</p>
<h2>Embedding Models</h2>
<p>Embeddings convert text to vectors for semantic search. Choose embedding models based on domain: general-purpose (Gemini, OpenAI) vs domain-specific fine-tuned models.</p>
<h2>MLOps Fundamentals</h2>
<p>Apply DevOps principles to ML: version datasets, track experiments, automate training pipelines, monitor model drift, and implement canary deployments for model updates.</p>
""",
    },
]


def seed_blog_posts(db: Session):
    existing = db.query(BlogPost).count()
    if existing > 0:
        return

    for post_data in BLOG_SEED_DATA:
        post = BlogPost(
            **post_data,
            published_at=datetime.now(timezone.utc),
        )
        db.add(post)
    db.commit()
