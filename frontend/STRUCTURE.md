# Frontend Structure Guide

This document explains the frontend project structure and how to use this boilerplate.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── config/              # Central configuration
│   │   └── index.ts         # Environment variables and app config
│   │
│   ├── layouts/             # Layout components
│   │   ├── RootLayout.tsx   # Main layout with header/footer
│   │   └── AuthLayout.tsx   # Protected route wrapper
│   │
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx     # Landing page
│   │   ├── AboutPage.tsx    # About page
│   │   └── DashboardPage.tsx # Protected dashboard
│   │
│   ├── components/          # Reusable components
│   │   └── ui/              # shadcn/ui components
│   │       ├── button.tsx
│   │       └── card.tsx
│   │
│   ├── stores/              # Zustand state management
│   │   ├── authStore.ts     # Authentication state
│   │   └── languageStore.ts # Language/i18n state
│   │
│   ├── lib/                 # Library configurations
│   │   ├── api.ts           # Type-safe API client
│   │   ├── supertokens.ts   # Auth configuration
│   │   └── utils.ts         # Utility functions
│   │
│   ├── i18n/                # Internationalization
│   │   ├── index.ts         # i18n setup
│   │   ├── languages.ts     # Supported languages
│   │   └── locales/         # Translation files
│   │       ├── en.json
│   │       ├── cs.json
│   │       └── de.json
│   │
│   ├── types/               # TypeScript type definitions
│   │   └── api.d.ts         # Auto-generated API types
│   │
│   ├── router/              # Routing configuration
│   │   └── index.tsx        # React Router setup
│   │
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
│
├── public/                  # Static assets
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```
