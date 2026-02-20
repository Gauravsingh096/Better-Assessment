from .. import db
from datetime import datetime
import enum

class FeedbackStatus(enum.Enum):
    PENDING = "pending"
    IN_REVIEW = "in_review"
    PLANNED = "planned"
    COMPLETED = "completed"
    DECLINED = "declined"

class Feedback(db.Model):
    __tablename__ = 'feedback'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.Enum(FeedbackStatus), default=FeedbackStatus.PENDING, nullable=False)
    upvotes = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status.value,
            "upvotes": self.upvotes,
            "created_at": self.created_at.isoformat()
        }
