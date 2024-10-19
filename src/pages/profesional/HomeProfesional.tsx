interface Patient {
  id: number;
  name: string;
  imageUrl: string;
}

const patients: Patient[] = [
  { id: 1, name: 'JUAN', imageUrl: '/avatar/horse-avatar.png' },
  { id: 2, name: 'PEDRO', imageUrl: '/avatar/lion-avatar.png' },
  { id: 3, name: 'MARIELA', imageUrl: '/avatar/rabbit-avatar.png' },
  { id: 4, name: 'JUANA', imageUrl: '/avatar/horse-avatar.png' },
  { id: 5, name: 'JORGE', imageUrl: '/avatar/rabbit-avatar.png' },
];

export default function HomeProfesional() {
  return (
    <div>
      <div className="flex flex-col justify-center items-start mb-6">
        <h1 className="text-2xl font-bold">Hola, XXXX!</h1>
        <p>28 de Septiembre 2024, Sabado</p>
      </div>
      <h2 className="text-xl font-semibold mb-4">Pacientes</h2>
      <div className="space-y-4">
        {patients.map((patient) => (
          <div key={patient.id} className="flex items-center bg-orange-300 rounded-3xl p-4 text-white">
            <img
              src={patient.imageUrl}
              alt={patient.name}
              width={40}
              height={40}
              className="rounded-full mr-4"
            />
            <span className="text-lg font-medium">{patient.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
