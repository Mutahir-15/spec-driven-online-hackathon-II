# Data Model: Phase 2 Item CRUD

## Entities

### Item
Represents a generic task or object in the system.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `id` | Integer | Yes | Auto-inc | Unique identifier. Primary Key. |
| `title` | String | Yes | - | Short title of the item. Max length 255. |
| `description` | String | No | NULL | Detailed description. |
| `created_at` | DateTime | Yes | Now() | Timestamp of creation. |
| `updated_at` | DateTime | Yes | Now() | Timestamp of last update. |

## Validation Rules

1.  **Title**:
    *   Must not be empty or whitespace only.
    *   Maximum length: 255 characters.
2.  **Description**:
    *   Optional.
    *   No specific max length enforced by app (DB text limit applies).
3.  **Immutability**:
    *   `id` and `created_at` cannot be changed after creation.
