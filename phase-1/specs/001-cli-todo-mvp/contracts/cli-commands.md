# CLI Interface Contracts

This document defines the user interaction model for the CLI application.

## Main Menu
**Loop**: Infinite until Exit.
**Options**:
1. `Add Task` -> Invokes `add_task()`
2. `View Tasks` -> Invokes `view_tasks()`
3. `Update Task` -> Invokes `update_task()`
4. `Delete Task` -> Invokes `delete_task()`
5. `Toggle Task Completion` -> Invokes `toggle_task_completion()`
6. `Exit` -> Breaks loop, prints goodbye.

## Command Interactions

### Add Task
- **Input**:
  - `Title`: String (Non-empty)
  - `Description`: String (Optional)
- **Output**:
  - Success message: "Task '{title}' added with ID {id}."
- **Validation**:
  - If Title is empty: Print error, retry or cancel.

### View Tasks
- **Input**: None
- **Output**:
  - Table or List format:
    `[ID] [Status] Title`
    `1. [✔] Buy Milk`
    `2. [ ] Walk Dog`
  - If empty: "No tasks found."

### Update Task
- **Input**:
  - `Task ID`: Integer
  - `New Title`: String (Non-empty)
  - `New Description`: String
- **Output**:
  - Success message: "Task updated successfully."
- **Validation**:
  - ID must exist.
  - Title must not be empty.

### Delete Task
- **Input**:
  - `Task ID`: Integer
- **Output**:
  - Confirmation: "Task deleted."
- **Validation**:
  - ID must exist.

### Toggle Completion
- **Input**:
  - `Task ID`: Integer
- **Output**:
  - Confirmation: "Task marked as [Completed/Pending]."
- **Validation**:
  - ID must exist.
