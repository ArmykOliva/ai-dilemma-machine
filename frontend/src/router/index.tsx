/**
 * React Router Configuration
 * 
 * Central routing configuration using React Router v7's createBrowserRouter.
 * 
 * Route structure:
 * - / - AI Dilemma Machine game (public)
 */

import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Pages (lazy loaded for code splitting)
const GamePage = lazy(() => import('@/pages/GamePage'))

/**
 * Wrapper component for lazy-loaded pages
 */
const LazyPage = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={null}>{children}</Suspense>
)

/**
 * Router configuration
 * Using createBrowserRouter for better features like loaders and error boundaries
 */
export const createRouter = () => createBrowserRouter([
  {
    path: '/',
    element: (
      <LazyPage>
        <GamePage />
      </LazyPage>
    ),
    errorElement: <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">404 - Page not found</div>,
  },
])

// For backwards compatibility
export const router = createRouter()
export default router
