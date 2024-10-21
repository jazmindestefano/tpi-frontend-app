import { useState, useEffect } from 'react'

export default function ProgressBar({
  currentActivity = 0,
  totalActivities = 1,
  width = 400,
  height = 20
}: {
  currentActivity?: number
  totalActivities?: number
  width?: number
  height?: number
}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const validTotalActivities = totalActivities > 0 ? totalActivities : 1
    const newProgress = Math.min(Math.max((currentActivity / validTotalActivities) * 100, 0), 100)
    setProgress(newProgress)
  }, [currentActivity, totalActivities])

  return (
    <div
      style={{ position: 'relative', width: width, height: height }}
      className="mb-10"
      data-testid="progressbar-container"
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#e7e7e7',
          borderRadius: '10px',
          overflow: 'hidden'
        }}
        role="progressbar"
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#f2c160',
            transition: 'width 0.3s ease-in-out' // Suaviza la transición del progreso
          }}
        />
      </div>

      <img
        src="/c.svg"
        alt="clara"
        style={{
          position: 'absolute',
          top: -30,
          left: `calc(${progress}% - 20px)`,
          transition: 'left 0.3s ease-in-out',
          height: height * 4
        }}
      />
    </div>
  )
}
