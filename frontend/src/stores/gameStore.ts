/**
 * Game Store - Zustand state management for the AI Dilemma Machine
 */
import { create } from 'zustand'
import { apiClient } from '@/lib/api'
import dilemmasData from '@/data/dilemmas.json'

export type GamePhase = 'intro' | 'playing' | 'result' | 'summary'

export interface DilemmaOption {
  id: string
  label: string
  shortText: string
  description: string
}

export interface Dilemma {
  id: string
  title: string
  context: string
  picture: string
  options: DilemmaOption[]
}

export interface PlayerChoice {
  dilemmaId: string
  choice: string
  percentageSame: number
}

interface GameState {
  // Session
  sessionId: string | null
  isLoading: boolean
  error: string | null
  
  // Game progress
  phase: GamePhase
  currentDilemmaIndex: number
  dilemmas: Dilemma[]
  
  // Choices
  choices: PlayerChoice[]
  lastChoicePercentage: number | null
  
  // Actions
  startGame: () => Promise<void>
  selectChoice: (choice: string) => Promise<void>
  nextDilemma: () => void
  completeGame: () => Promise<void>
  resetGame: () => void
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  sessionId: null,
  isLoading: false,
  error: null,
  phase: 'intro',
  currentDilemmaIndex: 0,
  dilemmas: dilemmasData.dilemmas as Dilemma[],
  choices: [],
  lastChoicePercentage: null,

  startGame: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data, error } = await apiClient.POST('/game/sessions')
      if (error) throw new Error('Failed to create session')
      set({
        sessionId: data.id,
        phase: 'playing',
        currentDilemmaIndex: 0,
        choices: [],
        isLoading: false,
      })
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false })
    }
  },

  selectChoice: async (choice: string) => {
    const { sessionId, dilemmas, currentDilemmaIndex } = get()
    if (!sessionId) return
    
    const currentDilemma = dilemmas[currentDilemmaIndex]
    set({ isLoading: true, error: null })
    
    try {
      const { data, error } = await apiClient.POST('/game/sessions/{session_id}/choices', {
        params: { path: { session_id: sessionId } },
        body: {
          dilemma_id: currentDilemma.id,
          choice: choice,
        },
      })
      
      if (error) throw new Error('Failed to record choice')
      
      const newChoice: PlayerChoice = {
        dilemmaId: currentDilemma.id,
        choice: choice,
        percentageSame: data.percentage_same,
      }
      
      set(state => ({
        choices: [...state.choices, newChoice],
        lastChoicePercentage: data.percentage_same,
        phase: 'result',
        isLoading: false,
      }))
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false })
    }
  },

  nextDilemma: () => {
    const { currentDilemmaIndex, dilemmas } = get()
    if (currentDilemmaIndex < dilemmas.length - 1) {
      set({
        currentDilemmaIndex: currentDilemmaIndex + 1,
        phase: 'playing',
        lastChoicePercentage: null,
      })
    } else {
      // All dilemmas completed, go to summary
      get().completeGame()
    }
  },

  completeGame: async () => {
    const { sessionId } = get()
    if (!sessionId) return
    
    set({ isLoading: true })
    try {
      await apiClient.POST('/game/sessions/{session_id}/complete', {
        params: { path: { session_id: sessionId } },
      })
      set({ phase: 'summary', isLoading: false })
    } catch {
      // Even if API fails, still show summary
      set({ phase: 'summary', isLoading: false })
    }
  },

  resetGame: () => {
    set({
      sessionId: null,
      isLoading: false,
      error: null,
      phase: 'intro',
      currentDilemmaIndex: 0,
      choices: [],
      lastChoicePercentage: null,
    })
  },
}))
