import useTimeline from '../../hooks/useTimeline'
import BackButton from '../../components/common/buttons/BackButton'

export default function Timeline() {
  const { activities, visibleActivities, lastActivityRef, isLoading, error } = useTimeline()

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="container p-4 pb-40 min-h-screen">
      <BackButton text="Volver al Dashboard" route="/profesional/paciente/1" />
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Línea de Tiempo de Actividades</h1>
      <div className="relative space-y-6 pl-[9%]">
        <div className="absolute left-[5%] top-[24px] bottom-0 w-0.5 bg-blue-300"></div>
        {visibleActivities.map((day, index) => (
          <div
            key={day.date}
            className="relative bg-white rounded-lg shadow-sm p-6 transition-all duration-300 ease-in-out transform hover:shadow-md hover:-translate-y-1"
            ref={index === visibleActivities.length - 1 ? lastActivityRef : null}
          >
            <div className="absolute left-[-5%] top-6 w-6 h-6 bg-blue-500 rounded-full border-4 border-white z-10"></div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {new Date(day.date).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h2>
            <ul className="space-y-3">
              {day.activities.map((activity, actIndex) => (
                <li
                  key={actIndex}
                  className="flex justify-between items-center text-gray-600 hover:bg-gray-50 p-2 rounded-md transition-colors duration-200"
                >
                  <span className="capitalize">{activity.name}s</span>
                  <div className="flex gap-4 items-center justify-center">
                    <span className="font-medium px-3 py-1">
                      Jugó {activity.count} {activity.count === 1 ? 'vez' : 'veces'}
                    </span>
                    <button className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full">Ver detalle</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {visibleActivities.length < activities.length && (
        <div className="flex justify-center mt-8 mb-16">
          <div className="animate-pulse text-blue-500">Cargando más actividades...</div>
        </div>
      )}
      <div className="h-32 bg-gradient-to-t from-white to-transparent fixed bottom-0 left-0 right-0 pointer-events-none"></div>
    </div>
  )
}