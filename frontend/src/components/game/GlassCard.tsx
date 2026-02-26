/**
 * GlassCard - Glassmorphism styled card component
 */
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  glowColor?: 'blue' | 'purple' | 'cyan' | 'none'
}

export const GlassCard = ({ children, className, glowColor = 'none' }: GlassCardProps) => {
  const glowStyles = {
    blue: 'shadow-blue-500/10 border-blue-500/20',
    purple: 'shadow-purple-500/10 border-purple-500/20',
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
