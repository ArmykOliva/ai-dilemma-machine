"""Middleware configuration"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings

settings = get_settings()


def setup_middleware(app: FastAPI):
    """Configure all middleware for the application"""
    
    # CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_allow_origins,  # Frontend URL(s)
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

