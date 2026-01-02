# Research: CLI Todo MVP

**Feature**: CLI Todo MVP
**Date**: 2026-01-02
**Status**: Complete

## Key Decisions

### 1. Application Structure
- **Decision**: Single-file procedural structure (`main.py`) with functions for distinct features.
- **Rationale**: Meets the "Simplicity over abstraction" principle and "Phase 1 MVP" scope constraints.
- **Alternatives Considered**: 
  - Class-based `Task` and `TodoList` objects (Rejected: Slightly more complex than needed for a simple list of dicts, though acceptable if scope grows. Sticking to dicts/light objects as per user plan).
  - Multi-file `src/` layout (Rejected: Overkill for a <300 LOC MVP).

### 2. Data Storage
- **Decision**: In-memory list of dictionaries.
- **Rationale**: Explicit constraint "No persistence between runs".
- **Schema**:
  ```python
  {
      "id": int,
      "title": str,
      "description": str,
      "completed": bool
  }
  ```

### 3. User Interface
- **Decision**: `input()` / `print()` based loop.
- **Rationale**: Standard library only, no external TUI libraries (curses/rich) allowed per constraints.

### 4. ID Generation
- **Decision**: Global (or closure-bound) counter `next_id` initialized to 1.
- **Rationale**: Simple auto-increment logic sufficient for single-session use.

## Unknowns Resolved
- None. Implementation strategy provided in input was sufficient.
