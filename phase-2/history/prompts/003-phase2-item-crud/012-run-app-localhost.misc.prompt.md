---
id: 012
title: Run App Localhost
stage: misc
date: 2026-02-02
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: 003-phase2-item-crud
branch: 003-phase2-item-crud
user: User
command: run_shell_command
labels:
  - run
  - localhost
  - fastApi
  - nextjs
links: null
files: null
tests: null
---

# Run App Localhost

## User Prompt

```text
Perfect! now run the app on localhost.
```

## Assistant Response

Started the backend and frontend servers in separate new terminal windows.

**Backend**: `http://localhost:8000` (Docs: `/docs`)
**Frontend**: `http://localhost:3000`

Used `Start-Process` to launch `uvicorn` and `npm run dev` independently.
