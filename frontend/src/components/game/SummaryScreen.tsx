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
  'player-trust':         { A: 'trust', B: 'profit' },
  'ai-mods':              { A: 'fairness', B: 'innovation' }
}

const VALUE_META: Record<Value, { label: string, color: string, bg: string, bgFaded: string, icon: typeof Scale }> = {
  fairness:   { label: 'Fairness',   color: 'text-zinc-900', bg: 'bg-zinc-900', bgFaded: 'bg-zinc-200', icon: Scale },
  innovation: { label: 'Innovation', color: 'text-zinc-900', bg: 'bg-zinc-900', bgFaded: 'bg-zinc-200', icon: Lightbulb },
  trust:      { label: 'Trust',      color: 'text-zinc-900', bg: 'bg-zinc-900', bgFaded: 'bg-zinc-200', icon: ShieldCheck },
  profit:     { label: 'Profit',     color: 'text-zinc-900', bg: 'bg-zinc-900', bgFaded: 'bg-zinc-200', icon: TrendingUp },
}

const PROFILES: Record<Value, { title: string, description: string }> = {
  fairness: {
    title: "The Artist's Advocate",
    description: "You consistently chose to protect creators and ensure fair outcomes for your artists, even if it might cost you time and money. You believe the people behind the art matter more than the art itself.",
  },
  innovation: {
    title: "The Future Shaper",
    description: "You embraced AI's potential, accepting short-term harm for long-term progress. You innovation as inevitable and believe the best strategy is to shape it and embrace it, not resist it.",
  },
  trust: {
    title: "The Transparency Champion",
    description: "You prioritized honesty and safety above all else, believing that without trust, no technology can serve society. You'd rather limit a tool's power than break the publics trust.",
  },
  profit: {
    title: "The Pragmatist",
    description: "You focused on what works: making money, selling games, keeping the company alive. You believe a closed studio can't help anyone, and survival comes first.",
  },
}

const BALANCED_PROFILE = {
  title: "The Balancer",
  description: "You refused to be locked into a single principle. You evaluated each dilemma on its own. Real life isn't purely black and white after all. Or you chose your answers at random. I guess we'll never know.",
}

const REFLECTIONS = [
  "If you were the artist, not the director, would you still agree with your choices?",
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
  const profileColor = VALUE_META[dominantValue].color

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
          <span className="inline-block border-b-4 border-zinc-900 pb-1">
            You Made Your Choices
          </span>
        </h1>
        <p className="text-zinc-700">Here's what they reveal about you</p>
      </motion.div>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard>
          <div className="text-center">
            <motion.div
              className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 border-2 border-zinc-900 bg-zinc-50
                         shadow-[3px_3px_0_0_rgba(0,0,0,0.85)]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
            >
              Your Profile
            </motion.div>
            <h2 className={`text-2xl font-bold mb-3 ${profileColor}`}>{profile.title}</h2>
            <p className="text-zinc-800 leading-relaxed">{profile.description}</p>
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
          <h3 className="text-lg font-semibold text-zinc-900 mb-4">What You Prioritized</h3>
          <div className="space-y-3">
            {(Object.entries(VALUE_META) as [Value, typeof VALUE_META[Value]][]).map(([key, meta]) => {
              const count = valueCounts[key]
              const Icon = meta.icon
              const pct = choices.length > 0 ? (count / choices.length) * 100 : 0
              return (
                <div key={key} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 flex-shrink-0 text-zinc-900" />
                  <span className="w-24 text-sm font-medium text-zinc-900">{meta.label}</span>
                  <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden border border-zinc-900/40">
                    <motion.div
                      className="h-full rounded-full bg-zinc-900"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    />
                  </div>
                  <span className="text-sm text-zinc-700 w-6 text-right">{count}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-zinc-300 text-center">
            <span className="text-sm text-zinc-700">
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
          <h3 className="text-lg font-semibold text-zinc-900 mb-4">Your Journey</h3>
          <div className="space-y-3">
            {dilemmas.map((dilemma, index) => {
              const choice = choices.find(c => c.dilemmaId === dilemma.id)
              const selectedOption = dilemma.options.find(o => o.id === choice?.choice)
              const value = choice ? VALUE_MAP[dilemma.id]?.[choice.choice] : null
              const meta = value ? VALUE_META[value] : null

              return (
                <motion.div
                  key={dilemma.id}
                  className="flex items-center gap-3 p-3 bg-zinc-100 rounded-lg border border-zinc-300"
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
                    <div className="text-sm font-medium text-zinc-900 truncate">{dilemma.title}</div>
                    <div className="text-xs text-zinc-700">{selectedOption?.shortText}</div>
                  </div>
                  {meta && (
                    <span className="text-xs px-2 py-0.5 rounded-full border border-zinc-900 bg-zinc-50">
                      {meta.label}
                    </span>
                  )}
                  <div className="text-sm text-zinc-700">
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
        <GlassCard>
          <div className="flex items-center gap-3 mb-4">
            <MessageCircleQuestion className="w-5 h-5 text-zinc-900" />
            <h3 className="text-lg font-semibold text-zinc-900">Now Reflect</h3>
          </div>
          <div className="space-y-3">
            {REFLECTIONS.map((q, i) => (
              <motion.p
                key={i}
                className="text-zinc-800 text-sm leading-relaxed pl-4 border-l-2 border-zinc-900/40"
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
          className="flex-1 py-3 rounded-xl font-semibold text-zinc-900
                     border-2 border-zinc-900 bg-zinc-50
                     transition-transform duration-200 flex items-center justify-center gap-2
                     shadow-[4px_4px_0_0_rgba(0,0,0,0.9)]
                     hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.9)]
                     active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_0_rgba(0,0,0,0.9)]"
        >
          <Share2 className="w-5 h-5" />
          Share Results
        </button>
        <button
          onClick={resetGame}
          className="flex-1 py-3 rounded-xl font-semibold text-zinc-900
                     border-2 border-zinc-900 bg-zinc-50
                     transition-transform duration-200 
                     flex items-center justify-center gap-2
                     shadow-[4px_4px_0_0_rgba(0,0,0,0.9)]
                     hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.9)]
                     active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_0_rgba(0,0,0,0.9)]"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
      </motion.div>
    </div>
  )
}
