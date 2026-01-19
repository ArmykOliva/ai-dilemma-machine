"""Application lifecycle events (startup/shutdown)"""
from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.core.logging import logger
from app.db.database import create_db_and_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle application startup and shutdown"""
    # Startup
    logger.info("Starting AI Dilemma Machine...")
    
    # Create database tables
    await create_db_and_tables()
    logger.info("Database tables created")
    
    yield
    
    # Shutdown
    logger.info("Shutting down AI Dilemma Machine...")
