import { useState, useEffect } from 'react'
import BackButton from '../../components/common/buttons/BackButton'
import { useGetPatientActivityAnswers, useTimelineData } from '@/hooks/queries'
import { useNavigate, useParams } from 'react-router-dom'
import { PatientActivityAnswers } from '@interfaces'
import SpinnerLoader from '@components/common/SpinnerLoader'

interface Game {
  gameId: number
  gameName: string
}

const createActivitiesDto = (data: PatientActivityAnswers[]) => {
  return data.map((activity) => ({
    gameId: activity.gameid,
    gameName: activity.gameName
  }))
}

const findByGameName = (name: string, activities: Game[]) => {
  return activities.find((activity) => activity.gameName === name)
}

export default function Timeline() {
  const { patientId } = useParams()
  const [readyToFetch, setReadyToFetch] = useState(false)
  const { data, isLoading, error } = useTimelineData(readyToFetch ? Number(patientId) : 0)
  const {
    data: acts,
    error: actsErr,
    isLoading: actsLoading
  } = useGetPatientActivityAnswers(readyToFetch ? Number(patientId) : 0)
  const navigate = useNavigate()
  const [activities, setActivities] = useState<Game[]>([])
  const [gameId, setGameId] = useState<number>(0)

  useEffect(() => {
    if (patientId) {
      setReadyToFetch(true)
      if (acts && !actsErr && !actsLoading) {
        setActivities(createActivitiesDto(acts || []))
      }
    }
  }, [patientId, acts, actsErr, actsLoading])

  useEffect(() => {
    if (activities) {
      const game = findByGameName('La Viborita', activities)
      if (game) {
        setGameId(game.gameId)
      }
    }
  }, [activities])

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
    <div className="container p-4 pb-40 w-full">
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
                      navigate(`/profesional/paciente/${patientId}/actividades/${gameId}`)
                      localStorage.setItem('selectedDate', activity.date)
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
