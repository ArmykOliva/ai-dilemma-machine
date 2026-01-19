"""
Simple logging configuration for the FastAPI application.
"""
import logging
import sys
from app.config import get_settings

settings = get_settings()

def setup_logging() -> None:
    """
    Set up simple logging configuration for the application
    """
    # Configure logging format
    format_string = "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
    
    # Configure logging
    logging.basicConfig(
        level=logging.INFO if settings.environment == "production" else logging.DEBUG,
        format=format_string,
        datefmt="%Y-%m-%d %H:%M:%S",
        handlers=[logging.StreamHandler(sys.stdout)]
    )

    # Quiet down some chatty loggers
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    
    # SQLAlchemy - silence ALL database query logs
    logging.getLogger("sqlalchemy").setLevel(logging.WARNING)
    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)
    logging.getLogger("sqlalchemy.engine.Engine").setLevel(logging.WARNING)
    logging.getLogger("sqlalchemy.pool").setLevel(logging.WARNING)
    
    # SuperTokens is VERY verbose - silence it unless there's an error
    logging.getLogger("com.supertokens").setLevel(logging.ERROR)
    logging.getLogger("supertokens").setLevel(logging.ERROR)

def init_logging(app) -> None:
    """
    Initialize logging configuration for the FastAPI application
    """
    setup_logging()
    
    # Log application startup
    logger.info(f"Application startup - Environment: {settings.environment}")

# Create logger instance
logger = logging.getLogger("app")

