/**
 * DilemmaScreen - Displays the current dilemma with choice options
 * 
 * Features a chat-like interface with "autocomplete" style options.
 */
import { motion } from 'motion/react'
import { useGameStore } from '@/stores/gameStore'
import { GlassCard } from './GlassCard'
import { MessageSquare, Sparkles } from 'lucide-react'

export const DilemmaScreen = () => {
  const { dilemmas, currentDilemmaIndex, selectChoice, isLoading } = useGameStore()
  const dilemma = dilemmas[currentDilemmaIndex]

  const handleChoice = async (choice: string) => {
    if (isLoading) return
    await selectChoice(choice)
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-between text-gray-600 text-sm mb-2">
        <span>Dilemma {currentDilemmaIndex + 1} of {dilemmas.length}</span>
        <div className="flex gap-1">
          {dilemmas.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i < currentDilemmaIndex
                  ? 'bg-blue-500'
                  : i === currentDilemmaIndex
                  ? 'bg-purple-500'
                  : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main dilemma card */}
      <GlassCard>
        {/* Title bar - like a chat header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black/10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 
                          flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-500">{dilemma.title}</h2>
            <p className="text-sm text-gray-600">AI Ethics Protocol</p>
          </div>
        </div>
      
        {/* Context - the "message" */}
        <motion.div
          className="bg-blue-200 rounded-xl p-5 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-black-200 leading-relaxed">{dilemma.context}</p>
        </motion.div>

          <img
          src={dilemma.picture}
          alt="Dilemma illustration"
          className="w-full rounded-lg shadow-md"
        />

        {/* Blinking cursor indicator */}
        <motion.div 
          className="flex items-center gap-2 text-blue-300 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">How will you act..?</span>
        </motion.div>

        {/* Choice options - styled like autocomplete suggestions */}
        <div className="space-y-3">
          {dilemma.options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <button
                onClick={() => handleChoice(option.id)}
                disabled={isLoading}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300
                           disabled:opacity-50 disabled:cursor-not-allowed group
                           hover:scale-[1.01] active:scale-[0.99]
                           ${option.id === 'A' 
                             ? 'bg-purple-500/30 border-purple-500/20 hover:bg-purple-500/15 hover:border-purple-500/40' 
                             : 'bg-blue-500/30 border-blue-500/20 hover:bg-blue-500/15 hover:border-blue-500/40'
                           }`}
              >
                <div className="flex items-start gap-3">
                  {/* Option indicator */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0
                                 ${option.id === 'A' 
                                   ? 'bg-purple-500/20 text-purple-400' 
                                   : 'bg-blue-500/20 text-blue-400'
                                 }`}>
                    {option.id}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`font-semibold ${
                        option.id === 'A' ? 'text-purple-400' : 'text-blue-400'
                      }`}>
                        {option.label}
                      </span>
                      <span className="text-xs text-grey-400 px-2 py-0.5 bg-white-400 rounded">
                        {option.shortText}
                      </span>
                    </div>
                    <p className="text-sm text-black-400 leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
