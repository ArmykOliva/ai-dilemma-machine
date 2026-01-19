/**
 * Central Configuration File
 * 
 * This file loads environment variables and provides default values.
 * All configuration should be accessed through this file to maintain consistency.
 * 
 * Environment variables are loaded from .env files (or docker env vars)
 * and fall back to sensible defaults for development.
 */

/**
 * Get environment variable with fallback
 * Vite exposes env vars prefixed with VITE_ as import.meta.env.VITE_*
 */
const getEnv = (key: string, defaultValue: string): string => {
  return import.meta.env[key] ?? defaultValue
}

/**
 * API Configuration
 * Base URL for backend API calls
 * 
 * Using relative paths since everything goes through nginx proxy on port 3000
 * nginx routes:
 * - / -> frontend
 * - /api -> backend
 */
export const API_CONFIG = {
  // Backend API base URL (without trailing slash)
  // Relative path - nginx will proxy to backend
  BASE_URL: getEnv('VITE_API_BASE_URL', '/api'),
  
  // Full base URL for absolute paths (same origin)
  FULL_BASE_URL: getEnv('VITE_FULL_BASE_URL', ''),
  
  // OpenAPI schema URL (for type generation)
  OPENAPI_URL: getEnv('VITE_OPENAPI_URL', '/api/openapi.json'),
} as const

/**
 * Application Configuration
 * General app settings
 */
export const APP_CONFIG = {
  // Application name
  NAME: getEnv('VITE_APP_NAME', 'AI Dilemma Machine'),
  
  // Enable debug mode
  DEBUG: getEnv('VITE_DEBUG', 'false') === 'true',
} as const

/**
 * Feature Flags
 * Toggle features on/off
 */
export const FEATURES = {
  // Enable analytics
  ANALYTICS_ENABLED: getEnv('VITE_FEATURE_ANALYTICS', 'false') === 'true',
} as const

// Log configuration in development
if (import.meta.env.DEV) {
  console.log('🔧 Configuration loaded:', {
    API_CONFIG,
    APP_CONFIG,
    FEATURES,
  })
}
