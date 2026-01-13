<!-- Sync Impact Report
Version Change: [Init] -> 1.0.0
Modified Principles: Defined P1-P6 based on project requirements.
Added Sections: Technology Stack, Development Workflow.
Templates:
- plan-template.md: ✅ Compatible (Generic checks align with new principles)
- spec-template.md: ✅ Compatible (Requirements section supports new constraints)
- tasks-template.md: ✅ Compatible (Task phases align with spec-first flow)
-->
# Hackathon II – Phase II Constitution

## Core Principles

### I. Spec-First Development
<!-- Example: I. Library-First -->
All development must follow approved specifications. Implementation without a preceding spec is prohibited. The workflow strictly follows: Spec → Plan → Tasks → Implement. Traceability must be maintained across all stages to ensure requirements are met and verifiable.

### II. Clear Separation of Concerns
<!-- Example: II. CLI Interface -->
The architecture MUST maintain a strict separation between Frontend and Backend responsibilities. The Frontend (Next.js) is responsible for UI/UX and interaction, while the Backend (FastAPI) handles business logic, data persistence, and security. No business logic is permitted in the Frontend.

### III. API-Driven Architecture
<!-- Example: III. Test-First (NON-NEGOTIABLE) -->
Communication between Frontend and Backend MUST occur exclusively via RESTful HTTP APIs. The Backend exposes endpoints; the Frontend consumes them using standard HTTP clients (fetch). Direct database access from the Frontend is strictly prohibited.

### IV. Quality & Standards
<!-- Example: IV. Integration Testing -->
API contracts (request/response models) must be explicitly defined. Input validation using Pydantic (Backend) is mandatory. HTTP status codes must be semantically correct. Secrets and database connection strings MUST be managed via environment variables and never hardcoded.

### V. Database Integrity
<!-- Example: V. Observability, VI. Versioning & Breaking Changes, VII. Simplicity -->
Persistence is handled by Neon DB (PostgreSQL). Database schema MUST be managed via code (SQLModel) and migrations, ensuring reproducibility. Manual database edits are prohibited to maintain the source of truth in the codebase.

### VI. Constraints & Scope
<!-- Example: VI. Versioning & Breaking Changes -->
No external backend frameworks beyond the FastAPI ecosystem are allowed. Monolithic architecture patterns are forbidden. The scope is limited to Core CRUD functionality and its necessary UI, ensuring a focused and deliverable Full-Stack prototype.

## Technology Stack
<!-- Example: Additional Constraints, Security Requirements, Performance Standards, etc. -->

**Frontend**: Next.js (App Router), TypeScript. Rendering: Server Components preferred, Client Components where necessary.
**Backend**: FastAPI, Python 3.x, SQLModel. API Style: REST (JSON).
**Database**: Neon DB (PostgreSQL) accessed via SQLModel.

## Development Workflow
<!-- Example: Development Workflow, Review Process, Quality Gates, etc. -->

Development proceeds in two distinct services (Frontend/Backend). Changes should be atomic and testable.
1. Define the Spec (Requirements & User Stories).
2. Plan the Architecture (Data Models & API Contracts).
3. Create Tasks (Separated by User Story).
4. Implement (Backend first, then Frontend integration recommended).
5. Verify (Local execution and flow validation).

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

This Constitution supersedes all prior practices. Amendments must be documented via the governance process and require a version bump. All Pull Requests and Design Reviews must explicitly verify compliance with these principles. Use `.specify/memory/constitution.md` as the source of truth.

**Version**: 1.0.0 | **Ratified**: 2026-01-07 | **Last Amended**: 2026-01-07