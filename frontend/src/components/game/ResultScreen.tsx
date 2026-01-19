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
      <GlassCard glowColor={lastChoice?.choice === 'A' ? 'pink' : 'orange'}>
        {/* Choice confirmation */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center
                          ${lastChoice?.choice === 'A' 
                            ? 'bg-pink-500/20 text-pink-400' 
                            : 'bg-orange-500/20 text-orange-400'
                          }`}>
            <Check className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Choice Made</h2>
            <p className={`text-sm ${
              lastChoice?.choice === 'A' ? 'text-pink-400' : 'text-orange-400'
            }`}>
              {selectedOption?.label}
            </p>
          </div>
        </motion.div>

        {/* Consequence */}
        <motion.div
          className="bg-white/5 rounded-xl p-5 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-200 leading-relaxed">
            {selectedOption?.description}
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 
                     border border-purple-500/20 rounded-xl p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-5 h-5 text-purple-400" />
            <span className="text-gray-300 font-medium">Community Response</span>
          </div>
          
          {/* Percentage display */}
          <div className="flex items-baseline gap-2 mb-3">
            <motion.span
              className="text-4xl font-bold text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
            >
              {lastChoicePercentage?.toFixed(1)}%
            </motion.span>
            <span className="text-gray-400">of players made the same choice</span>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                lastChoice?.choice === 'A' 
                  ? 'bg-gradient-to-r from-pink-500 to-pink-400' 
                  : 'bg-gradient-to-r from-orange-500 to-orange-400'
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
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 
                     rounded-xl font-semibold text-white text-lg
                     hover:from-purple-500 hover:to-blue-500
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 flex items-center justify-center gap-2
                     shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40
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
