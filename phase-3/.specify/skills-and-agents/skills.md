# AI-Native Development Skills Library

This document defines the core reusable skills required for an AI agent to autonomously architect and implement full-stack applications using the Spec-Driven Development (SDD) workflow.

## 1. Specification Synthesis
*   **Purpose**: To translate high-level user intent and vague requirements into concrete, technical specifications.
*   **Inputs**:
    *   User prompt / Raw request.
    *   Project Constitution (principles & standards).
    *   Existing `GEMINI.md` context.
*   **Outputs**:
    *   `specs/<feature>/spec.md`: A structured markdown file containing functional requirements, user stories, and acceptance criteria.
*   **Rules / Constraints**:
    *   Must prioritize clarity and atomicity (one requirement per bullet).
    *   Must identify "In Scope" and "Out of Scope" items.
    *   Must not define implementation details (code) unless strictly required by constraints.

## 2. Schema Architecting
*   **Purpose**: To design robust data models and relationships that support the specification.
*   **Inputs**:
    *   `spec.md`.
    *   Existing database schema (if any).
*   **Outputs**:
    *   SQLModel class definitions (Python).
    *   Entity Relationship (ER) description.
    *   Migration strategy.
*   **Rules / Constraints**:
    *   Use **SQLModel** for dual validation/ORM capabilities.
    *   Enforce strict typing (Python type hints).
    *   Define foreign keys and relationship links explicitly.
    *   Normalize data to 3NF unless performance requirements dictate denormalization.

## 3. API Contract Design
*   **Purpose**: To define the communication interface between the client and server before implementation.
*   **Inputs**:
    *   Data Models (Schema).
    *   Functional Requirements.
*   **Outputs**:
    *   OpenAPI / Swagger definitions (implicit via FastAPI).
    *   Route definitions (method, path, request body, response model).
*   **Rules / Constraints**:
    *   Follow **RESTful** naming conventions.
    *   Use standard HTTP status codes (200, 201, 400, 401, 404, 500).
    *   All inputs and outputs must be typed using Pydantic models.
    *   Secure endpoints by default (Auth required unless specified public).

## 4. Component Composition
*   **Purpose**: To build modular, reusable, and accessible user interface elements.
*   **Inputs**:
    *   UI requirements / Wireframe descriptions.
    *   Design system or CSS framework choice (e.g., Tailwind, Shadcn).
*   **Outputs**:
    *   React Functional Components (`.tsx`).
    *   Component-level state logic.
*   **Rules / Constraints**:
    *   Use **Next.js** App Router patterns (Server Components by default).
    *   Strict TypeScript typing for Props.
    *   Separate logic (hooks) from presentation (JSX) where complex.
    *   Ensure accessibility (ARIA attributes) compliance.

## 5. Integration Orchestration
*   **Purpose**: To safely bridge the Frontend and Backend layers.
*   **Inputs**:
    *   Backend API Endpoints.
    *   Frontend Components.
*   **Outputs**:
    *   Typed API Client / Service functions.
    *   Data fetching hooks (e.g., SWR or TanStack Query).
*   **Rules / Constraints**:
    *   Handle all network states: `loading`, `error`, `success`.
    *   Share types between Backend (FastAPI) and Frontend (TypeScript) where possible (or keep them strictly synchronized).
    *   Never hardcode API URLs; use environment variables.

## 6. Test Harnessing
*   **Purpose**: To verify that the implementation meets the specification and prevents regression.
*   **Inputs**:
    *   `spec.md` (Acceptance Criteria).
    *   Implemented Codebase.
*   **Outputs**:
    *   Backend Tests (Pytest).
    *   Frontend/E2E Tests (Jest/Playwright).
*   **Rules / Constraints**:
    *   Test behavior, not implementation details.
    *   Mock external dependencies (DB, 3rd party APIs) for unit tests.
    *   Every core feature must have at least one "Happy Path" and one "Error Path" test.

## 7. Decision Documentation
*   **Purpose**: To capture the architectural reasoning behind significant changes.
*   **Inputs**:
    *   Conflict resolution context.
    *   Tech stack selection trade-offs.
*   **Outputs**:
    *   `history/adr/XXXX-title.md` (Architecture Decision Record).
*   **Rules / Constraints**:
    *   Follow the format: **Context**, **Decision**, **Consequences**.
    *   Must be immutable once finalized.
    *   Reference the specific constraint or requirement driving the decision.
