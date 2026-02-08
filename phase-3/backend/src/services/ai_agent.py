import os
from typing import List, Any, Optional
from openai import AsyncOpenAI
from agents import Agent, Runner, set_default_openai_client, RunConfig
from .mcp_tools import ALL_TOOLS
from dotenv import load_dotenv

load_dotenv()

class AIAgent:
    def __init__(self, provider_name: str = "gemini"):
        # Configure the OpenAI client to point to the Gemini API
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found")
            
        base_url = "https://generativelanguage.googleapis.com/v1beta/"
        
        # Explicitly set environment variables that the openai library and agents SDK often use as fallbacks
        os.environ["GEMINI_API_KEY"] = api_key
        os.environ["GEMINI_BASE_URL"] = base_url
            
        self.client = AsyncOpenAI(
            api_key=api_key,
            base_url=base_url
        )
        
        # Set the default client for the openai-agents SDK
        # use_for_tracing=False avoids sending traces to OpenAI which causes 401 errors with Gemini keys
        set_default_openai_client(self.client, use_for_tracing=False)
        
        self.instructions = (
            "You are a sophisticated Todo AI Assistant. "
            "Your goal is to manage the user's todo list efficiently through natural language conversation. "
            "You have access to tools for adding, listing, completing, deleting, and updating tasks. "
            "Always confirm your actions clearly (e.g., 'I've added that to your list'). "
            "When listing tasks, present them in a clean, readable format. "
            "If a user's request is ambiguous or missing a required ID, ask for clarification politely. "
            "Keep your responses concise and helpful."
        )
        
        # Initialize the Agent from openai-agents SDK
        model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
        
        self.agent = Agent(
            name="TodoAssistant",
            instructions=self.instructions,
            model=model_name,
            tools=ALL_TOOLS
        )

    async def chat(self, user_message: str, history: List[Any]) -> str:
        # Convert history objects to openai-compatible message list
        messages = []
        for msg in history:
            messages.append({"role": msg.role, "content": msg.content})
        
        # Add the latest user message
        messages.append({"role": "user", "content": user_message})

        # Run the agent using the Runner from openai-agents
        # Disable tracing in the run config as well
        result = await Runner.run(
            self.agent,
            messages,
            run_config=RunConfig(tracing_disabled=True)
        )
        
        # The final output is in result.final_output
        return result.final_output
