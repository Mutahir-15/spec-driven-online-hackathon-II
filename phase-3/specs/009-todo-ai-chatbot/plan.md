# Implementation Plan: Todo AI Chatbot MVP

**Branch**: `009-todo-ai-chatbot` | **Date**: 2026-02-08 | **Spec**: `specs/009-todo-ai-chatbot/spec.md`
**Input**: Feature specification from `specs/009-todo-ai-chatbot/spec.md`

## Summary
Build a minimal, working AI-powered Todo Chatbot using the **OpenAI Agents SDK** for orchestration and **Google Gemini** as the brain. Tools are implemented via the MCP standard. The system allows users to manage tasks through a natural language chat interface.

## Technical Context
**Language/Version**: Python 3.10+, TypeScript/Next.js 14+  
**Primary Dependencies**: `openai-agents`, `openai`, `mcp`, `fastapi`, `sqlmodel`  
**Storage**: Neon PostgreSQL  
**LLM**: Google Gemini (via OpenAI-compatible API)  
**Testing**: pytest  
**Target Platform**: Web (Vercel/Railway)  
**Project Type**: web  

## Constitution Check
1. **Spec-First**: ✅ `spec.md` defines all requirements.
2. **Clear Separation of Concerns**: ✅ FastAPI backend for AI/Logic, Next.js for UI.
3. **API-Driven Architecture**: ✅ `POST /api/chat` is the primary interface.
4. **Quality & Standards**: ✅ SQLModel and Pydantic validation used.
5. **Database Integrity**: ✅ Migrations managed via Alembic.

## Project Structure

### Documentation (this feature)
```text
specs/009-todo-ai-chatbot/
├── plan.md              # This file
├── research.md          # Research findings
├── data-model.md        # DB schemas
├── quickstart.md        # Setup guide
├── contracts/           # API contracts
└── tasks.md             # Implementation tasks
```

### Source Code
```text
backend/
├── src/
│   ├── main.py
│   ├── api/
│   │   └── chat.py      # Chat endpoint
│   ├── models/
│   │   ├── conversation.py
│   │   └── message.py
│   └── services/
│       ├── ai_agent.py  # Agent logic using openai-agents SDK
│       └── mcp_tools.py # Task CRUD tools
└── tests/

frontend/
├── src/
│   ├── app/
│   │   └── chat/
│   │       └── page.tsx
│   ├── components/
│   │   └── features/
│   │       └── chat-interface.tsx
│   └── lib/
│       └── chat-api.ts
└── tests/
```

**Structure Decision**: Web application (Option 2). Integrated into existing mono-repo structure.

## Complexity Tracking
*No violations detected.*
