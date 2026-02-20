from ..models.feedback import Feedback, FeedbackStatus, db
from sqlalchemy.orm import Session

class FeedbackService:
    @staticmethod
    def create_feedback(data: dict) -> Feedback:
        feedback = Feedback(
            title=data['title'],
            description=data['description']
        )
        db.session.add(feedback)
        db.session.commit()
        return feedback

    @staticmethod
    def get_all_feedback():
        return Feedback.query.order_by(Feedback.upvotes.desc()).all()

    @staticmethod
    def update_status(feedback_id: int, new_status: FeedbackStatus) -> Feedback:
        feedback = Feedback.query.get_or_404(feedback_id)
        
        # BUSINESS RULE: Transition logic
        # For example: Can't move to COMPLETED if currently DECLINED
        if feedback.status == FeedbackStatus.DECLINED and new_status == FeedbackStatus.COMPLETED:
            raise ValueError("Cannot move from Declined directly to Completed. Re-review required.")
            
        feedback.status = new_status
        db.session.commit()
        return feedback

    @staticmethod
    def upvote(feedback_id: int) -> Feedback:
        feedback = Feedback.query.get_or_404(feedback_id)
        feedback.upvotes += 1
        db.session.commit()
        return feedback
