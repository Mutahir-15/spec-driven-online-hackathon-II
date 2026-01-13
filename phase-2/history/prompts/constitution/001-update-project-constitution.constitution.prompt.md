---
id: 001
title: Update Project Constitution
stage: constitution
date: 2026-01-07
surface: agent
model: gemini-2.0-flash-exp
feature: none
branch: 002-task-org-usability
user: ADMINS
command: /sp.constitution
labels: ["governance", "setup", "principles"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - (none)
---

## Prompt

/sp.constitution Project: Hackathon II – Phase II  
Name: Full-Stack Web Application

Core Principles:
- Spec-first development (no implementation before specs)
- Clear separation of frontend and backend responsibilities
- API-driven architecture (frontend consumes backend via HTTP APIs)
- Incremental development with traceability (spec → plan → task → implement)
- Developer experience and maintainability

Technical Stack:
Frontend:
- Framework: Next.js (App Router)
- Language: TypeScript
- Rendering: Server Components where applicable, Client Components when needed

Backend:
- Framework: FastAPI
- Language: Python 3.x
- ORM / Models: SQLModel
- API Style: REST (JSON)

Database:
- Provider: Neon DB (PostgreSQL)
- Access via SQLModel
- Schema managed via code (no manual DB edits)

Architecture Standards:
- Frontend and backend developed as separate services
- Backend exposes RESTful endpoints
- Frontend communicates with backend using fetch / HTTP clients
- Environment variables used for secrets and DB connection strings

Feature Scope (Phase II – Full Stack):
- Core CRUD functionality exposed via backend APIs
- Frontend UI for interacting with backend
- Persistent storage using PostgreSQL (Neon DB)
- Basic error handling and validation

Constraints:
- No business logic inside frontend
- No direct database access from frontend
- No external backend frameworks beyond FastAPI ecosystem
- No monolithic architecture
- Spec-Kit Plus workflow is mandatory

Quality Standards:
- Clear API contracts (request/response models)
- Input validation using Pydantic / SQLModel
- Meaningful HTTP status codes
- Clean, readable, and modular code
- No hardcoded secrets

Success Criteria:
- Frontend successfully performs CRUD operations via backend APIs
- Backend persists and retrieves data from Neon DB
- Application runs locally without errors
- Specs, plan, tasks, and implementation are fully traceable

## Response snapshot

Updated constitution with principles P1-P6, new stack, and governance.

## Outcome

- ✅ Impact: Defined project core principles and tech stack.
- 🧪 Tests: N/A
- 📁 Files: Updated constitution.md
- 🔁 Next prompts: Proceed to spec creation.
- 🧠 Reflection: Standard setup flow.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): None
