# Full-Stack Todo Application

A modern, full-stack web application built with Next.js 14 (App Router) and FastAPI.

## Features

- **Advanced Task Management**: Create, update, and toggle completion status for items.
- **Organization**: Assign **Priority** levels (High, Medium, Low) and reusable **Tags**.
- **Discovery**: Real-time **Search**, multi-criteria **Filtering** (Status, Priority), and dynamic **Sorting**.
- **Automation**: **Recurring Tasks** (Daily/Weekly) that automatically reschedule upon completion.
- **Reminders**: Browser-native **Notifications** for tasks with a due time.
- **Responsive Design**: Polished **Indigo/Zinc** theme built with Tailwind CSS.
- **Accessibility**: ARIA-compliant components and full keyboard navigation support.

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.10+
- **Database**: Neon DB (PostgreSQL)
- **ORM**: SQLModel (Pydantic + SQLAlchemy)

## Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL database (or Neon DB connection string)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Create a `.env` file in the `backend` directory with your database connection string:
   ```
   DATABASE_URL=postgresql://user:password@host/dbname
   ```

5. Run migrations:
   ```bash
   alembic upgrade head
   ```

6. Start the server:
   ```bash
   uvicorn src.main:app --reload
   ```
   The API will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the `frontend` directory:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## API Documentation

When the backend server is running, you can access the interactive API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Development

- **Linting**:
  - Backend: `ruff check .`
  - Frontend: `npm run lint`

- **Type Checking**:
  - Frontend: `npm run type-check` (if configured) or `tsc --noEmit`

## License

MIT
