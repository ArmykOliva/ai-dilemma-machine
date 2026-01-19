"""Custom OpenAPI schema configuration"""
from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi

from app.config import get_settings

settings = get_settings()


def custom_openapi(app: FastAPI):
    """Custom OpenAPI schema"""
    if app.openapi_schema:
        return app.openapi_schema
        
    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes
    )
    
    # Add servers field to include root_path
    if settings.root_path:
        openapi_schema["servers"] = [{"url": settings.root_path}]
    
    app.openapi_schema = openapi_schema
    return app.openapi_schema


def setup_openapi(app: FastAPI):
    """Apply custom OpenAPI schema to app"""
    app.openapi = lambda: custom_openapi(app)

