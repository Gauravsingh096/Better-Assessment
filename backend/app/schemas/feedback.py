from pydantic import BaseModel, constr
from typing import Optional
from ..models.feedback import FeedbackStatus

class FeedbackCreate(BaseModel):
    title: constr(min_length=3, max_length=100)
    description: constr(min_length=10)

class FeedbackUpdate(BaseModel):
    title: Optional[constr(min_length=3, max_length=100)] = None
    description: Optional[constr(min_length=10)] = None
    status: Optional[FeedbackStatus] = None

class FeedbackResponse(BaseModel):
    id: int
    title: str
    description: str
    status: FeedbackStatus
    upvotes: int
    created_at: str

    class Config:
        from_attributes = True
