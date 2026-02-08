from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, or_, select

from ..core.db import get_session
from ..models.item import Item, ItemCreate, ItemRead, ItemUpdate, Priority
from ..models.tag import Tag

router = APIRouter(prefix="/items", tags=["items"])

@router.post("/", response_model=ItemRead)
def create_item(item: ItemCreate, session: Session = Depends(get_session)):
    item_data = item.dict(exclude={"tag_ids"})
    db_item = Item(**item_data)
    
    if item.tag_ids:
        tags = session.exec(select(Tag).where(Tag.id.in_(item.tag_ids))).all()
        db_item.tags = tags
        
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item

@router.get("/", response_model=List[ItemRead])
def read_items(
    offset: int = 0,
    limit: int = 100,
    q: Optional[str] = None,
    completed: Optional[bool] = None,
    priority: Optional[Priority] = None,
    sort_by: Optional[str] = Query(None, regex="^(due_date|priority|title)$"),
    session: Session = Depends(get_session)
):
    statement = select(Item)
    
    if q:
        statement = statement.where(
            or_(
                Item.title.ilike(f"%{q}%"),
                Item.description.ilike(f"%{q}%")
            )
        )
    
    if completed is not None:
        statement = statement.where(Item.is_completed == completed)
        
    if priority:
        statement = statement.where(Item.priority == priority)
        
    if sort_by == "due_date":
        statement = statement.order_by(Item.due_date.asc())
    elif sort_by == "title":
        statement = statement.order_by(Item.title.asc())
    elif sort_by == "priority":
        # Custom sort for priority: High > Medium > Low
        from sqlalchemy import case
        priority_order = case(
            (Item.priority == Priority.HIGH, 1),
            (Item.priority == Priority.MEDIUM, 2),
            (Item.priority == Priority.LOW, 3),
            else_=4
        )
        statement = statement.order_by(priority_order)
    else:
        # Default sort by created_at desc
        statement = statement.order_by(Item.created_at.desc())

    items = session.exec(statement.offset(offset).limit(limit)).all()
    return items

@router.get("/{item_id}", response_model=ItemRead)
def read_item(item_id: int, session: Session = Depends(get_session)):
    item = session.get(Item, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@router.patch("/{item_id}", response_model=ItemRead)
def update_item(
    item_id: int, 
    item: ItemUpdate, 
    session: Session = Depends(get_session)
):
    db_item = session.get(Item, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    was_completed = db_item.is_completed
    item_data = item.dict(exclude_unset=True, exclude={"tag_ids"})
    for key, value in item_data.items():
        setattr(db_item, key, value)
        
    if item.tag_ids is not None:
        tags = session.exec(select(Tag).where(Tag.id.in_(item.tag_ids))).all()
        db_item.tags = tags
        
    # Recurrence Logic: If marked as completed and was not completed before
    if db_item.is_completed and not was_completed and db_item.is_recurring:
        from datetime import timedelta
        
        new_due_date = None
        if db_item.due_date:
            if db_item.recurrence_pattern == "Daily":
                new_due_date = db_item.due_date + timedelta(days=1)
            elif db_item.recurrence_pattern == "Weekly":
                new_due_date = db_item.due_date + timedelta(weeks=1)
        
        if new_due_date:
            new_item = Item(
                title=db_item.title,
                description=db_item.description,
                priority=db_item.priority,
                due_date=new_due_date,
                due_time=db_item.due_time,
                is_recurring=True,
                recurrence_pattern=db_item.recurrence_pattern,
                tags=db_item.tags
            )
            session.add(new_item)

    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item

@router.delete("/{item_id}")
def delete_item(item_id: int, session: Session = Depends(get_session)):
    item = session.get(Item, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    session.delete(item)
    session.commit()
    return {"ok": True}
