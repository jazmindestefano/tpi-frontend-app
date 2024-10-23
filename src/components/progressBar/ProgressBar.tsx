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
    // Calculamos el progreso en porcentaje
    const newProgress = Math.min(Math.max((currentActivity / totalActivities) * 100, 0), 100)
    setProgress(newProgress)
  }, [currentActivity, totalActivities])

  return (
    <div style={{ position: 'relative', width: width, height: height }} className="mb-10">
      {/* Barra de fondo */}
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#e7e7e7',
          borderRadius: '10px',
          overflow: 'hidden'
        }}
      >
        {/* Barra de progreso que se rellena */}
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#f2c160',
            transition: 'width 0.3s ease-in-out' // Suaviza la transición del progreso
          }}
        />
      </div>

      {/* Imagen que se mueve a lo largo de la barra */}
      <img
        src="/c.svg"
        alt="clara"
        style={{
          position: 'absolute',
          top: -30, // Para que la imagen quede centrada sobre la barra
          left: `calc(${progress}% - 20px)`, // Centra la imagen
          transition: 'left 0.3s ease-in-out', // Suaviza la transición
          height: height * 4 // Ajusta el tamaño de la imagen en función del alto de la barra
        }}
      />
    </div>
  )
}
