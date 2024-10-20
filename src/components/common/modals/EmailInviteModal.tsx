import React, { useState } from 'react'
import { BaseModal } from './BaseModal' // Asegúrate de que la ruta sea la correcta
import { Overlay } from '../overlay/Overlay'
import { Input } from '../inputs/Input'

interface AddPatientModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (patientData: PatientData) => void
}

interface PatientData {
  childName: string
  guardianName: string
  guardianEmail: string
  childAge: string
}

export default function AddPatientModal({ isOpen, onClose, onSubmit }: AddPatientModalProps) {
  const [patientData, setPatientData] = useState<PatientData>({
    childName: '',
    guardianName: '',
    guardianEmail: '',
    childAge: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPatientData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(patientData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <Overlay show={isOpen} onClose={onClose}>
      <BaseModal title="Agregar Paciente" onClose={onClose} speak={false} className="gap-10 p-16 rounded-3xl">
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
          <div>
            <label htmlFor="childName" className="block text-sm font-medium text-gray-700">
              Nombre y apellido del niño/a *
            </label>
            <Input
              name={'childName'}
              onChange={handleChange}
              id="childName"
              value={patientData.childName}
              required={true}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700">
              Nombre y apellido del tutor *
            </label>
            <Input
              name={'guardianName'}
              onChange={handleChange}
              id="guardianName"
              value={patientData.guardianName}
              required={true}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="guardianEmail" className="block text-sm font-medium text-gray-700">
              Email del tutor *
            </label>
            <Input
              name={'guardianEmail'}
              type="email"
              onChange={handleChange}
              id="guardianEmail"
              value={patientData.guardianEmail}
              required={true}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="childAge" className="block text-sm font-medium text-gray-700">
              Edad del niño/a *
            </label>
            <Input
              name={'childAge'}
              type="number"
              onChange={handleChange}
              id="childAge"
              value={patientData.childAge}
              required={true}
              className="w-full"
            />
          </div>
          <button
            type="submit"
            className="w-[50%] self-center bg-blue-600 hover:bg-blue-600 text-white py-2 rounded-md"
          >
            Invitar
          </button>
        </form>
      </BaseModal>
    </Overlay>
  )
}
