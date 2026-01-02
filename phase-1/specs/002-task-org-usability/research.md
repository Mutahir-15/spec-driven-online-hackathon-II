# Research: Task Organization and Usability

**Feature**: Task Organization and Usability
**Date**: 2026-01-02
**Status**: Complete

## Key Decisions

### 1. Priority Representation
- **Decision**: Store priority as a simple string ("High", "Medium", "Low").
- **Rationale**: Keeps the model simple (JSON-serializable in future) and easy to display.
- **Alternatives Considered**: Integer scale (1-3) - rejected to avoid mapping complexity during I/O.

### 2. Tag Storage
- **Decision**: List of lowercase strings.
- **Rationale**: Normalizing to lowercase ensures consistent filtering (e.g., "Work" == "work").

### 3. Filtering & Sorting Logic
- **Decision**: Implement as pure functions that accept the global task list and return a *new* list for display.
- **Rationale**: Ensures the original data order (likely creation order by ID) is preserved (Safety requirement).

### 4. Menu Expansion
- **Decision**: Add new items 6, 7, 8 for Search, Filter, Sort. Move "Exit" to 9.
- **Rationale**: Logical grouping of new features before the exit command.

## Unknowns Resolved
- None. Requirements are explicit extensions of Phase 1.
