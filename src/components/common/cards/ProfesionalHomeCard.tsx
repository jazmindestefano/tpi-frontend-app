import React from "react";
import { PlusIcon } from "lucide-react";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";

interface Patient {
  id?: number;
  name?: string;
  imageUrl?: string;
  age?: number;
}

interface HomeProfesionalCardProps {
  patient?: Patient;
  isAddPatient?: boolean;
  className?: string;
}

const HomeProfesionalCard: React.FC<HomeProfesionalCardProps> = ({
  patient,
  isAddPatient = false,
  className = '',
}) => {
  const navigate = useNavigate();

  return (
    <div className={`"max-w-96 flex-col-center rounded-3xl h-80 w-72 shadow-lg cursor-pointer transition-transform duration-300 bg-blue-100 " ${className}`}>
      {isAddPatient ? (
        <div className="flex flex-col items-center justify-center p-4 gap-10">
          <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mb-2">
            <PlusIcon className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-blue-500 font-bold">Agregar paciente</p>
        </div>
      ) : (
        patient && (
          <div className="flex-col-center p-4 gap-2">
            <img
              src={patient.imageUrl}
              alt={patient.name}
              width={64}
              height={64}
              className="rounded-full mb-2"
            />
            <h3 className="text-lg font-medium text-blue-800">{patient.name}</h3>
            <p className="text-blue-600">{patient.age} años</p>
            <Button variant="secondary" className="mt-2 p-3 rounded-3xl" onClick={() => navigate("profesional/paciente/:id")}>
                <p className="text-center font-bold">Ver paciente</p>
            </Button>
          </div>
        )
      )}
    </div>
  );
};

export default HomeProfesionalCard;
