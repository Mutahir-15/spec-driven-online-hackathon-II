---
description: "Task list for Phase 2 Item CRUD implementation"
---

# Tasks: Phase 2 Item CRUD

**Input**: Design documents from `specs/003-phase2-item-crud/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/openapi.yaml
**Feature Branch**: `003-phase2-item-crud`

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure (backend/src, frontend/src) per implementation plan
- [x] T002 Initialize Backend: Setup virtual environment, install FastAPI, Uvicorn, SQLModel, Pydantic
- [x] T003 [P] Initialize Frontend: Create Next.js App Router project with Tailwind CSS
- [x] T004 Configure environment variables (.env) for DB connection and API URL
- [x] T005 [P] Setup backend linting (Ruff) and frontend linting (ESLint/Prettier)
- [x] T006 [P] Configure shared types or API client generation setup

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Setup Database: Configure Neon DB connection in `backend/src/core/db.py`
- [x] T008 Implement Base Model: Create `Item` SQLModel in `backend/src/models/item.py`
- [x] T009 Setup Migrations: Initialize Alembic and generate initial migration for Item table
- [x] T010 Setup API Router: Create `backend/src/api/items.py` and register in `main.py`
- [x] T011 [P] Frontend Layout: Create global layout with navigation in `frontend/src/app/layout.tsx`
- [x] T012 [P] UI Components: Create atomic components (Button, Input, Card) in `frontend/src/components/ui/`
- [x] T013 [P] API Client: Create typed fetch wrapper in `frontend/src/lib/api.ts`

**Checkpoint**: Foundation ready - Database connected, models defined, UI shell ready.

## Phase 3: User Story 1 - Create New Item (Priority: P1) 🎯 MVP

**Goal**: Users can create a new item with a title and optional description.

**Independent Test**: Submit form -> Verify DB persistence -> Verify redirect/feedback.

### Implementation for User Story 1

- [x] T014 [US1] Backend: Implement `POST /items/` endpoint in `backend/src/api/items.py`
- [x] T015 [US1] Backend: Add validation for empty title in `ItemCreate` schema
- [x] T016 [US1] Frontend: Create `ItemForm` component in `frontend/src/components/features/item-form.tsx`
- [x] T017 [US1] Frontend: Create Create Item Page (`frontend/src/app/items/new/page.tsx`)
- [x] T018 [US1] Integration: Connect Form to API and handle success/error states (toast)

**Checkpoint**: User Story 1 functional and testable.

## Phase 4: User Story 2 - View Items (Priority: P1)

**Goal**: Users can view a list of all items and see details of individual items.

**Independent Test**: Verify list displays all DB items; Verify detail view matches DB data.

### Implementation for User Story 2

- [x] T019 [P] [US2] Backend: Implement `GET /items/` endpoint with pagination in `backend/src/api/items.py`
- [x] T020 [P] [US2] Backend: Implement `GET /items/{id}` endpoint in `backend/src/api/items.py`
- [x] T021 [US2] Frontend: Create `ItemCard` component in `frontend/src/components/features/item-card.tsx`
- [x] T022 [US2] Frontend: Implement Item List Page (`frontend/src/app/page.tsx` or `/items/page.tsx`)
- [x] T023 [US2] Frontend: Implement Item Detail Page (`frontend/src/app/items/[id]/page.tsx`)
- [x] T024 [P] [US2] Frontend: Implement 404 Error State for missing items

**Checkpoint**: User Stories 1 & 2 complete (Create & Read).

## Phase 5: User Story 3 - Update Item (Priority: P2)

**Goal**: Users can edit an existing item's title or description.

**Independent Test**: Edit item -> Save -> Verify updates in List/Detail view.

### Implementation for User Story 3

- [x] T025 [US3] Backend: Implement `PATCH /items/{id}` endpoint in `backend/src/api/items.py`
- [x] T026 [US3] Frontend: Add "Edit" mode to `ItemForm` component
- [x] T027 [US3] Frontend: Create Edit Item Page (`frontend/src/app/items/[id]/edit/page.tsx`)
- [x] T028 [US3] Integration: Connect Edit Form to API and handle optimistic updates (optional)

**Checkpoint**: User Stories 1, 2, & 3 complete (Create, Read, Update).

## Phase 6: User Story 4 - Delete Item (Priority: P2)

**Goal**: Users can permanently remove an item.

**Independent Test**: Delete item -> Confirm -> Verify removal from List.

### Implementation for User Story 4

- [x] T029 [US4] Backend: Implement `DELETE /items/{id}` endpoint in `backend/src/api/items.py`
- [x] T030 [US4] Frontend: Add Delete Button with Confirmation Dialog to `ItemCard` / Detail View
- [x] T031 [US4] Integration: Wire up delete action and refresh list/redirect

**Checkpoint**: Full CRUD functionality complete.

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements, accessibility, and final validation.

- [x] T032 [P] Accessibility: Audit ARIA labels and keyboard navigation
- [x] T033 [P] Styling: Refine hover states, transitions, and responsive layout
- [x] T034 [P] Error Handling: Ensure graceful UI for network errors/backend downtime
- [x] T035 Documentation: Update README.md with setup and usage instructions
- [x] T036 Validation: Run through all Acceptance Scenarios in spec.md

## Dependencies & Execution Order

1.  **Phase 1 (Setup)** & **Phase 2 (Foundational)** must be completed sequentially first.
2.  **Phase 3 (Create)** and **Phase 4 (View)** are P1 and should be prioritized. They can technically run in parallel if backend/frontend tasks are split.
3.  **Phase 5 (Update)** and **Phase 6 (Delete)** depend on the foundational CRUD structure but are largely independent of each other.

## Implementation Strategy

1.  **Foundation**: Build the backend models and frontend shell.
2.  **MVP**: Deliver **User Story 1 (Create)** and **User Story 2 (View)**. This proves data flow.
3.  **Enhance**: Add Update and Delete to complete the lifecycle.
4.  **Polish**: Refine UI/UX and ensure accessibility.
