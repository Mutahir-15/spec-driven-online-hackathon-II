# Quickstart: Task Management Upgrade

## Running Phase III Features

### 1. Database Migrations
New fields and tables are required. Run migrations before starting.
```bash
cd backend
alembic revision --autogenerate -m "add_advanced_task_features"
alembic upgrade head
```

### 2. Search & Filter
The `/items/` endpoint supports advanced discovery:
- `?q=searchterm`: Case-insensitive search across title and description.
- `?completed=true|false`: Filter by completion status.
- `?priority=High|Medium|Low`: Filter by importance.
- `?sort_by=due_date|priority|title`: Dynamic sorting (Priority sorts High > Medium > Low).

### 3. Tags & Organization
- **Tags API**: Use `/tags/` (GET/POST) to manage reusable categories.
- **Task Assignment**: Tasks support multiple tags via the `tag_ids` field in POST/PATCH.

### 4. Recurrence & Notifications
- **Automated Recurrence**: Tasks marked `is_recurring` will automatically spawn a new instance when the current one is toggled to "Completed". Patterns supported: `Daily`, `Weekly`.
- **Reminders**: The frontend polls for pending tasks and triggers native Browser Notifications when a due time is reached.

## Development Notes
- **Database**: Uses a Many-to-Many junction table (`tasktag`) for task categorization.
- **Business Logic**: Recurrence generation is handled server-side in `backend/src/api/items.py`.
- **Notifications**: Managed by `ReminderService` in the frontend layout.
