# Research: Todo AI Chatbot MVP

## Key Decisions

### 1. AI Framework: OpenAI Agents SDK
- **Decision**: Use the `openai-agents` Python SDK for agent orchestration.
- **Rationale**: User requested using `openai-agents` for agent working. It provides a robust, multi-agent capable framework that is provider-agnostic.
- **Alternatives Considered**: Custom implementation (previous version), LangChain.

### 2. LLM / Brain: Google Gemini
- **Decision**: Use Google Gemini via its OpenAI-compatible API endpoint.
- **Rationale**: User requested Gemini as the "brain". Using the OpenAI-compatible endpoint allows seamless integration with the `openai-agents` SDK while leveraging Gemini's intelligence.
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/openai/`

### 3. Tooling: Model Context Protocol (MCP)
- **Decision**: Use the official `mcp` Python SDK to define tools.
- **Rationale**: Spec requires "Official MCP SDK (tools only, minimal)".
- **Implementation**: Tools are defined as standard Python functions with clear docstrings, which are automatically converted to schemas by the `openai-agents` SDK using `griffe`.

### 4. Backend: FastAPI + SQLModel
- **Decision**: Use FastAPI for the web server and SQLModel for ORM.
- **Rationale**: Standard for this project.

### 5. Frontend: Next.js Chat UI
- **Decision**: Simple `/chat` page in the existing Next.js frontend.

## Technical Context & Integration Strategy

### Agent Workflow
1. **Request Received**: `POST /api/chat` receives `conversation_id` and `message`.
2. **Context Retrieval**: Fetch conversation history from the `Message` table.
3. **Agent Initialization**:
   - Initialize `AsyncOpenAI` client with `base_url` pointing to Gemini.
   - Create an `Agent` instance from `openai-agents` with `TodoAssistant` name and instructions.
4. **Execution**:
   - Use `Runner.run` to execute the chat.
   - The `Runner` handles the tool-calling loop automatically.
5. **Persistence**: Save user message and assistant response to DB.
6. **Response**: Return response and `conversation_id`.

## Unknowns Resolved
- **OpenAI-compatible Gemini**: Confirmed Gemini supports an OpenAI-compatible API.
- **openai-agents SDK**: Verified it can use custom OpenAI clients.
- **MCP Tool Integration**: Verified `openai-agents` can use Python functions as tools directly.
