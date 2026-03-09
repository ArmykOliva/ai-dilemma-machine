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
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            <span className="inline-block border-b-4 border-zinc-900 pb-1">
              {dilemmasData.title}
            </span>
          </h1>
        </motion.div>

        <motion.p
          className="text-base text-zinc-800 mb-2 leading-relaxed"
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
          <Palette className="w-5 h-5 text-zinc-900" />
          <h3 className="text-lg font-semibold text-zinc-900 uppercase tracking-wide">
            Your Story
          </h3>
        </div>
        <div className="space-y-4 text-zinc-800 leading-relaxed text-sm md:text-base">
          <p>
            <span className="font-semibold underline underline-offset-2">The year is 2026.</span>{' '}
            You are the creative director of a rising game studio that has just discovered AI art generation. The technology is extraordinary! It creates stunning visuals in seconds that would take your team of artists weeks!
          </p>
          <p>
            But extraordinary technology brings extraordinary questions. Who owns what the AI creates? What will happen to the artists of your game studio? How transparent should you be? And what happens when the technology you're using starts reshaping the very idea of creativity?
          </p>
          <p>
            Over <span className="font-semibold underline underline-offset-2">{dilemmasData.dilemmas.length} decisions</span>, you'll navigate the dilemmas at the intersection of AI and human art. Every decision might shape the future of creativity. When you're done, ask yourself: did you prioritize fairness, innovation, profit, or trust?
          </p>
          <p className="italic text-zinc-700">
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
          className="group relative inline-flex items-center justify-center
                    px-8 py-3 border-2 border-zinc-900 bg-zinc-50 text-zinc-900
                    font-semibold text-base
                    shadow-[4px_4px_0_0_rgba(0,0,0,0.9)]
                    transition-transform transition-shadow duration-200
                    hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.9)]
                    active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_0_rgba(0,0,0,0.9)]
                    disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="flex items-center gap-2">
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-zinc-900/40 border-t-zinc-900 rounded-full animate-spin" />
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
