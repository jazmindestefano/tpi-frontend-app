import { FC, ReactNode, useRef } from 'react'
import { TimerContext } from './TimerContext'

const TimerProvider: FC<{ children: ReactNode }> = ({ children }) => {
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

  const value = {
    getElapsedTime,
    getStartTime,
    startTimer,
    stopTimer
  }

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
}

export default TimerProvider
