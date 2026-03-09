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
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-zinc-900/80 bg-zinc-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="text-xl font-semibold tracking-tight uppercase">
            <span className="inline-block border-b-4 border-zinc-900 pb-1">
              {APP_CONFIG.NAME}
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t-2 border-zinc-900/40 py-6 text-center text-xs text-zinc-700">
        <p>Built with React, FastAPI, and TypeScript</p>
      </footer>
    </div>
  )
}

export default RootLayout
