# Tasks: CLI Todo MVP

**Input**: Design documents from `/specs/001-cli-todo-mvp/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Unit tests are included to verify logic independently per user story, as this is a single-file application.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create main.py with basic entry point and imports
- [x] T002 Create tests/ directory and tests/test_main.py skeleton
- [x] T003 [P] Configure simple run script or instruction in README (if needed)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Initialize global task list and ID counter variable in main.py
- [x] T005 [P] Implement input validation helper function `get_valid_input` in main.py
- [x] T006 [P] Implement helper `find_task_by_id` in main.py

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add Task (Priority: P1) 🎯 MVP

**Goal**: Allow users to create new tasks

**Independent Test**: Verify tasks are added to the internal list with correct IDs

### Tests for User Story 1

- [x] T007 [P] [US1] Add unit test for `add_task` logic in tests/test_main.py

### Implementation for User Story 1

- [x] T008 [US1] Implement `add_task` function in main.py (prompts, creation, append)
- [x] T009 [US1] Integrate `add_task` into a temporary test harness in main.py (if menu not ready)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View Tasks (Priority: P1)

**Goal**: Display all tasks to the user

**Independent Test**: Verify output formatting for empty and populated lists

### Tests for User Story 2

- [x] T010 [P] [US2] Add unit test for `view_tasks` output generation in tests/test_main.py

### Implementation for User Story 2

- [x] T011 [US2] Implement `view_tasks` function in main.py (formatting, loop, status display)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 6 - Menu Navigation (Priority: P1)

**Goal**: Persistent menu loop to glue features together

**Independent Test**: Verify loop continues until exit selected

### Tests for User Story 6

- [x] T012 [P] [US6] Add unit test for menu choice validation in tests/test_main.py

### Implementation for User Story 6

- [x] T013 [US6] Implement `main_menu` function in main.py (print options, get choice, route)
- [x] T014 [US6] Connect `main_menu` to `add_task` and `view_tasks` in main.py
- [x] T015 [US6] Implement Exit logic to break loop in main.py

**Checkpoint**: Basic MVP (Add + View + Menu) is ready for demo

---

## Phase 6: User Story 3 - Toggle Completion (Priority: P2)

**Goal**: Mark tasks as done/pending

**Independent Test**: Verify status boolean flips correctly

### Tests for User Story 3

- [x] T016 [P] [US3] Add unit test for `toggle_task_completion` in tests/test_main.py

### Implementation for User Story 3

- [x] T017 [US3] Implement `toggle_task_completion` function in main.py
- [x] T018 [US3] Add "Toggle Completion" option to `main_menu` in main.py

**Checkpoint**: Task state management enabled

---

## Phase 7: User Story 4 - Update Task (Priority: P2)

**Goal**: Modify task details

**Independent Test**: Verify title/desc update without ID/Status change

### Tests for User Story 4

- [x] T019 [P] [US4] Add unit test for `update_task` in tests/test_main.py

### Implementation for User Story 4

- [x] T020 [US4] Implement `update_task` function in main.py
- [x] T021 [US4] Add "Update Task" option to `main_menu` in main.py

**Checkpoint**: Full editing capability enabled

---

## Phase 8: User Story 5 - Delete Task (Priority: P3)

**Goal**: Remove tasks

**Independent Test**: Verify task is removed from list

### Tests for User Story 5

- [x] T022 [P] [US5] Add unit test for `delete_task` in tests/test_main.py

### Implementation for User Story 5

- [x] T023 [US5] Implement `delete_task` function in main.py
- [x] T024 [US5] Add "Delete Task" option to `main_menu` in main.py

**Checkpoint**: Full CRUD lifecycle complete

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T025 Run PEP8 linter on main.py and fix violations
- [x] T026 Verify all edge cases (non-int input, empty lists) manually
- [x] T027 Update module docstrings in main.py

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup
- **User Stories (Phase 3+)**: All depend on Foundational phase
- **Polish (Final Phase)**: Depends on all user stories

### User Story Dependencies

- **US1 (Add)**: Independent after Foundational
- **US2 (View)**: Independent after Foundational
- **US6 (Menu)**: Depends on US1 & US2 for meaningful testing, but can be built in parallel
- **US3, US4, US5**: Independent of each other, depend on Foundational and Menu for UI integration

### Implementation Strategy

### MVP First (Phases 1-5)

1. Setup & Foundation
2. Add Task (US1)
3. View Tasks (US2)
4. Menu (US6)
5. **STOP**: Valid functional MVP

### Incremental Delivery (Phases 6-8)

1. Add Toggle (US3)
2. Add Update (US4)
3. Add Delete (US5)