---
id: 025
title: Fix Create Item Fetch Error
stage: green
date: 2026-02-03
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: 004-task-management-upgrade
branch: 004-task-management-upgrade
user: User
command: replace
labels:
  - fix
  - backend
  - frontend
  - api
  - serialization
links: null
files:
  - backend/src/api/items.py
  - backend/src/models/item.py
  - backend/src/models/__init__.py
  - frontend/src/lib/api.ts
  - README.md
tests: null
---

# Fix Create Item Fetch Error

## User Prompt

```text
While creating the item it shows failed to fetch. Fix this issue and get back to me.
```

## Assistant Response

Resolved the "failed to fetch" issue by fixing both a backend 500 error and a frontend URL prefixing mismatch.

### Fixes Implemented
1.  **Backend**: Resolved Pydantic serialization error by calling `ItemRead.model_rebuild()` to fix forward references to `TagRead`. Updated `create_item` to use `Item(**data)` instantiation.
2.  **Frontend**: Updated `api.ts` to normalize `API_URL`, stripping any trailing `/items` suffixes to prevent double-prefixing.
3.  **Documentation**: Corrected `README.md` to show the proper base URL for environment variables.

Verified the fix with successful `POST` requests to `http://localhost:8000/items/`.
