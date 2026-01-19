"""
Core package - Application infrastructure and configuration

This package contains all the core setup and configuration logic:
- Logging: Application logging configuration
- Events: Application lifecycle (startup/shutdown)
- Middleware: CORS and other middleware configuration
- OpenAPI: Custom API documentation setup
"""

from .logging import logger, init_logging, setup_logging
from .events import lifespan
from .middleware import setup_middleware
from .openapi import setup_openapi

__all__ = [
    "logger",
    "init_logging",
    "setup_logging",
    "lifespan",
    "setup_middleware",
    "setup_openapi",
]

