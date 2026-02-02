from typing import Optional

from sqlmodel import Field, SQLModel


class TaskTag(SQLModel, table=True):
    task_id: Optional[int] = Field(
        default=None, foreign_key="item.id", primary_key=True
    )
    tag_id: Optional[int] = Field(
        default=None, foreign_key="tag.id", primary_key=True
    )
