# A template to start a fullstack project asap

I (Krystof) created this because the fullstack boilerplate is massive and complex. This is a ready to use project for any fullstack project optimized for the AI age (where llms write code). This should contain all the best practices for fast, cheap and simple development.

The following is a human written documentation with no LLM BS, fast and simple to use. This documentation also serves as a tutorial for sw engineering in general, not only regarding this project. enjoy 

## Quick Access

**Website:**
http://localhost:3000

**API Docs (Swagger):**
http://localhost:3000/api/docs

**pgAdmin (Database Management):**
http://localhost:5050
- Password: `admin`
- Database password: Use your `POSTGRES_PASSWORD` from `.env`


## How to setup (for development)

Prerequisites
- download docker desktop
- download git
- download node.js

Setup
- `git clone https://github.com/Ollsoft-ai/agile-ai-project-template.git`
- Open in vscode/cursor
- Copy .env.example into .env
- `docker compose up --build`
- profit $$$

## Development guidelines - notes - know how

### Frontend

- https://tweakcn.com is a good resource for frontend theming
- 21st.dev is a good resource to find components for inspiration
- supported languages are in frontend/src/i18n/languages.ts and the language mutations in frontend/src/i18n/locales
- If you want to rebuild the api.d.ts from fastapi, docker compose down and docker compose up again

**File Structure:**
Things that you as a DEV should care about are marked with ✅. You generally don't need to touch anything else.
```
frontend/
├── src/
│   ├── main.tsx              # Entry point - initializes React
│   ├── index.css             # Global styles and Tailwind setup
│   ├── components/           # Reusable UI components - automatically generated with shadcn
│   ├── config/
│   │   └── index.ts          # ✅ CONFIGURATION OF DEFAULT GLOBAL VARS, PARAMETERS, ETC - EVERY .ENV PARAMETER SHOULD COME THROUGH HERE
│   ├── layouts/              # Page layout wrappers
│   │   └── RootLayout.tsx    # Main app layout
│   ├── lib/                  # Utility libraries
│   │   ├── api.ts            # API client with axios setup
│   │   └── utils.ts          # Helper functions (cn, etc.)
│   ├── pages/                # ✅ Page components - IMPORTANT - THESE ARE THE ACTUAL PAGES. EDIT THEM AS YOU NEED
│   │   └── HomePage.tsx      # ✅ Landing/home page
│   ├── router/
│   │   └── index.tsx         # ✅ React Router setup with route definitions - WHEN ADDING NEW ROUTES, HERE CHANGE THEM
│   └── types/
│       └── api.d.ts          # Auto-generated TypeScript types from FastAPI
├── public/
│   └── favicon.ico           # ✅ Website favicon - IF YOU WANT ANOTHER FAVICON
├── components.json           # ShadCN component configuration
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite bundler configuration
├── tsconfig.json             # TypeScript configuration
├── eslint.config.js          # ESLint linting rules
├── index.html                # HTML entry point
└── Dockerfile                # Docker container for development
```

### Backend

**File Structure:**
```
backend/
├── app/
│   ├── __init__.py           # Package initializer
│   ├── main.py               # ✅ FastAPI app entry point, CORS, routes setup - WHEN ADDING NEW ROUTES, ADD HERE
│   ├── config.py             # ✅ Configuration loading from environment variables - DEFAULT ENV VARS ETC
│   ├── database.py           # Database session management and initialization
│   ├── models.py             # ✅ SQLModel database models (User, Post, etc.) - DATABASE TABLES ADD HERE
│   ├── logging.py            # Logging configuration
│   ├── initial_setup.py      # Database initialization and seed data
│   └── routers/              # ✅ API endpoint routers - THESE ARE THE ACTUAL BUSINESS LOGIC ROUTES OF THE API
│       ├── __init__.py       # Router module initializer
│       ├── me.py             # ✅ /me endpoints (basic info)
│       ├── posts.py          # ✅ /posts endpoints (CRUD operations)
│       └── upload.py         # ✅ /upload endpoints (file uploads)
├── requirements.txt          # Python dependencies
├── Dockerfile                # Docker container for development
└── Dockerfile.prod           # Docker container for production
```

### devops

- always when changing docker compose change docker compose prod as well and check both run correctly

## How to do production deployment

- how to setup the .env 

Password gen
```
openssl rand -hex 32
```
put the result to .env as:
POSTGRES_PASSWORD="result"

https://clickdown.ollsoft.ai/apps/collectives/Mini-aplikace-a-Tools-14/Transkripcni-tool-5934

To be continued...

## About this tech stack and the reasoning behind it

This might be outdated. Always look into the docker compose, requirements.txt and package-lock.json to see what we use.

- AI development setup
  - System prompts for cursor - in .cursor/rules we have a set of system prompts that the ai should see all the time to correctly develop both frontend and backend
  - .cursor/mcp.json - contains all the MCPs that help the AI do the development

- FastAPI python backend - because all modern libraries run on python, and javascript sucks
  - SQLModel - sqlalchemy + pydantic - for database tables and api models

- React with Vite - react has the biggest marketshare and vite is fast in hotreloading - only downside is that this is not doing server side rendering - not using next.js because it's support for windows docker is weird
  - tailwind - inline styling
  - zustand - global state management
  - radix - component library so its simpler to build the app and make it nice
  - framer motion - so it has nice animations
  - lucid icons
  - Openapi to typescript -> we automatically generate the /src/types/api.d.ts so that autocomplete works correctly and we don't have to recode the datamodels twice

- nginx proxying it all - single point of entry is localhost:3000 - the nginx proxy also handles all the security stuff etc

- PostgreSQL database - the swiss knife of databases, supports json and sql. 
  - pgadmin - to view the postgresql database for debugging purposes - is pretty user unintuitive
