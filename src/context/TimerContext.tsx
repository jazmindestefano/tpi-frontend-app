import { createContext, FC, ReactNode, useRef } from 'react'

interface TimerContextType {
  getElapsedTime: () => number
  getStartTime: () => number
  startTimer: () => void
  stopTimer: () => void
}

// Create the context
export const TimerContext = createContext<TimerContextType>({
  getElapsedTime: () => 0,
  getStartTime: () => 0,
  startTimer: () => {},
  stopTimer: () => {}
})

// Provider component
const TimerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Start timer function
  const elapsedTimeRef = useRef<number>(0) // Stores the elapsed time in seconds
  const startTimeRef = useRef<number>(0) // Stores the timestamp when the timer started
  const timerRef = useRef<NodeJS.Timeout | null>(null) // Interval ID for controlling the timer

  const startTimer = () => {
    if (!timerRef.current) {
      startTimeRef.current = Date.now() // Record the start time
      timerRef.current = setInterval(() => {
        elapsedTimeRef.current += 1000 // Increment elapsed time every second
      }, 1000)
    }
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
      elapsedTimeRef.current = 0 // Reset elapsed time to 0
      startTimeRef.current = 0 // Clear start time
    }
  }

  const getElapsedTime = () => elapsedTimeRef.current // Retrieve elapsed time for backend

  const getStartTime = () => startTimeRef.current // Retrieve start time if needed

  // Provide timer context value
  const value = {
    getElapsedTime,
    getStartTime,
    startTimer,
    stopTimer
  }

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
}

export default TimerProvider
