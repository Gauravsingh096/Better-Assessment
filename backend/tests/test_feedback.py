import pytest
from app import create_app, db
from app.models.feedback import Feedback, FeedbackStatus

@pytest.fixture
def client():
    app = create_app()
    import os
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'test.db')
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client

def test_create_feedback(client):
    response = client.post('/api/feedback', json={
        "title": "Fix the UI",
        "description": "The buttons are too small in dark mode"
    })
    assert response.status_code == 201
    assert response.get_json()['title'] == "Fix the UI"

def test_invalid_feedback(client):
    # Description too short
    response = client.post('/api/feedback', json={
        "title": "Short",
        "description": "Too short"
    })
    assert response.status_code == 400

def test_invalid_state_transition(client):
    # Setup: Create a Declined feedback
    with client.application.app_context():
        f = Feedback(title="Test", description="Description is long enough", status=FeedbackStatus.DECLINED)
        db.session.add(f)
        db.session.commit()
        f_id = f.id

    # Try to move to COMPLETED (should fail based on service rules)
    response = client.patch(f'/api/feedback/{f_id}/status', json={"status": "completed"})
    assert response.status_code == 400
    assert "Cannot move from Declined directly to Completed" in response.get_json()['error']
