/**
 * ResultScreen - Shows the result after making a choice
 * 
 * Displays the consequence and how many others made the same choice.
 */
import { motion } from 'motion/react'
import { useGameStore } from '@/stores/gameStore'
import { GlassCard } from './GlassCard'
import { Users, ArrowRight, Check } from 'lucide-react'

export const ResultScreen = () => {
  const { 
    dilemmas, 
    currentDilemmaIndex, 
    choices, 
    lastChoicePercentage, 
    nextDilemma,
    isLoading 
  } = useGameStore()
  
  const dilemma = dilemmas[currentDilemmaIndex]
  const lastChoice = choices[choices.length - 1]
  const selectedOption = dilemma.options.find(o => o.id === lastChoice?.choice)
  const isLastDilemma = currentDilemmaIndex === dilemmas.length - 1

  return (
    <div className="space-y-6">
      {/* Result card */}
      <GlassCard>
        {/* Choice confirmation */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-zinc-900 bg-zinc-50
                       shadow-[4px_4px_0_0_rgba(0,0,0,0.85)]"
          >
            <Check className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Choice Made</h2>
            <p className="text-sm text-zinc-700 italic">
              {selectedOption?.label}
            </p>
          </div>
        </motion.div>

        {/* Consequence */}
        <motion.div
          className="bg-zinc-100 border-2 border-zinc-900/30 rounded-xl p-5 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-zinc-800 leading-relaxed">
            {selectedOption?.description}
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="bg-zinc-50 border-2 border-zinc-900 rounded-xl p-5 shadow-[4px_4px_0_0_rgba(0,0,0,0.85)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-5 h-5 text-zinc-900" />
            <span className="text-zinc-800 font-medium">Community Response</span>
          </div>
          
          {/* Percentage display */}
          <div className="flex items-baseline gap-2 mb-3">
            <motion.span
              className="text-4xl font-bold text-zinc-900"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
            >
              {lastChoicePercentage?.toFixed(1)}%
            </motion.span>
            <span className="text-zinc-700">of players made the same choice</span>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-zinc-200 rounded-full overflow-hidden border border-zinc-900/40">
            <motion.div
              className="h-full rounded-full bg-zinc-900"
              initial={{ width: 0 }}
              animate={{ width: `${lastChoicePercentage || 0}%` }}
              transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      </GlassCard>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <button
          onClick={nextDilemma}
          disabled={isLoading}
          className="w-full py-4 rounded-xl font-semibold text-zinc-900 text-lg
                     border-2 border-zinc-900 bg-zinc-50
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-transform duration-200 flex items-center justify-center gap-2
                     shadow-[4px_4px_0_0_rgba(0,0,0,0.9)]
                     hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.9)]
                     active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_0_rgba(0,0,0,0.9)]"
        >
          {isLastDilemma ? (
            <>
              View Summary
              <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            <>
              Next Dilemma
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </motion.div>
    </div>
  )
}
