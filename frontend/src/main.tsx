/**
 * Application Entry Point
 * 
 * This is the main entry file that:
 * 1. Sets up React Router
 * 2. Renders the app to the DOM
 */

import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

// Styles
import './index.css'

// App configuration
import { APP_CONFIG } from './config'

// Router factory
import { createRouter } from './router'

// Global loading cover
import { LoadingCover } from './components/LoadingCover'

// Create router
const router = createRouter()

/**
 * App Wrapper Component
 */
const App = () => {
  // Set document title from config
  useEffect(() => {
    document.title = APP_CONFIG.NAME
  }, [])

  return (
    <>
      {/* Router - all routes are public */}
      <RouterProvider router={router} />
    </>
  )
}

// Render the app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)