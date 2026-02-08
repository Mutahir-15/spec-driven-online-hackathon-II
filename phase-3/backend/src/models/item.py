from datetime import date, datetime, time
from enum import Enum
from typing import TYPE_CHECKING, List, Optional

from sqlmodel import Field, Relationship, SQLModel

from .links import TaskTag

if TYPE_CHECKING:
    from .tag import Tag, TagRead

class Priority(str, Enum):
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"

class RecurrencePattern(str, Enum):
    DAILY = "Daily"
    WEEKLY = "Weekly"

class ItemBase(SQLModel):
    title: str = Field(index=True, min_length=1)
    description: Optional[str] = None
    is_completed: bool = Field(default=False)
    priority: Priority = Field(default=Priority.MEDIUM)
    due_date: Optional[date] = None
    due_time: Optional[time] = None
    is_recurring: bool = Field(default=False)
    recurrence_pattern: Optional[RecurrencePattern] = None

class Item(ItemBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    tags: List["Tag"] = Relationship(back_populates="items", link_model=TaskTag)

class ItemCreate(ItemBase):
    tag_ids: List[int] = []

class ItemRead(ItemBase):
    id: int
    created_at: datetime
    updated_at: datetime
    tags: List["TagRead"] = []

class ItemUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_completed: Optional[bool] = None
    priority: Optional[Priority] = None
    due_date: Optional[date] = None
    due_time: Optional[time] = None
    is_recurring: Optional[bool] = None
    recurrence_pattern: Optional[RecurrencePattern] = None
    tag_ids: Optional[List[int]] = None
