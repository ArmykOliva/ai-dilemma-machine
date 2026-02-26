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
      <GlassCard glowColor={lastChoice?.choice === 'A' ? 'purple' : 'blue'}>
        {/* Choice confirmation */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center
                          ${lastChoice?.choice === 'A' 
                            ? 'bg-purple-500/50 text-purple-600' 
                            : 'bg-blue-500/50 text-blue-600'
                          }`}>
            <Check className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-black">Choice Made</h2>
            <p className={`text-sm ${
              lastChoice?.choice === 'A' ? 'text-purple-500' : 'text-blue-500'
            }`}>
              {selectedOption?.label}
            </p>
          </div>
        </motion.div>

        {/* Consequence */}
        <motion.div
          className = {lastChoice?.choice === 'A' ? "bg-purple-300 rounded-xl p-5 mb-6" : "bg-blue-300 rounded-xl p-5 mb-6"}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-black-200 leading-relaxed">
            {selectedOption?.description}
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="bg-gradient-to-r from-blue-300 to-purple-300 
                     border border-purple-500 rounded-xl p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-5 h-5 text-white" />
            <span className="text-black-300 font-medium">Community Response</span>
          </div>
          
          {/* Percentage display */}
          <div className="flex items-baseline gap-2 mb-3">
            <motion.span
              className="text-4xl font-bold text-black-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
            >
              {lastChoicePercentage?.toFixed(1)}%
            </motion.span>
            <span className="text-black-400">of players made the same choice</span>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-white/50 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                lastChoice?.choice === 'A' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-400' 
                  : 'bg-gradient-to-r from-purple-500 to-purple-400'
              }`}
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
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 
                     rounded-xl font-semibold text-white text-lg
                     hover:from-purple-400 hover:to-blue-400
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 flex items-center justify-center gap-2
                     shadow-lg shadow-purple-500/20 hover:shadow-blue-500/40
                     hover:scale-[1.01] active:scale-[0.99]"
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
