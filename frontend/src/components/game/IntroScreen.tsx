/**
 * IntroScreen - Welcome screen for the AI Dilemma Machine
 */
import { motion } from 'motion/react'
import { useGameStore } from '@/stores/gameStore'
import { GlassCard } from './GlassCard'
import { Play, AlertTriangle } from 'lucide-react'
import dilemmasData from '@/data/dilemmas.json'

export const IntroScreen = () => {
  const { startGame, isLoading } = useGameStore()

  return (
    <GlassCard className="text-center">
      {/* Glowing title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
            {dilemmasData.title}
          </span>
        </h1>
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-lg text-gray-300 mb-8 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {dilemmasData.description}
      </motion.p>

      {/* Warning box */}
      <motion.div
        className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-3 text-orange-400">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm text-left">
            You will face {dilemmasData.dilemmas.length} dilemmas. 
            There are no right answers, only difficult choices. 
            Your responses will be anonymously compared to other players.
          </p>
        </div>
      </motion.div>

      {/* Start button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <button
          onClick={startGame}
          disabled={isLoading}
          className="group relative px-8 py-4 bg-gradient-to-r from-pink-600 to-orange-600 
                     rounded-xl font-semibold text-white text-lg
                     hover:from-pink-500 hover:to-orange-500
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300
                     shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40
                     hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="flex items-center gap-2">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Initializing...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Begin Experience
              </>
            )}
          </span>
        </button>
      </motion.div>
    </GlassCard>
  )
}
