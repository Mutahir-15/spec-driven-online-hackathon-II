---
description: "Task list for Task Management Upgrade (Phase III)"
---

# Tasks: Task Management Upgrade

**Input**: Design documents from `specs/004-task-management-upgrade/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/openapi.yaml

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create `specs/004-task-management-upgrade/contracts/` directory
- [x] T002 Configure environment variables for any new notification keys (if needed) in `.env`
- [x] T003 [P] Configure backend linting (Ruff) and frontend linting (ESLint) for new patterns

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create Tag model in `backend/src/models/tag.py` per data-model.md
- [x] T005 Update Item model with new fields (priority, due_date, due_time, is_recurring, recurrence_pattern) in `backend/src/models/item.py`
- [x] T006 Create TaskTag junction model in `backend/src/models/item.py` or `backend/src/models/tag.py`
- [x] T007 [P] Generate and run Alembic migration for new fields and Tag tables
- [x] T008 [P] Update Item schemas (Create/Update/Read) in `backend/src/models/item.py` to include new fields
- [x] T009 [P] Update Frontend Types in `frontend/src/types/index.ts` to match new backend models

**Checkpoint**: Foundation ready - Database schema updated, models and types aligned.

## Phase 3: User Story 1 - Advanced Task Management (Priority: P1) 🎯 MVP

**Goal**: Users can update tasks and toggle completion status with persistence.

**Independent Test**: Update task details -> Verify DB -> Toggle completion -> Verify persistence in UI/DB.

### Implementation for User Story 1

- [x] T010 [US1] Backend: Ensure `PATCH /items/{id}` handles all new fields in `backend/src/api/items.py`
- [x] T011 [US1] Frontend: Update `ItemForm` to support editing priority and due date in `frontend/src/components/features/item-form.tsx`
- [x] T012 [US1] Frontend: Add completion toggle checkbox to `ItemCard` in `frontend/src/components/features/item-card.tsx`
- [x] T013 [US1] Integration: Wire up completion toggle in `ItemCard` to call `PATCH /items/{id}` in `frontend/src/components/features/item-card.tsx`

**Checkpoint**: Core management features (Update/Toggle) functional.

## Phase 4: User Story 2 - Priorities and Tags (Priority: P1)

**Goal**: Users can organize tasks using priority levels and reusable tags.

**Independent Test**: Assign priority and tags -> Verify visual indicators in list view.

### Implementation for User Story 2

- [x] T014 [US2] Backend: Implement `GET /tags/` and `POST /tags/` endpoints in `backend/src/api/tags.py`
- [x] T015 [US2] Backend: Register tags router in `backend/src/main.py`
- [x] T016 [US2] Frontend: Create `Badge` component in `frontend/src/components/ui/badge.tsx` for priorities and tags
- [x] T017 [US2] Frontend: Implement Tag selection UI (multi-select) in `frontend/src/components/features/item-form.tsx`
- [x] T018 [US2] Frontend: Update `ItemCard` to display priority badge and tag list in `frontend/src/components/features/item-card.tsx`

**Checkpoint**: Visual organization (Priorities/Tags) complete.

## Phase 5: User Story 3 - Search, Filter, and Sort (Priority: P2)

**Goal**: Users can find tasks efficiently using keyword search and various filter/sort criteria.

**Independent Test**: Enter search term -> Observe list; Apply filter/sort -> Observe list.

### Implementation for User Story 3

- [x] T019 [US3] Backend: Update `GET /items/` to support `q`, `completed`, `priority`, and `sort_by` params in `backend/src/api/items.py`
- [x] T020 [US3] Frontend: Create `SearchBar` component in `frontend/src/components/features/search-bar.tsx`
- [x] T021 [US3] Frontend: Create `FilterBar` component (Status, Priority) in `frontend/src/components/features/filter-bar.tsx`
- [x] T022 [US3] Frontend: Implement `SortDropdown` in `frontend/src/components/features/sort-dropdown.tsx`
- [x] T023 [US3] Integration: Update Dashboard (`frontend/src/app/page.tsx`) to manage search/filter/sort state and fetch data accordingly

**Checkpoint**: Task discovery tools functional.

## Phase 6: User Story 4 - Due Dates and Reminders (Priority: P2)

**Goal**: Users can set deadlines and receive browser notifications.

**Independent Test**: Set due time -> Wait for time -> Observe browser notification.

### Implementation for User Story 4

- [x] T024 [US4] Frontend: Integrate a date/time picker (e.g., native or library) in `frontend/src/components/features/item-form.tsx`
- [x] T025 [US4] Frontend: Create `NotificationService` for requesting permissions and triggering alerts in `frontend/src/lib/notifications.ts`
- [x] T026 [US4] Frontend: Implement background timer/check for due tasks to trigger notifications in `frontend/src/app/layout.tsx`

**Checkpoint**: Time-sensitive management and notifications active.

## Phase 7: User Story 5 - Recurring Tasks (Priority: P3)

**Goal**: System automatically generates next task instance for completed recurring tasks.

**Independent Test**: Complete recurring task -> Verify new task created with future date.

### Implementation for User Story 5

- [x] T027 [US5] Backend: Implement recurrence logic in `PATCH /items/{id}` completion trigger in `backend/src/api/items.py`
- [x] T028 [US5] Frontend: Add "Recurring" toggle and pattern selector (Daily/Weekly) to `ItemForm` in `frontend/src/components/features/item-form.tsx`
- [x] T029 [US5] Frontend: Add recurrence icon indicator to `ItemCard` in `frontend/src/components/features/item-card.tsx`

**Checkpoint**: Task automation functional.

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: UI refinement, accessibility, and final validation.

- [x] T030 [P] Accessibility: Ensure new form elements and filters are keyboard accessible
- [x] T031 [P] UI Polish: Refine transitions for filtering and search results
- [x] T032 Documentation: Update `specs/004-task-management-upgrade/quickstart.md` with final API details
- [x] T033 Validation: Run through all Acceptance Scenarios in `specs/004-task-management-upgrade/spec.md`

## Dependencies & Execution Order

1.  **Phase 1 & 2** are strictly sequential and blocking.
2.  **User Story 1 (Advanced CRUD)** must be first to handle new data fields.
3.  **User Story 2 (Tags/Priorities)** and **User Story 3 (Search/Filter)** are next and highly interdependent on the UI layout.
4.  **User Story 4 & 5** add specialized logic (Notifications/Recurrence) and should follow the core CRUD/Discovery implementation.

## Implementation Strategy

1.  **Foundation**: Update models and DB schema first to accommodate all new data.
2.  **MVP**: Deliver **US1 (Update/Toggle)** and **US2 (Priorities/Tags)** to establish the new data structure in the UI.
3.  **Enhance**: Add **US3 (Search/Filter)** to manage the growing task list.
4.  **Specialized**: Implement **US4 (Due Dates)** and **US5 (Recurrence)**.
5.  **Polish**: Final accessibility and interaction refinement.
