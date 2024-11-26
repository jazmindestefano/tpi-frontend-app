import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { usePostPatient, useCurrentUser } from '@hooks'
import { BaseModal, Input, Overlay } from '@components'

interface AddPatientModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (patientData: PatientData) => void
}

interface PatientData {
  childName: string
  guardianEmail: string
  childBirthDate: string
  childSurname: string
}

const AddPatientModal: FC<AddPatientModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [patientData, setPatientData] = useState<PatientData>({
    childName: '',
    guardianEmail: '',
    childBirthDate: '',
    childSurname: ''
  })
  const { mutate, isSuccess } = usePostPatient()
  const user = useCurrentUser()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPatientData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(patientData)
    mutate({
      name: patientData.childName,
      surname: patientData.childSurname,
      email: patientData.guardianEmail,
      birthDate: patientData.childBirthDate,
      professionalId: user.id
    })
    onClose()
  }

  useEffect(() => {
    if (isSuccess) {
      setPatientData({
        childName: '',
        guardianEmail: '',
        childBirthDate: '',
        childSurname: ''
      })
    }
  }, [isSuccess])

  if (!isOpen) return null

  return (
    <Overlay show={isOpen} onClose={onClose}>
      <BaseModal title="Agregar Paciente" onClose={onClose} className="gap-10 rounded-3xl bg-white" hearable={false}>
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col w-96">
          <div>
            <label htmlFor="childName" className="block text-sm font-medium text-gray-700">
              Nombre del niño/a *
            </label>
            <Input
              name={'childName'}
              onChange={handleChange}
              id="childName"
              value={patientData.childName}
              required={true}
              className="w-full bg-slate-200"
            />
          </div>
          <div>
            <label htmlFor="childSurname" className="block text-sm font-medium text-gray-700">
              Apellido del niño/a *
            </label>
            <Input
              name={'childSurname'}
              onChange={handleChange}
              id="childSurname"
              value={patientData.childSurname}
              required={true}
              className="w-full bg-slate-200"
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
              className="w-full bg-slate-200"
            />
          </div>
          <div>
            <label htmlFor="childBirthDate" className="block text-sm font-medium text-gray-700">
              Fecha de nacimiento del niño/a *
            </label>
            <Input
              name={'childBirthDate'}
              type="date"
              onChange={handleChange}
              id="childBirthDate"
              value={patientData.childBirthDate}
              required={true}
              className="w-full bg-slate-200"
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

export default AddPatientModal
