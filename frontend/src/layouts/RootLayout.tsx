/**
 * Root Layout Component
 * 
 * Simple layout wrapper with minimal header and footer.
 */

import { Outlet } from 'react-router-dom'
import { APP_CONFIG } from '@/config'

/**
 * Root Layout Component
 * Provides minimal header and outlet for content
 */
const RootLayout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {APP_CONFIG.NAME}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t py-6 text-center text-sm text-muted-foreground">
        <p>Built with React, FastAPI, and TypeScript</p>
      </footer>
    </div>
  )
}

export default RootLayout
