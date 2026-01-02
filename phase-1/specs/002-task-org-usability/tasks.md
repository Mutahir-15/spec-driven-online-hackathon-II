# Tasks: Task Organization and Usability

**Input**: Design documents from `/specs/002-task-org-usability/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Unit tests are included for each feature to ensure logic correctness before integration.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup & Foundational (Blocking)

**Purpose**: Prepare data structure and helpers for new attributes

- [x] T001 Update `main.py` global variables or init logic (if needed) to handle new schema
- [x] T002 [P] Implement `get_valid_priority` helper in `main.py`
- [x] T003 [P] Implement `parse_tags` helper in `main.py`

---

## Phase 2: User Story 1 - Assign Priority (Priority: P1)

**Goal**: Enable priority assignment and updates

**Independent Test**: Verify priority field is set correctly and defaults to Medium

### Tests for User Story 1

- [x] T004 [P] [US1] Add unit test for priority validation and assignment in `tests/test_main.py`

### Implementation for User Story 1

- [x] T005 [US1] Update `add_task` in `main.py` to prompt for Priority
- [x] T006 [US1] Update `update_task` in `main.py` to allow Priority update

**Checkpoint**: Users can manage task priority

---

## Phase 3: User Story 2 - Assign Tags (Priority: P1)

**Goal**: Enable tagging of tasks

**Independent Test**: Verify tags are parsed into a list of strings

### Tests for User Story 2

- [x] T007 [P] [US2] Add unit test for tag parsing and assignment in `tests/test_main.py`

### Implementation for User Story 2

- [x] T008 [US2] Update `add_task` in `main.py` to prompt for Tags
- [x] T009 [US2] Update `update_task` in `main.py` to allow Tag updates
- [x] T010 [US2] Update `view_tasks` in `main.py` to display Priority and Tags columns

**Checkpoint**: Tasks have full metadata (Priority + Tags) and are visible

---

## Phase 4: User Story 3 - Search Tasks (Priority: P2)

**Goal**: Find tasks by keyword

**Independent Test**: Verify search returns correct subset of tasks

### Tests for User Story 3

- [x] T011 [P] [US3] Add unit test for `search_tasks` logic in `tests/test_main.py`

### Implementation for User Story 3

- [x] T012 [US3] Implement `search_tasks` function in `main.py`
- [x] T013 [US3] Add "Search Tasks" option to `main_menu` in `main.py`

**Checkpoint**: Search functionality is active

---

## Phase 5: User Story 4 - Filter Tasks (Priority: P2)

**Goal**: View subsets of tasks based on criteria

**Independent Test**: Verify filtering by Status, Priority, and Tags

### Tests for User Story 4

- [x] T014 [P] [US4] Add unit tests for `filter_tasks` logic in `tests/test_main.py`

### Implementation for User Story 4

- [x] T015 [US4] Implement `filter_tasks` function in `main.py`
- [x] T016 [US4] Add "Filter Tasks" option to `main_menu` in `main.py`

**Checkpoint**: Filtering is functional

---

## Phase 6: User Story 5 - Sort Tasks (Priority: P3)

**Goal**: Reorder task view

**Independent Test**: Verify sorting logic (Alphabetical and Priority)

### Tests for User Story 5

- [x] T017 [P] [US5] Add unit tests for `sort_tasks` logic in `tests/test_main.py`

### Implementation for User Story 5

- [x] T018 [US5] Implement `sort_tasks` function in `main.py`
- [x] T019 [US5] Add "Sort Tasks" option to `main_menu` in `main.py`

**Checkpoint**: Sorting is functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup and UI consistency

- [x] T020 Update `main_menu` in `main.py` to ensure options are numbered 1-9 correctly
- [x] T021 Run PEP8 linter on `main.py` and fix new violations
- [x] T022 Manual verification of full flow (Create -> Search -> Filter -> Sort -> Delete)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational**: Must be done first to support new attributes.
- **US1 & US2**: Can be done in parallel, but both modify `add/update/view` functions. Recommended to do sequentially to avoid merge conflicts in single file.
- **US3, US4, US5**: Independent read-only operations. Can be done in parallel.

### Implementation Strategy

### Incremental Delivery

1. **Schema Update**: Implement Priority and Tags (US1 + US2). This changes the data model.
2. **Read-Only Features**: Implement Search (US3), then Filter (US4), then Sort (US5). These are additive.
3. **Menu Finalization**: Renumber options and polish.