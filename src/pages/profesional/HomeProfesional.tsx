import HomeProfesionalCard from "../../components/common/cards/ProfesionalHomeCard";

interface Patient {
  id: number;
  name: string;
  imageUrl: string;
  age: number;
}

const patients: Patient[] = [
  { id: 1, name: 'JUAN', imageUrl: '/avatar/horse-avatar.png', age: 7 },
  { id: 2, name: 'PEDRO', imageUrl: '/avatar/lion-avatar.png', age: 5 },
  { id: 3, name: 'MARIELA', imageUrl: '/avatar/rabbit-avatar.png', age: 8 },
  { id: 4, name: 'JUANA', imageUrl: '/avatar/horse-avatar.png', age: 4 },
  { id: 5, name: 'JORGE', imageUrl: '/avatar/rabbit-avatar.png', age: 7 },
];

export default function HomeProfesional() {
  return (
    <div className="flex flex-col items-start justify-start gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Hola, Juliana!</h1>
          <p className="text-gray-500">18 de Octubre 2024, Miércoles</p>
        </div>
      </div>
        <div>
            <h2 className="text-xl font-semibold mb-4">Pacientes</h2>
            <div className="flex flex-wrap gap-10 lg:px-10 lg:py-6">
                <HomeProfesionalCard isAddPatient={true} />
                {patients.map((patient) => (
                <HomeProfesionalCard key={patient.id} patient={patient} />
                ))}
            </div>
        </div>
    </div>
  );
}
