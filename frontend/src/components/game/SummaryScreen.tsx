/**
 * SummaryScreen - Final summary of all choices
 */
import { motion } from 'motion/react'
import { useGameStore } from '@/stores/gameStore'
import { GlassCard } from './GlassCard'
import { BarChart3, RotateCcw, Share2, Check, X } from 'lucide-react'

export const SummaryScreen = () => {
  const { dilemmas, choices, resetGame } = useGameStore()

  // Calculate overall stats
  const choiceACount = choices.filter(c => c.choice === 'A').length
  const choiceBCount = choices.filter(c => c.choice === 'B').length
  const averageAgreement = choices.length > 0 
    ? choices.reduce((sum, c) => sum + c.percentageSame, 0) / choices.length 
    : 0

  // Personality analysis based on choices
  const getPersonalityInsight = () => {
    if (choiceACount > choiceBCount + 1) {
      return {
        title: "The Pragmatic Utilitarian",
        description: "You tend to favor immediate action and tangible outcomes, even when they carry moral risk. You believe in making hard choices now rather than deferring harm.",
        color: 'pink' as const
      }
    } else if (choiceBCount > choiceACount + 1) {
      return {
        title: "The Principled Guardian", 
        description: "You prioritize ethical boundaries and systemic protection over immediate gains. You're willing to accept short-term suffering to prevent long-term harm.",
        color: 'orange' as const
      }
    } else {
      return {
        title: "The Ethical Navigator",
        description: "You weigh each situation individually, refusing to commit to a single moral framework. You understand that context matters in ethical decision-making.",
        color: 'cyan' as const
      }
    }
  }

  const personality = getPersonalityInsight()

  const handleShare = async () => {
    const text = `I completed the AI Ethics Dilemma Machine!\n\nMy profile: ${personality.title}\n${averageAgreement.toFixed(1)}% average agreement with other players.\n\nTry it yourself!`
    if (navigator.share) {
      await navigator.share({ text })
    } else {
      await navigator.clipboard.writeText(text)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
            Experience Complete
          </span>
        </h1>
        <p className="text-gray-400">Here's what your choices reveal about you</p>
      </motion.div>

      {/* Personality card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard glowColor={personality.color}>
          <div className="text-center">
            <motion.div
              className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4
                         ${personality.color === 'pink' ? 'bg-pink-500/20 text-pink-400' :
                           personality.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                           'bg-cyan-500/20 text-cyan-400'
                         }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
            >
              Your Profile
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-3">{personality.title}</h2>
            <p className="text-gray-300 leading-relaxed">{personality.description}</p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Stats overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Your Statistics</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-pink-500/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-pink-400">{choiceACount}</div>
              <div className="text-sm text-gray-400">Track A Choices</div>
            </div>
            <div className="bg-orange-500/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-orange-400">{choiceBCount}</div>
              <div className="text-sm text-gray-400">Track B Choices</div>
            </div>
            <div className="bg-purple-500/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-purple-400">{averageAgreement.toFixed(0)}%</div>
              <div className="text-sm text-gray-400">Avg. Agreement</div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Individual choice summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <GlassCard>
          <h3 className="text-lg font-semibold text-white mb-4">Your Journey</h3>
          <div className="space-y-3">
            {dilemmas.map((dilemma, index) => {
              const choice = choices.find(c => c.dilemmaId === dilemma.id)
              const selectedOption = dilemma.options.find(o => o.id === choice?.choice)
              
              return (
                <motion.div
                  key={dilemma.id}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                                  ${choice?.choice === 'A' 
                                    ? 'bg-pink-500/20 text-pink-400' 
                                    : 'bg-orange-500/20 text-orange-400'
                                  }`}>
                    {choice?.choice === 'A' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">
                      {dilemma.title.replace('The ', '').replace(' Dilemma', '')}
                    </div>
                    <div className="text-xs text-gray-500">{selectedOption?.shortText}</div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {choice?.percentageSame.toFixed(0)}%
                  </div>
                </motion.div>
              )
            })}
          </div>
        </GlassCard>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <button
          onClick={handleShare}
          className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 
                     rounded-xl font-semibold text-white
                     hover:from-purple-500 hover:to-blue-500
                     transition-all duration-300 flex items-center justify-center gap-2
                     hover:scale-[1.01] active:scale-[0.99]"
        >
          <Share2 className="w-5 h-5" />
          Share Results
        </button>
        <button
          onClick={resetGame}
          className="flex-1 py-3 bg-white/10 border border-white/20
                     rounded-xl font-semibold text-white
                     hover:bg-white/20 transition-all duration-300 
                     flex items-center justify-center gap-2
                     hover:scale-[1.01] active:scale-[0.99]"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
      </motion.div>
    </div>
  )
}
