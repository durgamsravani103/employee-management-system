import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv

from routers import auth
from routers import departments
from routers import employees

from database import Base, engine

from models import employee
from models import department
from models import user


# Load Environment Variables

load_dotenv()


# Create Database Tables

Base.metadata.create_all(bind=engine)


# FastAPI App

app = FastAPI(
    title="Employee Management API",
    version="1.0.0"
)


# Frontend URL

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)


# CORS Middleware

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


# Home Route

@app.get("/")
def home():

    return {
        "message": "Employee API Running"
    }