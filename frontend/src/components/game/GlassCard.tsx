/**
 * GlassCard - Glassmorphism styled card component
 */
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  glowColor?: 'pink' | 'orange' | 'cyan' | 'none'
}

export const GlassCard = ({ children, className, glowColor = 'none' }: GlassCardProps) => {
  const glowStyles = {
    pink: 'shadow-pink-500/10 border-pink-500/20',
    orange: 'shadow-orange-500/10 border-orange-500/20',
    cyan: 'shadow-cyan-500/10 border-cyan-500/20',
    none: 'border-white/10',
  }

  return (
    <div
      className={cn(
        'relative backdrop-blur-xl bg-white/5 rounded-2xl border p-8',
        'shadow-2xl',
        glowStyles[glowColor],
        className
      )}
    >
      {/* Content */}
      {children}
    </div>
  )
}
