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
  // Generate random nodes
  /*const nodes = useMemo<Node[]>(() => {
    const colors: Node['color'][] = ['magenta', 'orange', 'cyan']
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
  }, [])

  const colorMap = {
    magenta: 'rgba(209, 186, 214, 0.8)',
    orange: 'rgba(181, 173, 209, 0.8)',
    cyan: 'rgba(188, 217, 221, 0.8)',
  }

  const glowMap = {
    magenta: '0 0 20px rgba(217, 173, 226, 0.8), 0 0 40px rgba(181, 158, 192, 0.4)',
    orange: '0 0 20px rgba(188, 178, 223, 0.8), 0 0 40px rgba(188, 178, 224, 0.4)',
    cyan: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(133, 190, 199, 0.4)',
  }*/

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-300/80 via-white to-blue-300/80" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(209, 209, 209, 0.85) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 39, 131, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
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