"""Source documents for RAG indexing — resume, projects, experience, skills."""

PORTFOLIO_DOCUMENTS = [
    {
        "source": "Resume - Summary",
        "content": """Rajeshwari Golande is a Python Backend Engineer with AI/ML and DevOps expertise.
She builds scalable backend systems, AI-powered applications, and cloud-native solutions using
Python, FastAPI, PostgreSQL, Docker, AWS, and LLM technologies. She is a Computer Engineering
graduate from PCCOE (2026) seeking Software Engineering, Backend Engineering, AI/ML Engineering,
MLOps, and FinTech roles at companies like Citi, JPMorgan, Amazon, Microsoft, and Google.""",
    },
    {
        "source": "Experience - PTC",
        "content": """PTC - ML DevOps Intern (May 2025 – Aug 2025, Remote)
Responsibilities: Built CI/CD pipelines for ML model deployment using Docker and GitHub Actions.
Containerized ML inference services. Automated model versioning, testing, and rollback workflows.
Implemented monitoring dashboards for model performance drift.
Technologies: Python, Docker, GitHub Actions, Kubernetes, MLflow, Linux, AWS.
Achievements: Reduced model deployment time by 60%. Designed containerized inference architecture
serving 10K+ daily predictions. Implemented automated rollback reducing incident recovery to under 5 minutes.
Impact: Enabled ML team to ship models daily instead of weekly.""",
    },
    {
        "source": "Experience - ACTDBI",
        "content": """ACTDBI - Data Analytics / ML Intern (Jan 2025 – Apr 2025, Pune)
Responsibilities: Developed data pipelines for large-scale business datasets. Built predictive models
using Scikit-Learn for customer behavior analysis. Optimized SQL queries and database schemas.
Technologies: Python, Pandas, Scikit-Learn, SQL, PostgreSQL, Matplotlib, Jupyter.
Achievements: Improved query performance by 45%. Built churn prediction model with 87% accuracy.
Delivered automated reporting pipeline saving 15+ hours per week.""",
    },
    {
        "source": "Project - FinSight AI",
        "content": """FinSight AI - Enterprise Financial Research Assistant
Problem: Financial analysts spend hours manually researching market data and regulatory filings.
Architecture: Microservices with FastAPI backend, Next.js frontend, PostgreSQL, FAISS vector store,
Gemini API for generation. Documents ingested via S3, chunked, embedded, indexed for RAG.
Features: Natural language queries, multi-document RAG with citations, JWT authentication,
exportable PDF reports, conversation history.
Tech Stack: Python, FastAPI, Next.js, PostgreSQL, LangChain, FAISS, Gemini API, Docker, AWS S3.
Metrics: Query latency < 2s P95, 10K+ documents indexed, 92% MRR@5 retrieval accuracy, 99.5% uptime.""",
    },
    {
        "source": "Project - MLOpsHub",
        "content": """MLOpsHub - Automated ML Lifecycle Platform
Problem: ML teams struggle with fragmented tooling for experiment tracking, model registry, and deployment.
Architecture: Experiment tracking service, model registry API, deployment orchestrator, monitoring agent.
PostgreSQL for metadata, S3 for artifacts, Docker for training/inference environments.
Features: Experiment tracking, model versioning on S3, one-click Docker deployment,
performance monitoring, drift detection, GitHub Actions pipeline orchestration.
Tech Stack: Python, FastAPI, PostgreSQL, Docker, GitHub Actions, AWS S3, Scikit-Learn, MLflow.
Metrics: Deploy time < 3 min, 50+ models managed, 98% pipeline success, 40% cost reduction.""",
    },
    {
        "source": "Project - InterviewAI",
        "content": """InterviewAI - AI-Powered Coding Interview Platform
Problem: Technical interview prep lacks realistic, adaptive practice with personalized feedback.
Architecture: FastAPI backend, sandboxed Docker code execution, Gemini API for feedback,
PostgreSQL for progress tracking, Next.js with Monaco editor.
Features: Adaptive difficulty, AI hints and code review, real-time sandboxed execution,
progress tracking with skill gap analysis, mock interview sessions.
Tech Stack: Python, FastAPI, Next.js, PostgreSQL, Docker, Gemini API, Monaco Editor, Redis.
Metrics: 500+ active users, 15K+ problems solved, 4.7/5 feedback score.""",
    },
    {
        "source": "Skills",
        "content": """Technical Skills:
Languages: Python, SQL, C++
Backend: FastAPI, REST APIs, Authentication, JWT
Databases: PostgreSQL, MySQL
AI/ML: Scikit-Learn, LLMs, RAG, LangChain, FAISS
Cloud: AWS EC2, AWS S3, IAM
DevOps: Docker, Docker Compose, GitHub Actions, Linux
Concepts: System Design, OOP, Microservices""",
    },
    {
        "source": "Education",
        "content": """Education: B.E. Computer Engineering at Pimpri Chinchwad College of Engineering (PCCOE),
Pune, Maharashtra (2022 – 2026).
Relevant Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks,
Machine Learning, Artificial Intelligence.""",
    },
    {
        "source": "Achievements",
        "content": """Achievements:
Coding: LeetCode 350+ problems solved (Top 15% globally), CodeChef 3-Star Rating.
Hackathons: Smart India Hackathon 2025 National Finalist (FinTech), HackPCCOE 2024 1st Place (AI/ML),
CodeForGood JPMorgan participant.
Certifications: AWS Cloud Practitioner (2025), Docker Essentials (2024), PostgreSQL for Developers (2024).
Research: Presented 'Optimizing RAG Retrieval for Domain-Specific Financial Documents' at PCCOE Symposium 2025.""",
    },
]
