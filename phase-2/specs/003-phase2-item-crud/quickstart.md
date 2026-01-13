# Quickstart: Phase 2 Item CRUD

## Prerequisites
*   Node.js 18+
*   Python 3.10+
*   PostgreSQL (or Neon DB connection string)

## Backend Setup
1.  Navigate to `backend/`.
2.  Create virtual environment: `python -m venv venv`.
3.  Activate: `source venv/bin/activate` (or `venv\Scripts\activate` on Windows).
4.  Install dependencies: `pip install -r requirements.txt`.
5.  Set `.env`: `DATABASE_URL=postgresql://...`.
6.  Run server: `uvicorn src.main:app --reload`.
7.  API Docs: `http://localhost:8000/docs`.

## Frontend Setup
1.  Navigate to `frontend/`.
2.  Install dependencies: `npm install`.
3.  Set `.env.local`: `NEXT_PUBLIC_API_URL=http://localhost:8000`.
4.  Run dev server: `npm run dev`.
5.  Open: `http://localhost:3000`.

## Testing
*   Backend: `pytest` in `backend/`.
*   Frontend: `npm test` in `frontend/`.
