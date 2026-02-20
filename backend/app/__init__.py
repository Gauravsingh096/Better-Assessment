from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:postgres@localhost:5432/pulse_db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)
    
    # Register blueprints
    from .routes.feedback import feedback_bp
    app.register_blueprint(feedback_bp, url_prefix='/api/feedback')
    
    @app.route('/health')
    def health():
        return {'status': 'healthy'}, 200
        
    return app
