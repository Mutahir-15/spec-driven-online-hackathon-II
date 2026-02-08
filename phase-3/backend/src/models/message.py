from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .conversation import Conversation

class MessageBase(SQLModel):
    role: str # 'user' or 'assistant'
    content: str
    conversation_id: int = Field(foreign_key="conversation.id")

class Message(MessageBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    conversation: "Conversation" = Relationship(back_populates="messages")

class MessageRead(MessageBase):
    id: int
    created_at: datetime
