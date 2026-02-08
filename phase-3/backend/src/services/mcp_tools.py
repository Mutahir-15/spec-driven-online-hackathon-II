from typing import Optional, List
from sqlmodel import Session, select
from src.core.db import engine
from src.models import Item, Priority
from agents import function_tool

@function_tool
def add_task(title: str, description: Optional[str] = None) -> str:
    """
    Adds a new task to the todo list.
    
    Args:
        title: The title of the task.
        description: An optional description of the task.
    """
    with Session(engine) as session:
        task = Item(title=title, description=description)
        session.add(task)
        session.commit()
        session.refresh(task)
        return f"Task '{task.title}' added with ID {task.id}."

@function_tool
def list_tasks(status: str = "all") -> str:
    """
    Lists tasks from the todo list.
    
    Args:
        status: The status of tasks to list. One of 'all', 'pending', 'completed'.
    """
    with Session(engine) as session:
        statement = select(Item)
        if status == "pending":
            statement = statement.where(Item.is_completed == False)
        elif status == "completed":
            statement = statement.where(Item.is_completed == True)
        
        tasks = session.exec(statement).all()
        if not tasks:
            return f"No {status if status != 'all' else ''} tasks found."
        
        result = "Your tasks:\n"
        for t in tasks:
            status_str = "Done" if t.is_completed else "Pending"
            result += f"- [{t.id}] {t.title} ({status_str})\n"
        return result

@function_tool
def complete_task(task_id: int) -> str:
    """
    Marks a task as completed.
    
    Args:
        task_id: The ID of the task to complete.
    """
    with Session(engine) as session:
        task = session.get(Item, task_id)
        if not task:
            return f"Task with ID {task_id} not found."
        task.is_completed = True
        session.add(task)
        session.commit()
        return f"Task {task_id} ('{task.title}') marked as complete."

@function_tool
def delete_task(task_id: int) -> str:
    """
    Deletes a task from the list.
    
    Args:
        task_id: The ID of the task to delete.
    """
    with Session(engine) as session:
        task = session.get(Item, task_id)
        if not task:
            return f"Task with ID {task_id} not found."
        session.delete(task)
        session.commit()
        return f"Task {task_id} ('{task.title}') deleted."

@function_tool
def update_task(task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> str:
    """
    Updates an existing task's title or description.
    
    Args:
        task_id: The ID of the task to update.
        title: New title for the task.
        description: New description for the task.
    """
    with Session(engine) as session:
        task = session.get(Item, task_id)
        if not task:
            return f"Task with ID {task_id} not found."
        if title:
            task.title = title
        if description:
            task.description = description
        session.add(task)
        session.commit()
        return f"Task {task_id} updated."

# List of tools to be used by the AI Agent
ALL_TOOLS = [add_task, list_tasks, complete_task, delete_task, update_task]