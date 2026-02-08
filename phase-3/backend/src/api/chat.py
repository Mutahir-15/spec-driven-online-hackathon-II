from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import Optional, List
from src.core.db import engine
from src.models import Conversation, Message, ConversationRead
from src.services.ai_agent import AIAgent
from pydantic import BaseModel

router = APIRouter(prefix="/api/chat", tags=["chat"])

class ChatRequest(BaseModel):
    conversation_id: Optional[int] = None
    message: str

class ChatResponse(BaseModel):
    conversation_id: int
    response: str

@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest):
    with Session(engine) as session:
        # Get or create conversation
        if request.conversation_id:
            conversation = session.get(Conversation, request.conversation_id)
            if not conversation:
                raise HTTPException(status_code=404, detail="Conversation not found")
        else:
            conversation = Conversation()
            session.add(conversation)
            session.commit()
            session.refresh(conversation)

        # Save user message
        user_msg = Message(
            role="user",
            content=request.message,
            conversation_id=conversation.id
        )
        session.add(user_msg)
        
        # Get history (limit to last 20 messages for context)
        # In a real app, we'd handle this more robustly
        statement = select(Message).where(Message.conversation_id == conversation.id).order_by(Message.created_at.desc()).limit(20)
        history = list(reversed(session.exec(statement).all()))

        # Initialize agent
        agent = AIAgent()
        
        # Get AI response
        # Note: We pass the history EXCLUDING the message we just added to the DB, 
        # as the agent.chat will add the latest message to the formatted messages.
        # Wait, agent.chat adds the latest message. So history should be messages BEFORE current one.
        history_for_agent = history[:-1] # Remove the user message we just added
        
        try:
            ai_content = await agent.chat(request.message, history_for_agent)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"AI Agent error: {str(e)}")

        # Save assistant message
        assistant_msg = Message(
            role="assistant",
            content=ai_content,
            conversation_id=conversation.id
        )
        session.add(assistant_msg)
        
        conversation.updated_at = assistant_msg.created_at # Update conversation timestamp
        session.add(conversation)
        session.commit()

        return ChatResponse(
            conversation_id=conversation.id,
            response=ai_content
        )
