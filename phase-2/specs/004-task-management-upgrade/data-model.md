# Data Model: Task Management Upgrade

## Entities

### Task (Updated)
Extends the existing Task model.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| id | int | Primary Key | Auto-increment |
| title | str | Task heading | Required, non-empty |
| description | str | Detailed notes | Optional |
| is_completed | bool | Completion state | Default: false |
| priority | Enum | High, Medium, Low | Default: Medium |
| due_date | date | Scheduled date | Optional |
| due_time | time | Scheduled time | Optional |
| is_recurring | bool | Repeats? | Default: false |
| recurrence_pattern | Enum | Daily, Weekly | Optional |
| created_at | datetime | Creation TS | Auto |
| updated_at | datetime | Last modified | Auto |

**Relationships**:
- `tags`: Many-to-Many with Tag via `task_tag`.

### Tag
Reusable categories.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| id | int | Primary Key | Auto-increment |
| name | str | Tag label | Unique, Required |
| color | str | Hex/Tailwind color | Optional |

**Relationships**:
- `tasks`: Many-to-Many with Task via `task_tag`.

### TaskTag (Junction)
Links Tasks and Tags.

| Field | Type | Description |
|-------|------|-------------|
| task_id | int | Foreign Key (Task) |
| tag_id | int | Foreign Key (Tag) |

## State Transitions

- **Mark Complete**: `is_completed: false` -> `true`.
  - Trigger: If `is_recurring`, create new Task instance for next occurrence.
- **Update Priority**: Any state -> New priority level.
- **Toggle Completion**: Flip `is_completed`.
