from .item import Item, ItemCreate, ItemRead, ItemUpdate, Priority, RecurrencePattern
from .links import TaskTag
from .tag import Tag, TagCreate, TagRead
from .conversation import Conversation, ConversationRead
from .message import Message, MessageRead

# Resolve forward references
ItemRead.model_rebuild()
TagRead.model_rebuild()
ConversationRead.model_rebuild()
MessageRead.model_rebuild()

__all__ = ["Item", "Tag", "TaskTag", "Priority", "RecurrencePattern", "ItemCreate", "ItemRead", "ItemUpdate", "TagCreate", "TagRead", "Conversation", "Message", "ConversationRead", "MessageRead"]