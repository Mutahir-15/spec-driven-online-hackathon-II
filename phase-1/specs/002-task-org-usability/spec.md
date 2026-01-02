# Feature Specification: Task Organization and Usability

**Feature Branch**: `002-task-org-usability`
**Created**: 2026-01-02
**Status**: Draft
**Input**: User description provided via CLI.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Assign Priority (Priority: P1)

As a user, I want to assign a priority (High, Medium, Low) to my tasks so that I can focus on what is most important.

**Why this priority**: Core organizational feature.

**Independent Test**: Verify priority is stored and displayed correctly.

**Acceptance Scenarios**:

1.  **Given** I am adding a task, **When** I enter "High" for priority, **Then** the task is saved with High priority.
2.  **Given** I am adding a task, **When** I skip the priority input, **Then** the task defaults to "Medium".
3.  **Given** I am adding a task, **When** I enter "high" (lowercase), **Then** the system accepts it as "High".
4.  **Given** an existing task, **When** I update its priority, **Then** the new value is saved.

---

### User Story 2 - Assign Tags (Priority: P1)

As a user, I want to add tags to my tasks so that I can categorize them freely.

**Why this priority**: Enhances categorization beyond fixed priorities.

**Independent Test**: Verify tags are stored as a list and retrieved correctly.

**Acceptance Scenarios**:

1.  **Given** I am adding a task, **When** I enter tags "Work, urgent", **Then** the task is saved with tags ["work", "urgent"].
2.  **Given** I am adding a task, **When** I skip tags, **Then** the task has an empty tag list.
3.  **Given** an existing task, **When** I update its tags, **Then** the old tags are replaced by the new list.

---

### User Story 3 - Search Tasks (Priority: P2)

As a user, I want to search for tasks by keyword so that I can find specific items quickly.

**Why this priority**: Improves usability as the list grows.

**Independent Test**: Verify search results match keywords in title/description.

**Acceptance Scenarios**:

1.  **Given** a list of tasks, **When** I search for "milk", **Then** the system displays all tasks with "milk" in the title or description (case-insensitive).
2.  **Given** a list of tasks, **When** I search for a keyword with no matches, **Then** the system displays "No matching tasks found".

---

### User Story 4 - Filter Tasks (Priority: P2)

As a user, I want to filter my view by status, priority, or tag so that I can see only relevant tasks.

**Why this priority**: Essential for managing larger lists.

**Independent Test**: Verify displayed list is a subset matching the filter criteria.

**Acceptance Scenarios**:

1.  **Given** a filtered view (e.g., Priority=High), **When** I view the list, **Then** only High priority tasks are shown.
2.  **Given** a filtered view, **When** I return to the main menu, **Then** the filter is reset or does not affect the main storage.

---

### User Story 5 - Sort Tasks (Priority: P3)

As a user, I want to sort my tasks alphabetically or by priority so that I can organize my view.

**Why this priority**: Nice-to-have for organization.

**Independent Test**: Verify output order changes based on criteria.

**Acceptance Scenarios**:

1.  **Given** a list of tasks, **When** I choose sort by "Alphabetical", **Then** tasks are displayed A-Z by title.
2.  **Given** a list of tasks, **When** I choose sort by "Priority", **Then** tasks are displayed High -> Medium -> Low.

### Edge Cases

- **Invalid Priority**: User enters "SuperHigh" -> System should reject or default (Spec says "Invalid input shall be handled gracefully", likely prompt again).
- **Search Special Chars**: Search with symbols should not crash.
- **Empty Filter Results**: Filtering should handle 0 results gracefully.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow assigning a priority (High, Medium, Low) to tasks. Default is Medium.
- **FR-002**: System MUST allow assigning optional, comma-separated tags to tasks. Tags are stored as lowercase.
- **FR-003**: System MUST allow searching tasks by keyword (matches Title or Description, case-insensitive).
- **FR-004**: System MUST allow filtering tasks by Status, Priority, or Tag (one filter at a time).
- **FR-005**: System MUST allow sorting tasks Alphabetically (Title A-Z) or by Priority (High-Med-Low).
- **FR-006**: Menu MUST include new options: Search, Filter, Sort.
- **FR-007**: System MUST validate priority input (case-insensitive).
- **FR-008**: Search, Filter, and Sort operations MUST NOT permanently reorder or modify the global task list (view-only).

### Key Entities

- **Task** (Updated):
    - `id`: Integer
    - `title`: String
    - `description`: String
    - `completed`: Boolean
    - `priority`: String (High/Medium/Low) [NEW]
    - `tags`: List[String] [NEW]

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: User can perform all new organizational actions (Search, Filter, Sort) on a list of 50+ tasks with instant response (<100ms).
- **SC-002**: All Phase 1 features (Add/View/Update/Delete) continue to function 100% correctly with the new data model.
- **SC-003**: Invalid priority inputs are rejected or handled 100% of the time without crashing.
