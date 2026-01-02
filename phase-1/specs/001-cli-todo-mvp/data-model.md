# Data Model: CLI Todo MVP

## Entities

### Task
Represents a single todo item.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| id | Integer | Yes | Auto-inc | Unique identifier |
| title | String | Yes | - | Short summary of the task |
| description | String | No | "" | Detailed explanation |
| completed | Boolean | Yes | False | Completion status |

## Persistence
- **Type**: In-Memory List
- **Lifespan**: Runtime session only (lost on exit)
