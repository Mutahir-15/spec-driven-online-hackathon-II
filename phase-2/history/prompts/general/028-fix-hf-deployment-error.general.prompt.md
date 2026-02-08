---
id: 028
title: Fix Hugging Face Backend Deployment Runtime Error
stage: green
date: 2026-02-05
surface: agent
model: gemini-2.0-flash-thinking-exp-1218
feature: none
branch: main
user: ADMINS
command: none
labels: ["deployment", "huggingface", "docker", "fastapi"]
links: null
files:
  - backend/src/__init__.py
  - backend/src/core/db.py
  - backend/Dockerfile
  - backend/.dockerignore
tests: []
---

## Summary
The user reported a runtime error (Exit code 137) when deploying the backend to Hugging Face Spaces. This error was likely caused by a combination of factors:
1. Missing `__init__.py` in the `src` directory, which could cause relative import failures.
2. Missing default `DATABASE_URL`, causing the application to crash if the environment variable was not set.
3. Lack of a `.dockerignore` file, causing a Windows-based `.venv` directory to be copied into the Linux container, leading to potential binary incompatibilities and startup crashes.
4. Dockerfile permissions not optimized for Hugging Face Spaces (which run as a non-root user).

## Changes
- Created `backend/src/__init__.py` to ensure `src` is treated as a package.
- Modified `backend/src/core/db.py` to default `DATABASE_URL` to a local SQLite database if the environment variable is missing.
- Updated `backend/Dockerfile` to follow Hugging Face best practices (non-root user 1000, proper permissions, and `3.10-slim` image).
- Created `backend/.dockerignore` to exclude `.venv`, `__pycache__`, and other unnecessary/incompatible files from the Docker image.

## Outcome
The application should now start correctly on Hugging Face Spaces, defaulting to a local SQLite database if no Postgres URL is provided, and running with the correct permissions.
