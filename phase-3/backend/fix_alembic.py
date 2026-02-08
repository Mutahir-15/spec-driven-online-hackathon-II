import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()
database_url = os.getenv("DATABASE_URL")

if not database_url:
    print("DATABASE_URL not found in .env")
    exit(1)

try:
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    cur.execute("UPDATE alembic_version SET version_num = 'f5185270fc13';")
    conn.commit()
    print("Successfully updated alembic_version to f5185270fc13")
    cur.close()
    conn.close()
except Exception as e:
    print(f"Error: {e}")
