import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routers import auth, departments, employees   # routers ఇప్పుడు బయట ఉంది
import models
from database import Base, engine

# Load environment variables
load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI(title="Employee Management API", version="1.0.0")

# Frontend URL for CORS
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(departments.router)
app.include_router(employees.router)
