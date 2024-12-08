import { useParams } from 'react-router-dom'
import { Loader, BackButton, Button } from '@components'
import { useTimeline } from '@hooks'

const Timeline = () => {
  const { patientId } = useParams()
  const { data, error, isLoading, readyToFetch, setSelectedDate, setSelectedGameName } = useTimeline({ patientId })

  if (!readyToFetch || isLoading) {
    return <Loader />
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500" data-testid="error-message">
        {error?.message || 'Error al cargar datos'}
      </div>
    )
  }

  return (
    <div className="container p-10 w-full" data-testid="timeline-container">
      <BackButton
        dataTestId="timeline-back-button"
        text="Volver al tablero"
        route={`/profesional/paciente/${patientId}`}
      />
      <h1 className="text-3xl font-bold mb-8 text-gray-800" data-testid="timeline-title">
        Línea de tiempo de actividades
      </h1>
      <div className="relative space-y-6 pl-[9%]" data-testid="timeline-list">
        <div className="absolute left-[5%] top-[24px] bottom-0 w-0.5 bg-blue-300"></div>
        {data.flat().map((activity) => (
          <div
            key={`${activity.date}-${activity.gameDescription}`}
            className="relative bg-white rounded-lg shadow-sm p-6 transition-all duration-300 ease-in-out transform hover:shadow-md hover:-translate-y-1 w-full"
            data-testid={`activity-${activity.date}-${activity.gameDescription}`}
          >
            <div className="absolute left-[-5%] top-6 w-6 h-6 bg-blue-500 rounded-full border-4 border-white z-10"></div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {new Date(activity.date).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h2>
            <ul className="space-y-3 w-full">
              <li
                className="flex justify-between items-center text-gray-600 hover:bg-gray-50 p-2 rounded-md transition-colors duration-200 w-full"
                data-testid={`activity-item-${activity.date}`}
              >
                <span className="capitalize">{activity.gameDescription}</span>
                <div className="flex gap-4 items-center justify-center">
                  <span className="font-medium px-3 py-1">
                    Jugó {activity.playedTimes} {activity.playedTimes === 1 ? 'vez' : 'veces'}
                  </span>
                  <Button
                    dataTestId="timeline-detail-button"
                    className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full hover:bg-blue-100"
                    onClick={() => {
                      setSelectedDate(activity.date)
                      setSelectedGameName(activity.gameDescription)
                    }}
                  >
                    Ver detalle
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline
