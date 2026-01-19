# Backend API

Modern FastAPI backend with SuperTokens authentication, PostgreSQL database, and async SQLAlchemy.

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Architecture](#-architecture)

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Python 3.11+ (for local development)

### 1. Setup Environment

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your values
# Required: DATABASE_URL, SUPERTOKENS_CONNECTION_URI, SUPERTOKENS_API_KEY
```

### 2. Run with Docker

```bash
# From project root
docker-compose up

# Or for production
docker-compose -f docker-compose.prod.yml up
```

### 3. Access API

- **API Docs**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api/health
- **SuperTokens Dashboard**: http://localhost:3567/auth/dashboard

### Default Credentials

**Admin User:**
- Email: Set in `SUPERTOKENS_ADMIN_EMAIL`
- Password: Set in `SUPERTOKENS_ADMIN_PASSWORD`

**Demo User:**
- Email: Set in `SUPERTOKENS_DEMO_EMAIL`
- Password: Set in `SUPERTOKENS_DEMO_PASSWORD`

## 📁 Project Structure

```
backend/
├── app/
│   ├── core/                 # Core infrastructure
│   │   ├── __init__.py      # Package exports
│   │   ├── logging.py       # Logging configuration
│   │   ├── security.py      # SuperTokens setup
│   │   ├── events.py        # Startup/shutdown events
│   │   ├── middleware.py    # CORS, middleware
│   │   └── openapi.py       # API docs customization
│   │
│   ├── db/                   # Database layer
│   │   ├── __init__.py      # Package exports
│   │   ├── database.py      # DB connection & session
│   │   ├── models.py        # SQLModel database models
│   │   └── seed.py          # Initial data seeding
│   │
│   ├── auth/                 # Authentication utilities
│   │   ├── auth_protections.py  # Auth dependencies
│   │   └── auth_utils.py        # User creation helpers
│   │
│   ├── routers/              # API endpoints
│   │   ├── me.py            # User info endpoints
│   │   ├── posts.py         # Blog posts CRUD
│   │   └── upload.py        # File upload with chunking
│   │
│   ├── schemas/              # Pydantic schemas (API contracts)
│   │   ├── user.py          # User-related schemas
│   │   ├── post.py          # Post-related schemas
│   │   └── upload.py        # Upload-related schemas
│   │
│   ├── config.py             # Settings & environment variables
│   └── main.py               # FastAPI app entry point
│
├── requirements.txt          # Python dependencies
├── Dockerfile               # Development Docker image
├── Dockerfile.prod          # Production Docker image
└── README.md                # This file
```

### Directory Responsibilities

| Directory | Purpose | When to modify |
|-----------|---------|----------------|
| `core/` | Infrastructure setup (auth, logging, middleware) | Rarely - only for new infrastructure |
| `db/` | Database models, connections, seeding | When adding new models or seed data |
| `auth/` | Authentication helpers | When adding new auth patterns |
| `routers/` | API endpoints | When adding new endpoints |
| `schemas/` | Request/Response models | When adding new API contracts |
| `config.py` | Environment configuration | When adding new settings |
| `main.py` | App initialization | Rarely - only for app-level changes |

## ⚙️ Configuration

### Environment Variables

Create a `.env` file with the following variables:

```bash
# General
APP_NAME="Your App Name"
ENVIRONMENT="development"  # or "production"
ROOT_PATH="/api"

# CORS
CORS_ALLOW_ORIGINS='["http://localhost:3000"]'

# SuperTokens
SUPERTOKENS_CONNECTION_URI="http://supertokens:3567"
SUPERTOKENS_API_KEY="your-api-key"
SUPERTOKENS_API_DOMAIN="http://localhost:3000"
SUPERTOKENS_WEBSITE_DOMAIN="http://localhost:3000"

# SuperTokens Dashboard Admin
SUPERTOKENS_UI_ADMIN_EMAIL="admin@dashboard.com"
SUPERTOKENS_UI_ADMIN_PASSWORD="dashboard_admin_pass"

# Application Admin User
SUPERTOKENS_ADMIN_EMAIL="admin@example.com"
SUPERTOKENS_ADMIN_PASSWORD="admin123"

# Demo User
SUPERTOKENS_DEMO_EMAIL="demo@example.com"
SUPERTOKENS_DEMO_PASSWORD="demo123"

# Database
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/app_db"
```

### Configuration Files

- **`app/config.py`**: Pydantic Settings for environment variables
- **`docker-compose.yml`**: Local development setup
- **`docker-compose.prod.yml`**: Production setup

## 📚 API Documentation

### Interactive Docs

Once the app is running, visit:

- **Swagger UI**: http://localhost:3000/api/docs
- **ReDoc**: http://localhost:3000/api/redoc

### Available Endpoints

#### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Login
- `POST /api/auth/signout` - Logout

#### User
- `GET /api/me` - Get current user info (requires auth)
- `GET /api/me/test_admin` - Test admin role (requires admin)

#### Posts
- `GET /api/posts` - List all posts (public)
- `GET /api/posts/{id}` - Get single post (public)
- `POST /api/posts` - Create post (requires auth)
- `PUT /api/posts/{id}` - Update post (owner or admin)
- `DELETE /api/posts/{id}` - Delete post (owner or admin)
- `GET /api/posts/user/my-posts` - Get my posts (requires auth)

#### Upload
- `POST /api/upload/file` - Simple file upload
- `POST /api/upload/chunk` - Chunked upload (for large files)
- `POST /api/upload/assemble` - Assemble chunks
- `POST /api/upload/cleanup` - Cleanup failed upload

## 🛠️ Development

### Local Development (without Docker)

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run app
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Adding New Features

#### 1. Add a New Model

```python
# app/db/models.py
class Product(SQLModel, table=True):
    __tablename__ = "products"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=200)
    price: float
```

#### 2. Create Schemas

```python
# app/schemas/product.py
from pydantic import BaseModel

class ProductCreate(BaseModel):
    name: str
    price: float

class ProductResponse(BaseModel):
    id: int
    name: str
    price: float
```

Don't forget to export in `app/schemas/__init__.py`:

```python
from .product import ProductCreate, ProductResponse

__all__ = [..., "ProductCreate", "ProductResponse"]
```

#### 3. Create Router

```python
# app/routers/products.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import get_session
from app.schemas import ProductCreate, ProductResponse

router = APIRouter(prefix="/products", tags=["products"])

@router.get("", response_model=list[ProductResponse])
async def get_products(session: AsyncSession = Depends(get_session)):
    # Implementation
    pass
```

#### 4. Register Router

```python
# app/main.py
from app.routers import products

app.include_router(products.router)
```

### Database Schema

Currently using SQLModel's `create_all()` for automatic table creation on startup. This approach works well for development and most production scenarios where schema changes are infrequent.

### Testing

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

## 🏗️ Architecture

### Tech Stack

- **Framework**: FastAPI 0.115+
- **Database**: PostgreSQL with asyncpg
- **ORM**: SQLModel (SQLAlchemy 2.0)
- **Authentication**: SuperTokens
- **Validation**: Pydantic v2
- **Server**: Uvicorn

### Design Patterns

#### 1. Dependency Injection

FastAPI's dependency injection for:
- Database sessions
- Authentication
- Authorization (role checks)

```python
from app.auth.auth_protections import require_auth

@router.get("/protected")
async def protected_route(user: User = Depends(require_auth)):
    return {"user_id": user.id}
```

#### 2. Repository Pattern (Implicit)

Database access through SQLAlchemy session dependencies.

#### 3. Schema Separation

- **Models** (`app/db/models.py`): Database tables
- **Schemas** (`app/schemas/`): API request/response contracts

### Key Concepts

#### Async SQLAlchemy

Always use eager loading for relationships:

```python
from sqlalchemy.orm import selectinload

statement = (
    select(BlogPost)
    .options(selectinload(BlogPost.author))
    .where(BlogPost.id == post_id)
)
```

#### SuperTokens Integration

Authentication is handled by SuperTokens:
- User sessions in cookies
- JWT tokens
- Social login (Google, GitHub)
- Email/password auth

#### Error Handling

Use FastAPI's `HTTPException`:

```python
from fastapi import HTTPException

if not post:
    raise HTTPException(status_code=404, detail="Post not found")
```

## 🔒 Security

- **Authentication**: SuperTokens with session cookies
- **CORS**: Configurable allowed origins
- **Environment Variables**: Never commit `.env` files
- **SQL Injection**: Protected by SQLAlchemy
- **Input Validation**: Automatic via Pydantic

## 📝 Common Tasks

### Add Admin User Manually

```python
from app.auth.auth_utils import create_user_with_role

await create_user_with_role("user@example.com", "password123", "admin")
```

### Change Default Roles

Edit `app/db/seed.py`:

```python
async def create_roles():
    await create_new_role_or_add_permissions("your_role", ["permission1", "permission2"])
```

### Add Custom Middleware

Edit `app/core/middleware.py`:

```python
def setup_middleware(app: FastAPI):
    # Add your middleware
    app.add_middleware(YourMiddleware)
```

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker-compose ps

# Check logs
docker-compose logs postgres
```

### SuperTokens Issues

```bash
# Check SuperTokens logs
docker-compose logs supertokens

# Verify connection
curl http://localhost:3567/hello
```

### Import Errors

Make sure you're in the correct directory and virtual environment:

```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
```

## 📄 License

[Your License Here]

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📞 Support

For issues and questions, please open an issue on GitHub.

