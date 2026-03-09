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
      <div className="flex items-center justify-between text-zinc-600 text-sm mb-2">
        <span>Dilemma {currentDilemmaIndex + 1} of {dilemmas.length}</span>
        <div className="flex gap-1">
          {dilemmas.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i < currentDilemmaIndex
                  ? 'bg-zinc-900'
                  : i === currentDilemmaIndex
                  ? 'bg-zinc-600 ring-2 ring-zinc-900 ring-offset-2 ring-offset-transparent'
                  : 'bg-zinc-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main dilemma card */}
      <GlassCard>
        {/* Title bar - like a chat header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-zinc-900/20">
          <div className="w-10 h-10 rounded-full border-2 border-zinc-900 flex items-center justify-center bg-zinc-50">
            <MessageSquare className="w-5 h-5 text-zinc-900" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">{dilemma.title}</h2>
            <p className="text-sm text-zinc-600">AI Ethics Protocol</p>
          </div>
        </div>
      
        {/* Context - the "message" */}
        <motion.div
          className="bg-zinc-100 border-2 border-zinc-900/30 rounded-xl p-5 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-zinc-800 leading-relaxed">{dilemma.context}</p>
        </motion.div>

        <img
          src={dilemma.picture}
          alt="Dilemma illustration"
          className="w-full rounded-lg border-2 border-zinc-900/80 shadow-[4px_4px_0_0_rgba(0,0,0,0.85)]"
        />

        {/* Prompt */}
        <motion.div 
          className="flex items-center gap-2 text-zinc-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm italic">How will you act..?</span>
        </motion.div>

        {/* Choice options - hand-drawn card style */}
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
                className="w-full text-left p-4 rounded-xl border-2 border-zinc-900 bg-zinc-50
                           shadow-[4px_4px_0_0_rgba(0,0,0,0.9)]
                           transition-transform duration-200
                           hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.9)]
                           active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_0_rgba(0,0,0,0.9)]
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0
                                 border-2 border-zinc-900 bg-zinc-50 text-zinc-900">
                    {option.id}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-semibold text-zinc-900">
                        {option.label}
                      </span>
                      <span className="text-xs text-zinc-600 px-2 py-0.5 border border-zinc-400 rounded bg-zinc-100">
                        {option.shortText}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-700 leading-relaxed">
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
