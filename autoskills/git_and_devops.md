# Git & DevOps Standards

## 1. Branching Strategy
- Follow **GitHub Flow** or a simplified GitFlow:
  - `main`: Always production-ready.
  - `develop`: Integration branch.
  - `feature/*`: Feature branches branching off `develop`.
- Ensure conventional commits (e.g., `feat: add product`, `fix: auth bug`) to automate changelogs.

## 2. Docker & Local Development
- All dependencies (SQL Server, Redis, RabbitMQ, Seq) must be runnable via `docker-compose.yml`.
- Microservices should ideally have their own `Dockerfile` allowing them to be containerized individually.

## 3. CI/CD Pipeline
- Use GitHub Actions or Azure DevOps for PR checks.
- Every PR must pass Unit Tests, Architecture Tests, and a successful build before being merged.
