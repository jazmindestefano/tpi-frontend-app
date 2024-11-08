import BackButton from '../../components/common/buttons/BackButton'
import { useNavigate, useParams } from 'react-router-dom'
import SpinnerLoader from '@components/common/SpinnerLoader'
import { formatDate } from '@helpers/date'
import { useTimeline } from '@hooks'

export default function Timeline() {
  const { patientId } = useParams()
  const navigate = useNavigate()
  const { gameId, data, error, isLoading, readyToFetch } = useTimeline({ patientId })

  if (!readyToFetch || isLoading) {
    return <SpinnerLoader />
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error?.message || 'Error al cargar datos'}
      </div>
    )
  }

  return (
    <div className="container pb-10 w-full">
      <BackButton text="Volver al Dashboard" route={`/profesional/paciente/${patientId}`} />
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Línea de Tiempo de Actividades</h1>
      <div className="relative space-y-6 pl-[9%]">
        <div className="absolute left-[5%] top-[24px] bottom-0 w-0.5 bg-blue-300"></div>

        {data.flat().map((activity) => (
          <div
            key={`${activity.date}-${activity.gameDescription}`}
            className="relative bg-white rounded-lg shadow-sm p-6 transition-all duration-300 ease-in-out transform hover:shadow-md hover:-translate-y-1"
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
            <ul className="space-y-3">
              <li className="flex justify-between items-center text-gray-600 hover:bg-gray-50 p-2 rounded-md transition-colors duration-200">
                <span className="capitalize">{activity.gameDescription}</span>
                <div className="flex gap-4 items-center justify-center">
                  <span className="font-medium px-3 py-1">
                    Jugó {activity.playedTimes} {activity.playedTimes === 1 ? 'vez' : 'veces'}
                  </span>
                  <button
                    className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full"
                    onClick={() => {
                      const formattedDate = formatDate(activity.date)
                      navigate(`/profesional/paciente/${patientId}/actividades/${gameId}/${formattedDate}`)
                    }}
                  >
                    Ver detalle
                  </button>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
