import { getCurrentDate } from '@/helpers'
import { useWhatHappenedTodayDashboard } from '@/hooks/queries'
import SpinnerLoader from '@components/common/SpinnerLoader'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Today = () => {
  const { patientId } = useParams()
  const [readyToFetch, setReadyToFetch] = useState(false)
  const navigate = useNavigate()
  const { data, isLoading, error } = useWhatHappenedTodayDashboard(readyToFetch ? Number(patientId) : 0)

  useEffect(() => {
    if (patientId) {
      setReadyToFetch(true)
    }
  }, [patientId])

  const handleClick = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
    navigate(`/profesional/paciente/${patientId}/timeline`)
  }

  if (isLoading) {
    return <SpinnerLoader />
  }

  return (
    <div className="bg-slate-50 p-10 rounded-3xl bg-opacity-65 h-80">
      <h2 className="text-2xl mb-2">¿Qué pasó hoy?</h2>
      <p className="text-gray-600 mb-2">{getCurrentDate()}</p>
      <div className="flex justify-between mb-4 flex-grow">
        {!error &&
          !isLoading &&
          data.length > 0 &&
          data.map((activity, index) => (
            <div key={index} className="bg-blue-100 rounded-lg w-[30%] text-center flex flex-col justify-center p-4">
              <h3 className="font-semibold mb-1 text-2xl">{activity.gameDescription}</h3>
              <p className="text-2xl font-bold">{activity.playedTimes}</p>
              <p className="text-md text-gray-600">actividades completadas</p>
            </div>
          ))}
      </div>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center justify-center w-full cursor-pointer"
      >
        <p>Ver más</p>
        <ArrowRight className="ml-2" size={20} />
      </button>
    </div>
  )
}

export default Today
