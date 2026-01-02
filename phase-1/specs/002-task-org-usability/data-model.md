# Data Model: Task Organization and Usability

## Entities

### Task (Updated)
Represents a single todo item with organizational attributes.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| id | Integer | Yes | Auto-inc | Unique identifier |
| title | String | Yes | - | Short summary of the task |
| description | String | No | "" | Detailed explanation |
| completed | Boolean | Yes | False | Completion status |
| priority | String | Yes | "Medium" | Importance: High, Medium, Low |
| tags | List[String] | No | [] | Categorization labels |

## Persistence
- **Type**: In-Memory List
- **Lifespan**: Runtime session only (lost on exit)
