---
id: 001
title: Define UI Agent
stage: general
date: 2026-01-12
surface: agent
model: gemini-2.0-flash-exp
feature: none
branch: main
user: user
command: define-ui-agent
labels: ["ui", "agent-definition", "setup"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - ui-agent.md
tests: []
---

## Prompt

You are an AI agent architect.

Your task is to define a reusable UI ARCHITECT AGENT.

Context:
- Stack: Next.js + Tailwind CSS
- Backend: FastAPI (API-driven)
- Design goal: Premium, modern UI suitable for demos

Instructions:
1. Define one UI agent with:
   - Agent name
   - Role
   - Responsibilities
   - Hard rules
2. Agent must:
   - Focus only on UI/UX
   - Never touch backend logic
   - Never break accessibility basics

Output format:
- Clear sections
- Bullet points

Save as: 
ui-agent.md

## Response snapshot

Created `ui-agent.md` defining the UI_ARCHITECT agent with strict separation of concerns, focusing on Next.js/Tailwind CSS, and enforcing accessibility standards.

## Outcome

- ✅ Impact: Defined the UI Architect Agent role and rules.
- 🧪 Tests: N/A
- 📁 Files: ui-agent.md
- 🔁 Next prompts: Use the agent to build UI components.
- 🧠 Reflection: Clear definition allows for safer delegation of UI tasks.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
