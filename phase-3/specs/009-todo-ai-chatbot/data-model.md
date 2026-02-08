# Data Model: Todo AI Chatbot

## Entities

### 1. Task
Represents a todo item managed by the AI.

| Field | Type | Description | Constraints |
| :--- | :--- | :--- | :--- |
| `id` | Integer | Primary Key | Auto-increment |
| `title` | String | Title of the task | Not Null |
| `description` | String | Detailed description | Optional |
| `completed` | Boolean | Completion status | Default: False |
| `created_at` | DateTime | Creation timestamp | Default: Now |
| `updated_at` | DateTime | Last update timestamp | Default: Now |

### 2. Conversation
Represents a single chat session between a user and the AI.

| Field | Type | Description | Constraints |
| :--- | :--- | :--- | :--- |
| `id` | Integer | Primary Key | Auto-increment |
| `created_at` | DateTime | Creation timestamp | Default: Now |
| `updated_at` | DateTime | Last update timestamp | Default: Now |

### 3. Message
Represents an individual message within a conversation.

| Field | Type | Description | Constraints |
| :--- | :--- | :--- | :--- |
| `id` | Integer | Primary Key | Auto-increment |
| `conversation_id` | Integer | Foreign Key to Conversation | Not Null |
| `role` | String | Message sender role | 'user' or 'assistant' |
| `content` | String | Text content of the message | Not Null |
| `created_at` | DateTime | Creation timestamp | Default: Now |

## Relationships

- **Conversation** has many **Messages**.
- **Message** belongs to one **Conversation**.
- **Task** is currently independent (single-user MVP, no owner field required yet).

## State Transitions (Task)
- `pending` -> `completed` (via `complete_task` tool)
- `completed` -> `pending` (optional, if `update_task` allows it)
