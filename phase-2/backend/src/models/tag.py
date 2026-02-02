from typing import TYPE_CHECKING, List, Optional

from sqlmodel import Field, Relationship, SQLModel

from .links import TaskTag

if TYPE_CHECKING:
    from .item import Item

class TagBase(SQLModel):
    name: str = Field(unique=True, index=True)
    color: Optional[str] = None

class Tag(TagBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    items: List["Item"] = Relationship(back_populates="tags", link_model=TaskTag)

class TagCreate(TagBase):
    pass

class TagRead(TagBase):
    id: int
