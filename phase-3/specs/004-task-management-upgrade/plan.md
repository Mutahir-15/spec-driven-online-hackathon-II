# Implementation Plan: Task Management Upgrade

**Branch**: `004-task-management-upgrade` | **Date**: 2026-02-02 | **Spec**: [specs/004-task-management-upgrade/spec.md](specs/004-task-management-upgrade/spec.md)
**Input**: Feature specification from `specs/004-task-management-upgrade/spec.md`

## Summary
Upgrade the MVP into a production-ready application by adding advanced organization (priorities, tags), efficiency (search, filter, sort), and automation (recurring tasks, due dates). The approach remains **UI-First** and **API-Driven**, extending the current SQLModel schema and Next.js frontend without breaking existing CRUD functionality.

## Technical Context

**Language/Version**: Python 3.10+ (Backend), TypeScript 5.x (Frontend)
**Primary Dependencies**: FastAPI, SQLModel, Next.js 14/15, Tailwind CSS
**Storage**: Neon DB (PostgreSQL)
**Testing**: Pytest (Backend), ESLint (Frontend)
**Target Platform**: Modern Web Browsers
**Project Type**: Full-Stack Web Application
**Performance Goals**: <200ms for search/filter results
**Constraints**: No breaking changes; must maintain Indigo/Zinc UI theme
**Scale/Scope**: ~10 new functional requirements across 5 existing/new screens

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Spec-First Development**: ✅ Detailed spec exists.
- **Clear Separation of Concerns**: ✅ Business logic for recurring tasks/filtering is planned for the Backend.
- **API-Driven Architecture**: ✅ OpenAPI contract defined in `contracts/`.
- **Quality & Standards**: ✅ Type-safe schemas (Pydantic/TS) updated.
- **Database Integrity**: ✅ Migrations via Alembic/SQLModel planned.
- **Constraints & Scope**: ✅ Extends existing architecture.

## Project Structure

### Documentation (this feature)

```text
specs/004-task-management-upgrade/
├── plan.md              # This file
├── research.md          # Implementation decisions
├── data-model.md        # Extended schema (Priority, Tags, Recurrence)
├── quickstart.md        # Feature setup guide
├── contracts/           
│   └── openapi.yaml     # Extended API endpoints
└── checklists/          
    └── requirements.md  # Spec validation
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── models/          # Updated Item, new Tag model
│   ├── api/             # Updated search/filter logic in items.py
│   └── main.py
frontend/
├── src/
│   ├── components/      
│   │   ├── ui/          # Upgraded badges for priority
│   │   └── features/    # Search bar, Filter sidebar
│   ├── app/             # Page logic for filtering
│   └── lib/             # API client updates
```

**Structure Decision**: Option 2: Web application. This maintains the clean separation between `backend/` and `frontend/` as established in Phase 2.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
