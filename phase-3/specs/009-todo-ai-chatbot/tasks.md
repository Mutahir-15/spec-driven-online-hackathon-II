# Tasks: Todo AI Chatbot MVP

**Input**: Design documents from `/specs/009-todo-ai-chatbot/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No explicit TDD requested in spec, but independent test criteria provided for each story.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Install dependencies `google-generativeai` and `mcp` in `backend/requirements.txt`
- [x] T002 Add `GEMINI_API_KEY` placeholder in `backend/.env.example`
- [x] T003 [P] Add Lucide-react or similar icon library for chat icons in `frontend/package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T004 Create `Conversation` model in `backend/src/models/conversation.py`
- [x] T005 Create `Message` model in `backend/src/models/message.py`
- [x] T006 Generate and run Alembic migration for Conversation and Message tables in `backend/migrations/`
- [x] T007 Define base LLM Provider interface in `backend/src/services/ai/base.py`
- [x] T008 Implement Gemini Provider in `backend/src/services/ai/gemini.py`
- [x] T009 Create Provider Factory in `backend/src/services/ai/factory.py`
- [x] T010 Setup base AI Agent service in `backend/src/services/ai_agent.py` using the provider interface
- [x] T011 Setup MCP tools skeleton in `backend/src/services/mcp_tools.py`
- [x] T012 [P] Implement chat API endpoint skeleton `POST /api/chat` in `backend/src/api/chat.py`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Add Task via Chat (Priority: P1) 🎯 MVP

**Goal**: A user wants to add a new todo item by typing a natural language message.

**Independent Test**: Send "add a task to buy milk" and verify a new task "buy milk" appears in the database and is confirmed in the chat.

- [x] T013 [US1] Implement `add_task` tool using SQLModel in `backend/src/services/mcp_tools.py`
- [x] T014 [US1] Register `add_task` tool with AI Agent in `backend/src/services/ai_agent.py`
- [x] T015 [P] [US1] Create chat interface component in `frontend/src/components/features/chat-interface.tsx`
- [x] T016 [US1] Implement chat page at `/chat` in `frontend/src/app/chat/page.tsx`
- [x] T017 [US1] Implement chat API client and integration in `frontend/src/lib/chat-api.ts`

**Checkpoint**: User Story 1 functional - "Add task" works via Chat UI.

---

## Phase 4: User Story 2 - List Tasks via Chat (Priority: P1)

**Goal**: A user wants to see their existing tasks by asking the AI.

**Independent Test**: Send "show my tasks" and verify the assistant correctly lists all existing tasks from the database.

- [x] T018 [US2] Implement `list_tasks` tool with status filtering in `backend/src/services/mcp_tools.py`
- [x] T019 [US2] Register `list_tasks` tool with AI Agent in `backend/src/services/ai_agent.py`
- [x] T020 [US2] Ensure chat UI correctly renders task lists or tables in `frontend/src/components/features/chat-interface.tsx`

**Checkpoint**: User Story 2 functional - "List tasks" works via Chat UI.

---

## Phase 5: User Story 3 - Complete Task via Chat (Priority: P1)

**Goal**: A user wants to mark a task as finished using its ID or title.

**Independent Test**: Send "mark task 2 as complete" and verify task with ID 2 is marked as completed in the database.

- [x] T021 [US3] Implement `complete_task` tool in `backend/src/services/mcp_tools.py`
- [x] T022 [US3] Register `complete_task` tool with AI Agent in `backend/src/services/ai_agent.py`

**Checkpoint**: User Story 3 functional - "Complete task" works via Chat UI.

---

## Phase 6: User Story 4 - Delete Task via Chat (Priority: P2)

**Goal**: A user wants to remove a task from their list.

**Independent Test**: Send "delete task 1" and verify task 1 is removed from the database.

- [x] T023 [US4] Implement `delete_task` tool in `backend/src/services/mcp_tools.py`
- [x] T024 [US4] Register `delete_task` tool with AI Agent in `backend/src/services/ai_agent.py`

**Checkpoint**: User Story 4 functional.

---

## Phase 7: User Story 5 - Update Task via Chat (Priority: P2)

**Goal**: A user wants to modify the title or description of an existing task.

**Independent Test**: Send "rename task 1 to buy whole milk" and verify task 1 title is updated.

- [x] T025 [US5] Implement `update_task` tool in `backend/src/services/mcp_tools.py`
- [x] T026 [US5] Register `update_task` tool with AI Agent in `backend/src/services/ai_agent.py`

**Checkpoint**: User Story 5 functional.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T027 Implement stateless conversation history persistence logic in `backend/src/api/chat.py`
- [x] T028 [P] Add loading spinners and "AI is typing..." indicators in `frontend/src/components/features/chat-interface.tsx`
- [x] T029 [P] Implement error handling for AI failures (e.g., API timeout) in `frontend/src/lib/chat-api.ts`
- [x] T030 [P] Final refinement of Agent personality and confirmation messages in `backend/src/services/ai_agent.py`
- [x] T031 Run full validation of Success Criteria (SC-001 to SC-004) from `spec.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup. BLOCKS all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational phase. Can be done sequentially or in parallel.
- **Polish (Phase 8)**: Final phase after all stories are implemented.

### Parallel Opportunities

- T003 (Frontend icons) can run during backend setup.
- T012 (Chat API skeleton) can run while models are being created.
- T015 (Chat UI) can start once the API skeleton (T012) is defined.
- All Story Logic [T013, T018, T021, T023, T025] can be implemented in parallel if DB models are stable.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Complete Phase 3 (US1 - Add Task).
3. **VALIDATE**: Ensure "Add task buy milk" works from the UI.

### Incremental Delivery

1. Add US2 (List) -> Better visibility of MVP progress.
2. Add US3 (Complete) -> Core lifecycle complete.
3. Add US4 & US5 (Delete/Update) -> Full management.