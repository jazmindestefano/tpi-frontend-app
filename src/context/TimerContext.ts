import { createContext } from 'react'

interface TimerContextType {
  getElapsedTime: () => number
  getStartTime: () => number
  startTimer: () => void
  stopTimer: () => void
}

export const TimerContext = createContext<TimerContextType>({
  getElapsedTime: () => 0,
  getStartTime: () => 0,
  startTimer: () => {},
  stopTimer: () => {}
})
