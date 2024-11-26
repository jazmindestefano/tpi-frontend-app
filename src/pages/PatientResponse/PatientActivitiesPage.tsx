import { ActivityCard, BackButton } from '@components'
import { useGetPatientActivityAnswers } from '@hooks'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PatientActivitiesPage: FC = () => {
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
        <div className="flex flex-col items-start justify-start gap-4 pt-10 px-10">
          <div>
            <BackButton text="Volver al tablero" route={`/profesional/paciente/${patientId}`} />
            <h2 className="text-2xl font-extrabold mb-4">Actividades</h2>
            <div className="flex w-full gap-10 pt-5">
              {data.length > 0 ? (
                data.map((actividad) => <ActivityCard key={actividad.gameId} activity={actividad} />)
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
