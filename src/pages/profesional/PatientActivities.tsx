import { Activity, ActivityCard } from "../../components/common/cards/ActivityCard";

const actividades: Activity[] = [
  { id: 1, name: "Actividad A" },
  { id: 2, name: "Actividad B" },
  { id: 3, name: "Actividad C" },
];

export default function PatientActivities() {
  return (
    <div className="flex flex-col items-start justify-start gap-4">
      <div>
        <h2 className="text-xl font-semibold mb-4">Actividades</h2>
        <div className="flex flex-wrap gap-10 lg:px-10 lg:py-6">
          {actividades.length > 0 ? (
            actividades.map((actividad) => (
              <ActivityCard key={actividad.id} actividad={actividad} />
            ))
          ) : (
            <p className="text-blue-500 font-bold">No hay actividades disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
}
