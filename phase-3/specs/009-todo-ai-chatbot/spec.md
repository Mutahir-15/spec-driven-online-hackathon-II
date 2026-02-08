# Feature Specification: Todo AI Chatbot MVP

**Feature Branch**: `009-todo-ai-chatbot`  
**Created**: 2026-02-08  
**Status**: Draft  
**Input**: User description: "Phase III – Todo AI Chatbot (MVP) Goal: Build a minimal, working AI-powered Todo Chatbot that allows users to manage todos using natural language. This is a hackathon MVP, not a production system. Core Objective: A user can type messages like: - \"add a task to buy milk\" - \"show my tasks\" - \"mark task 2 as complete\" and the AI agent correctly performs the action and responds conversationally. Constraints (STRICT): - Use Gemini CLI as the implementation engine - No manual coding - Keep everything minimal and stable - Avoid over-engineering - Prefer working demo over completeness Technology Stack: - Frontend: Simple Chat UI (OpenAI ChatKit preferred, simple /chat page acceptable) - Backend: Python FastAPI - AI Framework: OpenAI Agents SDK (MANDATORY) - MCP Server: Official MCP SDK (tools only, minimal) - ORM: SQLModel - Database: Neon PostgreSQL - Authentication: NONE (no user_id, single default user) Frontend Requirements: - Chat interface at /chat (or equivalent) - Input box for user messages - Chat message list (user + assistant) - Calls backend chat API - UI can be simple but clean Backend Requirements: - Stateless chat endpoint: POST /api/chat - Request: { \"conversation_id\": optional integer, \"message\": string } - Response: { \"conversation_id\": integer, \"response\": string } Conversation Handling: - Store conversations and messages in database - Fetch conversation history on each request - Server holds NO in-memory state Database Models: - Task: id, title, description, completed, created_at, updated_at - Conversation: id, created_at, updated_at - Message: id, conversation_id, role (user/assistant), content, created_at AI Agent Requirements: - Single agent using OpenAI Agents SDK - Agent interprets natural language - Agent decides which tool to call - Agent always confirms actions in natural language MCP Tools (REQUIRED, BASIC ONLY): 1. add_task(title, description?) 2. list_tasks(status = all | pending | completed) 3. complete_task(task_id) 4. delete_task(task_id) 5. update_task(task_id, title?, description?) Agent Behavior Rules: - \"add / create / remember\" → add_task - \"show / list\" → list_tasks - \"done / complete / finished\" → complete_task - \"delete / remove\" → delete_task - \"update / change / rename\" → update_task - If task id is unclear, ask a clarification question Out of Scope: - No priorities - No tags - No recurring tasks - No reminders - No auth - No multi-user support Success Criteria: - Chatbot works end-to-end - Tasks can be added, listed, completed, deleted via chat - Conversation continues after refresh - No crashes, no complex setup This specification should produce a SIMPLE, STABLE, DEMO-READY AI Todo Chatbot."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add Task via Chat (Priority: P1)

A user wants to add a new todo item by simply typing a natural language message in the chat interface.

**Why this priority**: Core value proposition of the AI-powered todo app.

**Independent Test**: Send "add a task to buy milk" and verify a new task "buy milk" appears in the database and is confirmed in the chat.

**Acceptance Scenarios**:

1. **Given** a blank task list, **When** the user types "add a task to buy milk", **Then** the assistant responds "Task 'buy milk' added" and the task is created in the database.
2. **Given** an active conversation, **When** the user types "remember to call mom at 5pm", **Then** the assistant responds "Task 'call mom at 5pm' added" and the task is created.

---

### User Story 2 - List Tasks via Chat (Priority: P1)

A user wants to see their existing tasks to know what they need to do.

**Why this priority**: Essential for managing and tracking todos.

**Independent Test**: Send "show my tasks" and verify the assistant correctly lists all existing tasks from the database.

**Acceptance Scenarios**:

1. **Given** multiple tasks exist in the database, **When** the user types "show my tasks", **Then** the assistant lists all tasks with their IDs, titles, and completion status.
2. **Given** no tasks exist, **When** the user types "what do I have to do?", **Then** the assistant responds "You have no tasks at the moment."

---

### User Story 3 - Complete Task via Chat (Priority: P1)

A user wants to mark a task as finished using its ID or title in a message.

**Why this priority**: Critical part of the todo lifecycle.

**Independent Test**: Send "mark task 2 as complete" and verify task with ID 2 is marked as completed in the database.

**Acceptance Scenarios**:

1. **Given** task 2 exists and is currently pending, **When** the user types "mark task 2 as complete", **Then** the assistant confirms "Task 2 marked as complete" and the database record is updated.
2. **Given** task 2 is already marked as complete, **When** the user types "task 2 is done", **Then** the assistant confirms the task is already completed or reaffirms the completion status.

---

### User Story 4 - Delete Task via Chat (Priority: P2)

A user wants to remove a task from their list.

**Why this priority**: Important for keeping the list clean and relevant.

**Independent Test**: Send "delete task 1" and verify task 1 is removed from the database.

**Acceptance Scenarios**:

1. **Given** task 1 exists, **When** the user types "delete task 1", **Then** the assistant confirms "Task 1 deleted" and the record is removed.

---

### User Story 5 - Update Task via Chat (Priority: P2)

A user wants to modify the title or description of an existing task.

**Why this priority**: Provides flexibility for correcting or refining tasks.

**Independent Test**: Send "rename task 1 to buy whole milk" and verify task 1 title is updated.

**Acceptance Scenarios**:

1. **Given** task 1 exists, **When** the user types "rename task 1 to buy whole milk", **Then** the assistant confirms "Task 1 updated to 'buy whole milk'".

---

### Edge Cases

- **Ambiguous ID**: When the user says "complete the task" without specifying which one, the agent MUST ask for clarification.
- **Task Not Found**: When the user requests an action on a task ID that doesn't exist, the agent MUST inform the user politely.
- **Empty Message**: If the user sends an empty message, the agent should ignore it or ask if they need help.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a web-based chat interface for interacting with the AI.
- **FR-002**: System MUST interpret natural language messages to identify user intent (add, list, complete, delete, update).
- **FR-003**: System MUST provide tools for the AI agent to interact with the task database (add, list, complete, delete, update).
- **FR-004**: System MUST persist tasks, conversations, and messages in a persistent data store.
- **FR-005**: System MUST be stateless at the API level, retrieving relevant conversation history for each request to maintain context.
- **FR-006**: Assistant MUST always confirm actions or provide information in natural language.
- **FR-007**: System MUST support basic filtering for listing tasks (all, pending, completed).

### Assumptions & Constraints

- **AC-001**: The system will be built using Python (FastAPI) for the backend and a modern web framework for the frontend.
- **AC-002**: AI capabilities will be powered by a specialized AI SDK (OpenAI Agents SDK).
- **AC-003**: Data persistence will utilize a relational database (PostgreSQL/SQLModel).
- **AC-004**: The system must be designed for a single-user MVP without authentication.
- **AC-005**: Tooling integration will follow the Model Context Protocol (MCP) or equivalent standard.

### Key Entities

- **Task**: Represents a todo item. Attributes: id, title, description, completed, created_at, updated_at.
- **Conversation**: Represents a chat session. Attributes: id, created_at, updated_at.
- **Message**: Represents an individual turn in a conversation. Attributes: id, conversation_id, role (user/assistant), content, created_at.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully add a task via the chat interface in under 5 seconds (excluding AI processing time).
- **SC-002**: The AI agent correctly maps natural language intent to the correct MCP tool for 90% of basic valid commands.
- **SC-003**: Conversation state is fully preserved and visible after a page refresh.
- **SC-004**: System handles task management (CRUD) without requiring any manual database or API intervention by the user.
