# CLI Todo Application 

A professional, interactive terminal-based task manager implemented in Python. This application allows users to manage their daily tasks with organizational features like priorities, tags, and search capabilities.

## 🚀 Features

### Core Management (Phase 1)
*   **Add Task**: Create tasks with a title and optional description.
*   **View Tasks**: Display a formatted table of all current tasks.
*   **Update Task**: Modify the title or description of existing tasks.
*   **Delete Task**: Permanently remove tasks from the session.
*   **Toggle Completion**: Mark tasks as `[x] Completed` or `[ ] Pending`.

### Organization & Discovery (Phase 2)
*   **Priority Assignment**: Set importance levels (`High`, `Medium`, `Low`).
*   **Tagging System**: Assign multiple comma-separated tags for categorization.
*   **Keyword Search**: Find tasks by searching keywords in titles or descriptions.
*   **Advanced Filtering**: View tasks filtered by status, priority, or a specific tag.
*   **Smart Sorting**: View tasks sorted alphabetically (A-Z) or by priority level.

## 🛠 Technical Specifications
*   **Language**: Python 3.x
*   **Dependencies**: Standard Library only (no external packages required).
*   **Data Persistence**: In-memory storage (data exists for the duration of the runtime session).
*   **Architecture**: Procedural with modular function separation.

## 📋 How to Run

### Prerequisites
Ensure you have Python 3.x installed on your system.

### Launching the Application
Navigate to the `phase-1` directory and execute:
```bash
python main.py
```

### Running the Test Suite
The project includes a comprehensive suite of unit tests using the `unittest` framework.
```bash
python -m unittest tests/test_main.py
```

## 📂 Project Structure
```text
phase-1/
├── main.py              # Main application entry point
├── tests/
│   └── test_main.py     # Unit test suite
├── specs/               # Development specifications and plans
└── README.md            # Project documentation
```

## 💡 Usage Tips
*   **Priority**: When adding a task, you can simply press `Enter` to default to `Medium`.
*   **Tags**: Enter multiple tags separated by commas (e.g., `work, urgent, python`).
*   **Validation**: The application includes graceful error handling for invalid IDs or menu choices to prevent crashes.
