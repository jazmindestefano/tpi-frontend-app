import Button from '@/components/common/buttons/Button'
import { HearableButton } from '@/components/common/buttons/HearableButton'
import { Pencil, Save } from 'lucide-react'
import { useState } from 'react'

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="flex flex-col justify-center items-center w-full gap-4 mx-8 md:mx-52">
      <div className="flex justify-center items-center w-full gap-4">
        <h1 className="text-h1">Perfil</h1>
        <HearableButton variant={'secondary'} text={'Este es tu perfil'} />
      </div>
      <div className="flex flex-col justify-center items-center w-full rounded-xl border shadow-lg py-8 bg-orange-50">
        <div className="flex flex-row justify-end items-end sm:mx-auto sm:w-full sm:max-w-lg">
          <img className="mx-auto h-40 w-auto" src="/avatar/lion-avatar.png" alt="Avatar" />
        </div>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-lg p-3 rounded-md">
          {isEditing ? (
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="nombre"
                  autoComplete="nombre"
                  required
                  className="mt-2 block w-full py-2 text-gray-900 sm:text-sm sm:leading-6 rounded-full border shadow-md px-6"
                />
              </div>

              <div>
                <label htmlFor="apellido" className="block text-sm font-medium leading-6 text-gray-900">
                  Apellido
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  autoComplete="apellido"
                  required
                  className="mt-2 block w-full py-2 text-gray-900 sm:text-sm sm:leading-6 rounded-full border shadow-md px-6"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-2 block w-full py-2 text-gray-900 sm:text-sm sm:leading-6 rounded-full border shadow-md px-6"
                />
              </div>

              <div className="flex items-end justify-end">
                <Button size={'circle'} shape={'circle'} variant={'secondary'} onClick={() => setIsEditing(false)}>
                  <Save className="text-white" />
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                <div className="mt-2 rounded-full border shadow-md px-6">
                  <p className="block w-full py-2 text-gray-900 sm:text-sm sm:leading-6">John</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Apellido</label>
                <div className="mt-2 rounded-full border shadow-md px-6">
                  <p className="block w-full py-2 text-gray-900 sm:text-sm sm:leading-6">Doe</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <div className="mt-2 rounded-full border shadow-md px-6">
                  <p className="block w-full py-2 text-gray-900 sm:text-sm sm:leading-6">john.doe@example.com</p>
                </div>
              </div>

              <div className="flex items-end justify-end">
                <Button size={'circle'} shape={'circle'} variant={'secondary'} onClick={() => setIsEditing(true)}>
                  <Pencil className="text-white" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
