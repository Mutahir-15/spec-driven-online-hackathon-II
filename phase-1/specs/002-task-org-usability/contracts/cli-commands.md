# CLI Interface Contracts: Phase 2

## Menu Updates
**New Options**:
6. Search Tasks
7. Filter Tasks
8. Sort Tasks
9. Exit (Renumbered from 6)

## Command Interactions

### Add Task (Enhanced)
- **Input**:
  - `Title`, `Description` (Existing)
  - `Priority`: String (High/Medium/Low, default Medium)
  - `Tags`: String (Comma-separated, e.g., "work, urgent")
- **Output**:
  - Success message including new attributes.

### Search Tasks
- **Input**: `Keyword` (String)
- **Output**: List of matching tasks (formatted table).

### Filter Tasks
- **Input**: Choice of filter type (Status/Priority/Tag), then value.
- **Output**: Filtered list of tasks.

### Sort Tasks
- **Input**: Choice of sort type (Alphabetical/Priority).
- **Output**: Sorted list of tasks.
