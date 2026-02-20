import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()

url = os.getenv('DATABASE_URL')
print(f"Checking connection to: {url}")

try:
    conn = psycopg2.connect(url)
    print("✅ Successfully connected to the database!")
    conn.close()
except Exception as e:
    print(f"❌ Connection failed: {e}")
