import BackButton from '@/components/common/buttons/BackButton'
import { ActivityCard } from '@/components/common/cards/ActivityCard'
import { useGetPatientActivityAnswers } from '@/hooks/queries'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PatientActivitiesPage = () => {
  const { patientId } = useParams()
  const [readyToFetch, setReadyToFetch] = useState(false)
  const { data, error, isLoading } = useGetPatientActivityAnswers(readyToFetch ? Number(patientId) : 0)

  useEffect(() => {
    if (patientId) {
      setReadyToFetch(true)
    }
  }, [patientId])

  if (error) {
    return <p>Ups! Ha ocurrido un error</p>
  }

  return (
    <>
      {!error && !isLoading && data ? (
        <div className="flex flex-col items-start justify-start gap-4 lg:p-4 pt-20">
          <div>
            <BackButton text="Volver al Dashboard" route="/profesional/paciente/1" />
            <h2 className="text-2xl font-extrabold mb-4">Actividades</h2>
            <div className="flex w-full gap-10 lg:px-10 lg:py-6">
              {data.length > 0 ? (
                data.map((actividad) => <ActivityCard key={actividad.gameid} activity={actividad} />)
              ) : (
                <p className="text-blue-500 font-bold">No hay actividades disponibles</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <p className="text-2xl font-bold">No hay actividades disponibles</p>
        </div>
      )}
    </>
  )
}

export default PatientActivitiesPage
