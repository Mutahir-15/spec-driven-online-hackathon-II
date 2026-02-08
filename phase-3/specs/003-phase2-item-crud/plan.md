# Implementation Plan: Phase 2 Item CRUD

**Branch**: `003-phase2-item-crud` | **Date**: 2026-01-12 | **Spec**: [specs/003-phase2-item-crud/spec.md](specs/003-phase2-item-crud/spec.md)
**Input**: Feature specification from `specs/003-phase2-item-crud/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implementation of the Phase 2 Item CRUD functionality for a Full-Stack Todo Application. The focus is on a **UI-First** approach to deliver a premium, modern user experience using Next.js (App Router) and Tailwind CSS, backed by a robust FastAPI service interacting with Neon DB via SQLModel. The architecture enforces strict separation of concerns with API-driven communication.

## Technical Context

**Language/Version**: TypeScript 5.x (Frontend), Python 3.10+ (Backend)
**Primary Dependencies**: Next.js 14+ (App Router), Tailwind CSS, FastAPI, SQLModel, Uvicorn, Pydantic
**Storage**: Neon DB (PostgreSQL)
**Testing**: Pytest (Backend), Jest/React Testing Library (Frontend)
**Target Platform**: Modern Web Browsers (Responsive Mobile-First)
**Project Type**: Full-Stack Web Application
**Performance Goals**: <100ms UI interaction latency (optimistic UI), <200ms API response time
**Constraints**: Strict Frontend/Backend separation, No direct DB access from Frontend, WCAG 2.1 AA Accessibility
**Scale/Scope**: ~5 Screens (List, Create, Edit, Detail, 404), ~10 Reusable Components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Spec-First Development**: ✅ Spec exists and is prioritized.
- **Clear Separation of Concerns**: ✅ Frontend (Next.js) and Backend (FastAPI) are distinct.
- **API-Driven Architecture**: ✅ Contracts will be defined; Frontend uses `fetch` to consume API.
- **Quality & Standards**: ✅ Pydantic models for validation; TypeScript for type safety.
- **Database Integrity**: ✅ SQLModel + Neon DB; no manual edits.
- **Constraints & Scope**: ✅ Scope limited to CRUD; no monolithic patterns.

## Project Structure

### Documentation (this feature)

```text
specs/003-phase2-item-crud/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (OpenAPI)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── models/          # SQLModel classes (Item)
│   ├── api/             # FastAPI routes (items.py)
│   ├── core/            # Config, DB connection
│   └── main.py          # App entry point
└── tests/
    └── test_items.py    # API tests

frontend/
├── src/
│   ├── app/             # Next.js App Router (page.tsx, layout.tsx)
│   ├── components/      # Atomic UI components (ui/, features/)
│   ├── lib/             # Utilities, API client
│   └── types/           # TypeScript interfaces
└── tests/
```

**Structure Decision**: Option 2: Web application (Frontend + Backend separation). This aligns with the "Clear Separation of Concerns" principle of the Constitution.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
