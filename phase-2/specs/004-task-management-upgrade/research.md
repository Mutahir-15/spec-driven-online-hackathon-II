# Research: Task Management Upgrade

**Feature**: 004-task-management-upgrade

## Decisions & Rationale

### Decision 1: Priority Implementation
- **Decision**: Use an Enum (High, Medium, Low) in the database and Pydantic models.
- **Rationale**: Provides type safety and makes it easy to map to visual indicators (colors/icons) in the UI.
- **Alternatives**: String or Integer. String is too loose; Integer requires mapping logic everywhere.

### Decision 2: Tagging Strategy
- **Decision**: Many-to-Many relationship between Tasks and Tags using a junction table (`task_tag`).
- **Rationale**: Allows users to categorize tasks flexibly. Reusable tags reduce data duplication.
- **Alternatives**: JSONB array of strings. Rejected because it makes cross-task tag filtering/aggregation more complex and less performant in SQLModel/PostgreSQL.

### Decision 3: Recurring Tasks Logic
- **Decision**: Server-side "Auto-Generate on Complete" pattern. When a recurring task is marked complete, the backend calculates the next due date and creates a new task instance.
- **Rationale**: Simpler than a complex scheduler for this phase. Ensures recurrence happens even if the UI is closed.
- **Alternatives**: Background cron job. Rejected as overkill for personal todo app; "completion-triggered" is more intuitive.

### Decision 4: Date/Time Handling
- **Decision**: Use ISO-8601 strings for API transfer; store as `DateTime` with timezone awareness in PostgreSQL.
- **Rationale**: Prevents "off-by-one" day errors caused by local vs server timezone differences.
- **Alternatives**: Unix timestamps. Harder to read and debug in raw DB queries.

### Decision 5: Browser Notifications
- **Decision**: Use the standard Web Notifications API.
- **Rationale**: No external dependencies (like Firebase) required. Works locally.
- **Alternatives**: Push API (Service Workers). More complex; will stick to foreground notifications or simple timer-based foreground alerts for this phase.

## Tech Best Practices

- **Tailwind UI**: Use consistent `zinc` and `indigo` colors from UI Skill.
- **FastAPI**: Use `Depends` for DB sessions and shared logic.
- **SQLModel**: Leverage `Relationships` for easy Tag loading.
