"""
Main FastAPI application entry point

This module initializes and configures the FastAPI application.
Core functionality is organized in the 'core' package for better maintainability.
"""
from fastapi import FastAPI

from app.config import get_settings
from app.core import (
    init_logging,
    lifespan,
    setup_middleware,
    setup_openapi,
)
from app.routers import game

settings = get_settings()

# Create FastAPI application
app = FastAPI(
    title=settings.app_name,
    description=settings.app_description,
    version="0.1.0",
    root_path=settings.root_path,
    lifespan=lifespan
)

# Setup application
init_logging(app)
setup_middleware(app)
setup_openapi(app)


# Root endpoints

@app.get("/")
async def read_root():
    return {"message": "Agile AI Backend API", "version": "0.1.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}


# Include routers
app.include_router(game.router)