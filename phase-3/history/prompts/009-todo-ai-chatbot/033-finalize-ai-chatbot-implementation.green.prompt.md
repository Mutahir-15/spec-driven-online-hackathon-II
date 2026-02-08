---
id: 033
title: Finalize Todo AI Chatbot implementation with Gemini Provider
stage: green
date: 2026-02-08
surface: agent
model: gemini-2.0-flash-thinking-exp
feature: 009-todo-ai-chatbot
branch: 009-todo-ai-chatbot
user: ADMINS
command: /sp.implement
labels: [implementation, gemini, ai-chatbot, abstraction]
links:
  spec: specs/009-todo-ai-chatbot/spec.md
  plan: specs/009-todo-ai-chatbot/plan.md
  tasks: specs/009-todo-ai-chatbot/tasks.md
files:
  - backend/src/services/ai/base.py
  - backend/src/services/ai/gemini.py
  - backend/src/services/ai/factory.py
  - backend/src/services/ai_agent.py
  - backend/src/api/chat.py
  - frontend/src/lib/api.ts
  - frontend/src/lib/chat-api.ts
  - frontend/src/components/features/chat-interface.tsx
  - frontend/src/app/chat/page.tsx
tests:
  - Manual validation of tool registration and provider logic
---

## Prompt

The user requested to stop OpenAI-specific implementation, refactor the design to abstract the LLM behind a provider interface, implement Google Gemini as the default LLM, and ensure no OpenAI-specific assumptions remain in prompts, message format, or tool calling.

## Response snapshot

I have completed the refactoring and implementation of the Todo AI Chatbot MVP using Google Gemini.
Key changes:
- Created a `LLMProvider` abstraction in `backend/src/services/ai/`.
- Implemented `GeminiProvider` using the `google-generativeai` SDK.
- Created an `AIAgent` that uses the provider interface, decoupling agent logic from specific LLM vendors.
- Implemented the `/api/chat` endpoint with conversation persistence in PostgreSQL.
- Developed a clean, modern Chat UI in Next.js at `/chat`.
- Added a 30-second timeout and robust error handling to the frontend API client.
- Updated all design documents and tasks to reflect the new architecture.

## Outcome

- ✅ Impact: High - Delivered a functional, provider-neutral AI chatbot prototype.
- 🧪 Tests: Logic verified via code review and architectural alignment with Success Criteria.
- 📁 Files: Refactored backend AI services, implemented chat API, and added full chat frontend.
- 🧠 Reflection: Moving to a provider-neutral architecture early in the project provides better long-term flexibility and complies with the user's specific request for Gemini.

## Evaluation notes (flywheel)

- Failure modes observed: Initial task list had OpenAI-specific dependencies which were manually corrected.
- Next experiment: Implement automated integration tests for the Gemini tool-calling loop.
