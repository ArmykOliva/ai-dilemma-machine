/**
 * SummaryScreen - Value-based analysis of player choices
 */
import { motion } from 'motion/react'
import { useGameStore } from '@/stores/gameStore'
import { GlassCard } from './GlassCard'
import { RotateCcw, Share2, Scale, Lightbulb, ShieldCheck, TrendingUp, MessageCircleQuestion } from 'lucide-react'

type Value = 'fairness' | 'innovation' | 'trust' | 'profit'

const VALUE_MAP: Record<string, Record<string, Value>> = {
  'copyright-claim':      { A: 'fairness',   B: 'profit' },
  'the-award':            { A: 'trust',       B: 'profit' },
  'cost-equation':        { A: 'innovation',  B: 'fairness' },
  'style-thief':          { A: 'fairness',    B: 'innovation' },
  'deepfake-crisis':      { A: 'trust',       B: 'innovation' },
  'creative-extinction':  { A: 'innovation',  B: 'fairness' },
}

const VALUE_META: Record<Value, { label: string, color: string, bg: string, bgFaded: string, icon: typeof Scale }> = {
  fairness:   { label: 'Fairness',   color: 'text-emerald-400', bg: 'bg-emerald-500', bgFaded: 'bg-emerald-500/20', icon: Scale },
  innovation: { label: 'Innovation', color: 'text-blue-400',    bg: 'bg-blue-500',    bgFaded: 'bg-blue-500/20',    icon: Lightbulb },
  trust:      { label: 'Trust',      color: 'text-amber-400',   bg: 'bg-amber-500',   bgFaded: 'bg-amber-500/20',   icon: ShieldCheck },
  profit:     { label: 'Profit',     color: 'text-pink-400',    bg: 'bg-pink-500',    bgFaded: 'bg-pink-500/20',    icon: TrendingUp },
}

const PROFILES: Record<Value, { title: string, description: string }> = {
  fairness: {
    title: "The Artist's Advocate",
    description: "You consistently chose to protect creators and ensure equitable outcomes — even when it cost you market share and competitive edge. You believe the people behind the art matter more than the art itself.",
  },
  innovation: {
    title: "The Disruptor",
    description: "You embraced AI's transformative potential, accepting short-term harm for long-term progress. You see technology as an unstoppable force and believe the best strategy is to shape it, not resist it.",
  },
  trust: {
    title: "The Transparency Champion",
    description: "You prioritized honesty and safety above all else, believing that without trust, no technology can serve society. You'd rather limit a tool's power than let it erode public confidence.",
  },
  profit: {
    title: "The Pragmatist",
    description: "You focused on what works — market efficiency, competitive advantage, and keeping the business alive. You believe a dead company can't help anyone, and survival comes first.",
  },
}

const BALANCED_PROFILE = {
  title: "The Balancer",
  description: "You refused to be locked into a single principle. Each dilemma got a fresh evaluation on its own merits. You understand that real ethics isn't about consistency — it's about context.",
}

const REFLECTIONS = [
  "If you were the artist whose style was being replicated, would you still agree with your choices?",
  "If you were a consumer who can't afford expensive games, would your answers change?",
  "If you were a junior artist just starting your career, which of your decisions would frighten you?",
]

export const SummaryScreen = () => {
  const { dilemmas, choices, resetGame } = useGameStore()

  const valueCounts: Record<Value, number> = { fairness: 0, innovation: 0, trust: 0, profit: 0 }
  choices.forEach(c => {
    const value = VALUE_MAP[c.dilemmaId]?.[c.choice]
    if (value) valueCounts[value]++
  })

  const maxCount = Math.max(...Object.values(valueCounts))
  const dominantValues = (Object.entries(valueCounts) as [Value, number][])
    .filter(([, count]) => count === maxCount)
  const isTied = dominantValues.length > 1
  const dominantValue = dominantValues[0][0]

  const profile = isTied ? BALANCED_PROFILE : PROFILES[dominantValue]
  const profileColor = isTied ? 'text-purple-400' : VALUE_META[dominantValue].color

  const averageAgreement = choices.length > 0
    ? choices.reduce((sum, c) => sum + c.percentageSame, 0) / choices.length
    : 0

  const handleShare = async () => {
    const text = `I completed the AI & Creativity Dilemma Machine!\n\nMy profile: ${profile.title}\nI prioritized: ${dominantValues.map(([v]) => VALUE_META[v].label).join(' & ')}\n${averageAgreement.toFixed(0)}% average agreement with other players.\n\nTry it yourself!`
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
        className="text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
            Your Story Is Written
          </span>
        </h1>
        <p className="text-gray-400">Here's what your choices reveal about your values</p>
      </motion.div>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard glowColor="cyan">
          <div className="text-center">
            <motion.div
              className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 bg-white/10 text-gray-300"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
            >
              Your Profile
            </motion.div>
            <h2 className={`text-2xl font-bold mb-3 ${profileColor}`}>{profile.title}</h2>
            <p className="text-gray-300 leading-relaxed">{profile.description}</p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Values breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard>
          <h3 className="text-lg font-semibold text-white mb-4">What You Prioritized</h3>
          <div className="space-y-3">
            {(Object.entries(VALUE_META) as [Value, typeof VALUE_META[Value]][]).map(([key, meta]) => {
              const count = valueCounts[key]
              const Icon = meta.icon
              const pct = choices.length > 0 ? (count / choices.length) * 100 : 0
              return (
                <div key={key} className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${meta.color}`} />
                  <span className={`w-20 text-sm font-medium ${meta.color}`}>{meta.label}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${meta.bg}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-6 text-right">{count}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <span className="text-sm text-gray-400">
              {averageAgreement.toFixed(0)}% average agreement with other players
            </span>
          </div>
        </GlassCard>
      </motion.div>

      {/* Journey recap */}
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
              const value = choice ? VALUE_MAP[dilemma.id]?.[choice.choice] : null
              const meta = value ? VALUE_META[value] : null

              return (
                <motion.div
                  key={dilemma.id}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  {meta && (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${meta.bgFaded}`}>
                      <meta.icon className={`w-4 h-4 ${meta.color}`} />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{dilemma.title}</div>
                    <div className="text-xs text-gray-500">{selectedOption?.shortText}</div>
                  </div>
                  {meta && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${meta.bgFaded} ${meta.color}`}>
                      {meta.label}
                    </span>
                  )}
                  <div className="text-sm text-gray-400">
                    {choice?.percentageSame.toFixed(0)}%
                  </div>
                </motion.div>
              )
            })}
          </div>
        </GlassCard>
      </motion.div>

      {/* Reflection prompts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <GlassCard glowColor="orange">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircleQuestion className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Now Reflect</h3>
          </div>
          <div className="space-y-3">
            {REFLECTIONS.map((q, i) => (
              <motion.p
                key={i}
                className="text-gray-300 text-sm leading-relaxed pl-4 border-l-2 border-orange-500/30"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + i * 0.15 }}
              >
                {q}
              </motion.p>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
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
