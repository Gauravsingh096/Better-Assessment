from app import create_app, db
import os

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        try:
            db.create_all()
            print("âœ… Database connected and tables created!")
        except Exception as e:
            print(f"âŒ Database connection failed: {e}")
    app.run(debug=True, port=int(os.getenv('PORT', 5000)))
