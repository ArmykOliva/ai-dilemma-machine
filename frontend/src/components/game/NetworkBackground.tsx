/**
 * NetworkBackground - Animated glowing network nodes
 * 
 * Creates the "organic geometry" aesthetic with pulsing nodes and filaments.
 */
/*import { motion } from 'motion/react'
import { useMemo } from 'react'

interface Node {
  id: number
  x: number
  y: number
  size: number
  delay: number
  color: 'magenta' | 'orange' | 'cyan'
}*/

export const NetworkBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base paper-ish gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-300 via-zinc-100 to-zinc-300" />

      {/* Charcoal smudge blobs */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `
            radial-gradient(circle at 0 0, rgba(0,0,0,0.12), transparent 60%),
            radial-gradient(circle at 100% 0, rgba(0,0,0,0.09), transparent 55%),
            radial-gradient(circle at 0 100%, rgba(0,0,0,0.08), transparent 55%),
            radial-gradient(circle at 100% 100%, rgba(0,0,0,0.10), transparent 60%)
          `,
          backgroundSize: '120% 120%',
          filter: 'blur(1px)',
        }}
      />

      {/* Fine graphite grain */}
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage: `
            linear-gradient(120deg, rgba(0,0,0,0.15) 1px, transparent 1px),
            linear-gradient(210deg, rgba(0,0,0,0.12) 1px, transparent 1px)
          `,
          backgroundSize: '6px 6px',
        }}
      />
    </div>
  )
}

/*{ Animated nodes }
      {nodes.map(node => (
        <motion.div
          key={node.id}
          className="absolute rounded-full"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size * 8,
            height: node.size * 8,
            backgroundColor: colorMap[node.color],
            boxShadow: glowMap[node.color],
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3 + node.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: node.delay,
          }}
        />
      ))}

      { Connecting lines (SVG) }
      <svg className="absolute inset-0 w-full h-full opacity-20">
        {nodes.slice(0, 10).map((node, i) => {
          const nextNode = nodes[(i + 3) % nodes.length]
          return (
            <motion.line
              key={`line-${i}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${nextNode.x}%`}
              y2={`${nextNode.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          )
        })}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(228, 128, 178, 0.5)" />
            <stop offset="100%" stopColor="rgba(209, 160, 120, 0.5)" />
          </linearGradient>
        </defs>
      </svg> */