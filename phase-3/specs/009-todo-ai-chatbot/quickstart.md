# Quickstart: Todo AI Chatbot MVP

## Prerequisites
- Python 3.10+
- Node.js 18+
- OpenAI API Key (set as `OPENAI_API_KEY` in `backend/.env`)
- Neon PostgreSQL Database (set as `DATABASE_URL` in `backend/.env`)

## Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   pip install openai-agents mcp
   ```
3. Run migrations:
   ```bash
   alembic upgrade head
   ```
4. Start the server:
   ```bash
   python src/main.py
   ```

## Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
1. Open your browser to `http://localhost:3000/chat`.
2. Type a message like "add a task to buy milk".
3. Interact with the AI to manage your todos!
