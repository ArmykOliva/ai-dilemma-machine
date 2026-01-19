/**
 * Type-Safe API Client
 * 
 * This file sets up the API client using openapi-fetch for type-safe HTTP requests.
 * Types are automatically generated from the backend's OpenAPI schema.
 * 
 * Usage - Just call apiClient directly in your components!
 * 
 * GET request:
 *   const { data, error } = await apiClient.GET('/authors/')
 *   // data is automatically typed as Author[] from your Pydantic models!
 * 
 * POST request:
 *   const { data, error } = await apiClient.POST('/authors/', {
 *     body: { name: 'John', email: 'john@example.com' }
 *   })
 * 
 * Path parameters:
 *   const { data, error } = await apiClient.GET('/authors/{author_id}', {
 *     params: { path: { author_id: 123 } }
 *   })
 * 
 * Query parameters:
 *   const { data, error } = await apiClient.GET('/posts/', {
 *     params: { query: { limit: 10, offset: 0 } }
 *   })
 * 
 * ✨ Everything is automatically typed - no manual type definitions needed!
 * 
 * To regenerate types after backend changes:
 *   npm run generate-types
 *   (Make sure the backend is running first!)
 */

import createClient from 'openapi-fetch'
import type { paths } from '@/types/api'
import { API_CONFIG } from '@/config'

/**
 * Main API client instance
 * Automatically typed based on backend OpenAPI schema
 */
export const apiClient = createClient<paths>({
  baseUrl: API_CONFIG.BASE_URL,
})

/**
 * Add request interceptor for authentication
 * SuperTokens automatically handles session tokens via cookies,
 * but you can add custom headers here if needed
 */
apiClient.use({
  async onRequest({ request }) {
    // Add custom headers if needed
    // For example: request.headers.set('X-Custom-Header', 'value')
    
    // Log requests in development
    if (import.meta.env.DEV) {
      console.log('🌐 API Request:', request.method, request.url)
    }
    
    return request
  },
  
  async onResponse({ response }) {
    // Log responses in development
    if (import.meta.env.DEV) {
      console.log('✅ API Response:', response.status, response.url)
    }
    
    return response
  },
})

/**
 * Helper function to handle API errors consistently
 */
export const handleApiError = (error: unknown): string => {
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }
  return 'An unexpected error occurred'
}

// Export the client as default for convenience
export default apiClient
