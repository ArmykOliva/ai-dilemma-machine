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
  return (
    <div
      className={cn(
        'relative rounded-xl border-2 border-zinc-900/80 bg-zinc-50 p-6 text-zinc-900',
        'shadow-[6px_6px_0_0_rgba(0,0,0,0.85)]',
        '-rotate-[0.4deg] hover:rotate-0 transition-transform duration-200',
        className
      )}
    >
      {children}
    </div>
  )
}
