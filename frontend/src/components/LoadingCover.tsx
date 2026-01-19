/**
 * Global Loading Cover
 * 
 * Minimal full-screen loading overlay during initial app load.
 * Fades out smoothly once the app is ready.
 */

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export const LoadingCover = () => {
  const [show, setShow] = useState(true)

  // Hide after initial mount
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0f]"
        >
          {/* Pulsing node effect matching the game aesthetic */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ 
              scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="relative"
          >
            {/* Outer glow ring */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/20 blur-xl" />
            
            {/* Inner node */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 shadow-lg shadow-pink-500/30" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
