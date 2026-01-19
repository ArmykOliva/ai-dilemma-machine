/**
 * Home Page
 * 
 * Simple landing page demonstrating:
 * - Framer Motion animations
 * - shadcn/ui components (Card, Button)
 * - Lucide icons
 */

import { useState } from 'react'
import { motion } from 'motion/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Sparkles, Zap, Shield, Rocket } from 'lucide-react'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

/**
 * Home Page Component
 */
const HomePage = () => {
  const [count, setCount] = useState(0)

  // Features to showcase
  const features = [
    { icon: Zap, title: 'Fast Development', description: 'Built with Vite for instant HMR' },
    { icon: Shield, title: 'Type Safe', description: 'Full TypeScript support with OpenAPI types' },
    { icon: Sparkles, title: 'Modern UI', description: 'Beautiful components with Tailwind CSS' },
    { icon: Rocket, title: 'Production Ready', description: 'Optimized build with best practices' },
  ]

  const featuresList = [
    'Automatic browser language detection',
    'Fallback to English for unsupported languages',
    'State management with Zustand',
    'Works seamlessly with Docker setup',
  ]

  return (
    <motion.div
      className="max-w-6xl mx-auto space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="text-center space-y-4">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
          Welcome to our application
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A modern, full-stack boilerplate with React, TypeScript, Zustand, React Router, and FastAPI backend.
        </p>
      </motion.div>

      {/* Interactive Counter Demo */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Counter Example</CardTitle>
            <CardDescription>
              Demonstrating Zustand state management and Framer Motion animations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={() => setCount(count + 1)}
                  className="min-w-[200px]"
                >
                  <motion.span
                    key={count}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Count is {count}
                  </motion.span>
                </Button>
              </motion.div>
              
              {count > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Button variant="outline" onClick={() => setCount(0)}>
                    Reset
                  </Button>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Features Grid */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Tech Stack Highlights</CardTitle>
            <CardDescription>Everything you need for a modern web application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="mt-1">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Included Features List */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>Batteries included</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {featuresList.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default HomePage
