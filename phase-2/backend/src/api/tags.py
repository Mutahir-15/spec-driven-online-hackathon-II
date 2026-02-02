from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from ..core.db import get_session
from ..models.tag import Tag, TagCreate, TagRead

router = APIRouter(prefix="/tags", tags=["tags"])

@router.post("/", response_model=TagRead)
def create_tag(tag: TagCreate, session: Session = Depends(get_session)):
    db_tag = Tag.from_orm(tag)
    session.add(db_tag)
    try:
        session.commit()
    except Exception:
        session.rollback()
        raise HTTPException(status_code=400, detail="Tag name already exists")
    session.refresh(db_tag)
    return db_tag

@router.get("/", response_model=List[TagRead])
def read_tags(session: Session = Depends(get_session)):
    tags = session.exec(select(Tag)).all()
    return tags
