import { FC, useEffect, useState } from 'react'

interface TimerProps {
  duration: number
  text?: string
  onTimeout: () => void
}

const Timer: FC<TimerProps> = ({ duration, onTimeout, text }) => {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout()
      return
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [timeLeft, onTimeout])

  return (
    <div className={'flex justify-center items-center'}>
      <p className={'font-comfortaa text-2xl'}>
        {text}
        {timeLeft}
      </p>
    </div>
  )
}

export default Timer
