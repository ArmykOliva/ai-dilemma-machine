/**
 * Game Page - AI Dilemma Machine
 * 
 * A chat-like interface for navigating AI ethics dilemmas.
 * Features glassmorphism design with glowing network nodes.
 */
import { motion, AnimatePresence } from 'motion/react'
import { useGameStore } from '@/stores/gameStore'
import { IntroScreen } from '@/components/game/IntroScreen'
import { DilemmaScreen } from '@/components/game/DilemmaScreen'
import { ResultScreen } from '@/components/game/ResultScreen'
import { SummaryScreen } from '@/components/game/SummaryScreen'
import { NetworkBackground } from '@/components/game/NetworkBackground'

const GamePage = () => {
  const phase = useGameStore(state => state.phase)

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative">
      {/* Animated network background */}
      <NetworkBackground />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl"
            >
              <IntroScreen />
            </motion.div>
          )}
          
          {phase === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl"
            >
              <DilemmaScreen />
            </motion.div>
          )}
          
          {phase === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl"
            >
              <ResultScreen />
            </motion.div>
          )}
          
          {phase === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl"
            >
              <SummaryScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default GamePage
