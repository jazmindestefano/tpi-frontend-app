import BackButton from '@/components/common/buttons/BackButton'
import { Activity, ActivityCard } from '@/components/common/cards/ActivityCard'

const activities: Activity[] = [
  { id: 1, name: 'Palabras' },
  { id: 2, name: 'Letras' },
  { id: 3, name: 'La viborita' }
]

const PatientActivitiesPage = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 lg:p-4 pt-20">
      <div>
        <BackButton text="Volver al Dashboard" route="/profesional/paciente/1" />
        <h2 className="text-2xl font-extrabold mb-4">Actividades</h2>
        <div className="flex flex-wrap gap-10 lg:px-10 lg:py-6">
          {activities.length > 0 ? (
            activities.map((actividad) => <ActivityCard key={actividad.id} activity={actividad} />)
          ) : (
            <p className="text-blue-500 font-bold">No hay actividades disponibles</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PatientActivitiesPage
