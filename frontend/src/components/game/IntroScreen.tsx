/**
 * IntroScreen - Welcome screen with narrative arc setup
 */
import { motion } from 'motion/react'
import { useGameStore } from '@/stores/gameStore'
import { GlassCard } from './GlassCard'
import { Play, Palette } from 'lucide-react'
import dilemmasData from '@/data/dilemmas.json'

export const IntroScreen = () => {
  const { startGame, isLoading } = useGameStore()

  return (
    <div className="space-y-6">
      <GlassCard className="text-center">
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

        <motion.p
          className="text-lg text-gray-300 mb-2 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {dilemmasData.description}
        </motion.p>
      </GlassCard>

      {/* Narrative arc setup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <GlassCard>
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Your Story</h3>
          </div>
          <div className="space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
            <p>
              <span className="text-white font-medium">The year is 2026.</span> You are the creative director of a rising game studio that has just adopted cutting-edge AI art generation. The technology is extraordinary — it creates stunning visuals in seconds that would take human artists weeks.
            </p>
            <p>
              But extraordinary power brings extraordinary questions. Who owns what the AI creates? What happens to the artists it learned from? How transparent should you be? And what happens when the technology you unleashed starts reshaping the very idea of creativity?
            </p>
            <p>
              Over <span className="text-white font-medium">{dilemmasData.dilemmas.length} escalating decisions</span>, you'll navigate the real dilemmas at the intersection of AI and human art — from courtroom battles over copyright to an existential reckoning with what happens when machines no longer need us to create.
            </p>
            <p className="text-gray-400 italic">
              There are no right answers. Only trade-offs. Your responses will be compared to other players.
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Start button */}
      <motion.div
        className="text-center"
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
                Take the Chair
              </>
            )}
          </span>
        </button>
      </motion.div>
    </div>
  )
}
