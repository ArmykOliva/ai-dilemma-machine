from functools import lru_cache
from typing import List

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables or .env file."""

    # General
    app_name: str = "AI Dilemma Machine"
    environment: str = "development"
    root_path: str = "/api"
    app_description: str = "AI Dilemma Machine API"
    
    # CORS
    cors_allow_origins: List[str] = ["*"]

    # Database
    database_url: str

@lru_cache
def get_settings() -> Settings:
    """Return a cached Settings instance. The first call loads from env/.env."""
    return Settings()


