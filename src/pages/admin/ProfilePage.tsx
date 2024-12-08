import { HearableButton, Button } from '@components'
import { Pencil, Save } from 'lucide-react'
import { useState, useEffect, ChangeEvent, FC } from 'react'
import { useGetProfileData, useUpdateProfileData, useCurrentUser, useSelectAvatar } from '@hooks'
import { ProfileData, RoleEnum } from '@interfaces'
import ImageSelectionModal from './ImageSelectionModal'

const ProfilePage: FC = () => {
  const user = useCurrentUser()
  const { data, error, isLoading } = useGetProfileData(user.id, user.role)
  const { mutate: updateProfile } = useUpdateProfileData()
  const { mutate: updateAvatar } = useSelectAvatar()
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    surname: '',
    email: '',
    image: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        surname: data.surname,
        email: data.email,
        image: data.image
      })
    }
  }, [data])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading profile data.</p>

  const handleSave = () => {
    updateProfile({ id: user.id, role: user.role, data: formData })
    setIsEditing(false)
  }

  const handleSelectImage = (avatarId: number) => {
    updateAvatar({ patientId: user.id, avatarId })
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="flex justify-center items-center w-full gap-4 mb-6">
        <h1 className="text-h1">Perfil</h1>
        {user.role === RoleEnum.PATIENT && <HearableButton variant={'secondary'} text={'Este es tu perfil'} />}
      </div>
      <div className="flex flex-col justify-center items-center w-[75%] h-[75%] rounded-xl border shadow-lg py-8 bg-slate-50">
        <div className="flex flex-row justify-end items-end sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="w-full flex justify-center items-center">
            <div className="overflow-hidden flex justify-center items-center">
              <img
                src={user.image ?? '/avatar/lion-avatar.png'}
                alt="Profile avatar"
                width={200}
                height={200}
                className="object-cover rounded-full"
              />
            </div>
            <Button
              size={'mobile'}
              shape={'circle'}
              className="self-end bg-transparent hover:bg-transparent rounded-full border-4 border-white shadow-lg"
              onClick={() => setIsModalOpen(true)}
            >
              <Pencil size={28} />
            </Button>
          </div>
        </div>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-lg p-3 rounded-md">
          {isEditing ? (
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 block w-full py-2 text-gray-900 sm:text-sm sm:leading-6 rounded-full border shadow-md px-6"
                />
              </div>
              <div>
                <label htmlFor="surname" className="block text-sm font-medium leading-6 text-gray-900">
                  Apellido
                </label>
                <input
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className="mt-2 block w-full py-2 text-gray-900 sm:text-sm sm:leading-6 rounded-full border shadow-md px-6"
                />
              </div>
              <div className="flex items-end justify-end">
                <Button size={'circle'} shape={'circle'} variant={'secondary'} onClick={handleSave}>
                  <Save className="text-white" />
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                <div className="mt-2 rounded-full border shadow-md px-6">
                  <p className="block w-full py-2 text-gray-900 sm:text-sm sm:leading-6">{formData.name}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Apellido</label>
                <div className="mt-2 rounded-full border shadow-md px-6">
                  <p className="block w-full py-2 text-gray-900 sm:text-sm sm:leading-6">{formData.surname}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <div className="mt-2 rounded-full border shadow-md px-6">
                  <p className="block w-full py-2 text-gray-900 sm:text-sm sm:leading-6">{formData.email}</p>
                </div>
              </div>

              <div className="flex items-end justify-end">
                <Button size={'mobile'} shape={'circle'} variant={'secondary'} onClick={() => setIsEditing(true)}>
                  <Pencil className="text-white" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ImageSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectImage={handleSelectImage}
        patientId={user.id}
      />
    </div>
  )
}

export default ProfilePage
