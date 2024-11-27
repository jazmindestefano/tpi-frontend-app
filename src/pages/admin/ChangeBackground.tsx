import { HearableButton } from '@components'
import { getRandomColor } from '@helpers'
import { useCurrentUser, useGetBackgrounds, useSelectBackground } from '@hooks'
import { setBackground } from '@redux/slices'
import { Loader } from 'lucide-react'
import { FC } from 'react'
import { useDispatch } from 'react-redux'

const ChangeBackground: FC = () => {
  const user = useCurrentUser()
  const dispatch = useDispatch()
  const { backgrounds, isLoading, error } = useGetBackgrounds(user.id)
  const { mutate: updateBackground } = useSelectBackground()

  const handleSelectBackground = (backgroundId: number, backgroundName: string) => {
    updateBackground({ patientId: user.id, backgroundId })
    dispatch(setBackground(backgroundName))
  }

  if (isLoading) return <Loader className="m-auto" />

  return (
    <div className="flex flex-col items-center justify-start lg:pt-28 pt-16 w-full h-screen lg:px-32 px-10">
      <div className="flex justify-center items-center w-full gap-4">
        <h1 className="text-4xl font-bold">Fondos</h1>
        <HearableButton text={'Estos son tus fondos ganados'} />
      </div>
      {error && <p>Error loading backgrounds.</p>}
      <div className="flex flex-wrap justify-center mt-4">
        {!error && backgrounds && backgrounds?.length > 0 && (
          <>
            {backgrounds.map((background) => (
              <div
                key={background.id}
                className="relative m-2 rounded-3xl p-6"
                style={{ backgroundColor: background.unlocked ? getRandomColor() : 'gray' }}
                onClick={
                  background.unlocked
                    ? () => handleSelectBackground(background.id, background.achievementName)
                    : undefined
                }
              >
                <img
                  src={background.achievementName}
                  alt={`background ${background.id}`}
                  className="w-36 h-40 cursor-pointer"
                  style={{ filter: background.unlocked ? 'none' : 'grayscale(100%)' }}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default ChangeBackground
