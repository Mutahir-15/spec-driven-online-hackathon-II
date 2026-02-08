---
id: 030
title: Create Todo AI Chatbot MVP Spec
stage: spec
date: 2026-02-08
surface: agent
model: gemini-2.0-flash-thinking-exp-1218
feature: 009-todo-ai-chatbot
branch: 009-todo-ai-chatbot
user: ADMINS
command: /sp.specify
labels: ["spec", "mvp", "chatbot"]
links:
  spec: specs/009-todo-ai-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/009-todo-ai-chatbot/spec.md
  - specs/009-todo-ai-chatbot/checklists/requirements.md
tests: []
---

## Prompt

description: Create or update the feature specification from a natural language feature description.
handoffs: 
  - label: Build Technical Plan
    agent: sp.plan
    prompt: Create a plan for the spec. I am building with...
  - label: Clarify Spec Requirements
    agent: sp.clarify
    prompt: Clarify specification requirements
    send: true
---

## User Input

```text
Phase III – Todo AI Chatbot (MVP) Goal: Build a minimal, working AI-powered Todo Chatbot that allows users to manage todos using natural language. This is a hackathon MVP, not a production system. Core Objective: A user can type messages like: - "add a task to buy milk" - "show my tasks" - "mark task 2 as complete" and the AI agent correctly performs the action and responds conversationally. Constraints (STRICT): - Use Gemini CLI as the implementation engine - No manual coding - Keep everything minimal and stable - Avoid over-engineering - Prefer working demo over completeness Technology Stack: - Frontend: Simple Chat UI (OpenAI ChatKit preferred, simple /chat page acceptable) - Backend: Python FastAPI - AI Framework: OpenAI Agents SDK (MANDATORY) - MCP Server: Official MCP SDK (tools only, minimal) - ORM: SQLModel - Database: Neon PostgreSQL - Authentication: NONE (no user_id, single default user) Frontend Requirements: - Chat interface at /chat (or equivalent) - Input box for user messages - Chat message list (user + assistant) - Calls backend chat API - UI can be simple but clean Backend Requirements: - Stateless chat endpoint: POST /api/chat - Request: { "conversation_id": optional integer, "message": string } - Response: { "conversation_id": integer, "response": string } Conversation Handling: - Store conversations and messages in database - Fetch conversation history on each request - Server holds NO in-memory state Database Models: - Task: id, title, description, completed, created_at, updated_at - Conversation: id, created_at, updated_at - Message: id, conversation_id, role (user/assistant), content, created_at AI Agent Requirements: - Single agent using OpenAI Agents SDK - Agent interprets natural language - Agent decides which tool to call - Agent always confirms actions in natural language MCP Tools (REQUIRED, BASIC ONLY): 1. add_task(title, description?) 2. list_tasks(status = all | pending | completed) 3. complete_task(task_id) 4. delete_task(task_id) 5. update_task(task_id, title?, description?) Agent Behavior Rules: - "add / create / remember" → add_task - "show / list" → list_tasks - "done / complete / finished" → complete_task - "delete / remove" → delete_task - "update / change / rename" → update_task - If task id is unclear, ask a clarification question Out of Scope: - No priorities - No tags - No recurring tasks - No reminders - No auth - No multi-user support Success Criteria: - Chatbot works end-to-end - Tasks can be added, listed, completed, deleted via chat - Conversation continues after refresh - No crashes, no complex setup This specification should produce a SIMPLE, STABLE, DEMO-READY AI Todo Chatbot.
```

## Response snapshot

I have created the feature specification for the "Todo AI Chatbot MVP".

1. **Short Name**: `todo-ai-chatbot`
2. **Branch**: `009-todo-ai-chatbot` (Created and switched to)
3. **Specification**: `specs/009-todo-ai-chatbot/spec.md`
4. **Quality Checklist**: `specs/009-todo-ai-chatbot/checklists/requirements.md` (Validated)

The specification covers the user stories for adding, listing, completing, updating, and deleting tasks via a natural language chat interface, adhering to the strict technical constraints and architectural requirements provided.

## Outcome

- ✅ Impact: Established baseline for Phase III Todo AI Chatbot MVP.
- 🧪 Tests: No tests run for spec phase.
- 📁 Files: Created spec.md and requirements checklist.
- 🔁 Next prompts: /sp.plan
- 🧠 Reflection: Detailed prompt allowed for clear spec without clarifications.

## Evaluation notes (flywheel)

- Failure modes observed: Initial script run attempted to create specs in root directory; corrected by moving to project-local specs folder.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
