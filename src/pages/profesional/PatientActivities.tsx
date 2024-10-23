import { Activity, ActivityCard } from '../../components/common/cards/ActivityCard'

const actividades: Activity[] = [
  { id: 1, name: 'Palabras' },
  { id: 2, name: 'Letras' },
  { id: 3, name: 'La viborita' }
]

export default function PatientActivities() {
  return (
    <div className="flex flex-col items-start justify-start gap-4">
      <div>
        <h2 className="text-2xl font-extrabold mb-4">Actividades</h2>
        <div className="flex flex-wrap gap-10 lg:px-10 lg:py-6">
          {actividades.length > 0 ? (
            actividades.map((actividad) => <ActivityCard key={actividad.id} actividad={actividad} />)
          ) : (
            <p className="text-blue-500 font-bold">No hay actividades disponibles</p>
          )}
        </div>
      </div>
    </div>
  )
}
