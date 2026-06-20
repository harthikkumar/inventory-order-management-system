from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# .env file load karo
load_dotenv()

# Database URL read karo .env se
DATABASE_URL = os.getenv("DATABASE_URL")

# Engine banana
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args)

# Session banana
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class — sab models isse inherit karenge
Base = declarative_base()

# Dependency function — har API call mein DB session milega
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()