from flask import Blueprint, request, jsonify
from ..services.feedback_service import FeedbackService
from ..schemas.feedback import FeedbackCreate, FeedbackUpdate
from ..models.feedback import FeedbackStatus
from pydantic import ValidationError

feedback_bp = Blueprint('feedback', __name__)

@feedback_bp.route('', methods=['POST'])
def create():
    try:
        data = request.get_json()
        validated_data = FeedbackCreate(**data)
        feedback = FeedbackService.create_feedback(validated_data.model_dump())
        return jsonify(feedback.to_dict()), 201
    except ValidationError as e:
        return jsonify({"errors": e.errors()}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@feedback_bp.route('', methods=['GET'])
def list_all():
    try:
        feedback_list = FeedbackService.get_all_feedback()
        return jsonify([f.to_dict() for f in feedback_list]), 200
    except Exception as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

@feedback_bp.route('/<int:id>/upvote', methods=['POST'])
def upvote(id):
    try:
        feedback = FeedbackService.upvote(id)
        return jsonify(feedback.to_dict()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 404

@feedback_bp.route('/<int:id>/status', methods=['PATCH'])
def update_status(id):
    try:
        data = request.get_json()
        new_status_str = data.get('status')
        
        # Convert string to Enum member
        try:
            new_status = FeedbackStatus(new_status_str)
        except ValueError:
            return jsonify({"error": f"Invalid status: {new_status_str}"}), 400
            
        feedback = FeedbackService.update_status(id, new_status)
        return jsonify(feedback.to_dict()), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        from werkzeug.exceptions import NotFound
        if isinstance(e, NotFound):
             return jsonify({"error": "Feedback not found"}), 404
        print(f"Unexpected error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
