import { useCurrentUser, useGetAchievements } from '@hooks'
import { FC } from 'react'
import { HearableButton, Loader } from '@components'
import { getRandomColor } from '@helpers'

const AchievementsPage: FC = () => {
  const user = useCurrentUser()
  const { achievements, error, isLoading } = useGetAchievements(user.id)

  if (isLoading) return <Loader />
  if (error) return <div>Error al cargar los logros</div>

  return (
    <div className="flex flex-col items-center justify-start lg:pt-28 pt-16 w-full h-screen lg:px-32 px-10">
      <div className="flex justify-center items-center w-full gap-4">
        <h1 className="text-4xl font-bold">Logros</h1>
        <HearableButton text={'Estos son tus logros'} />
      </div>
      <div className="flex flex-wrap justify-center mt-4">
        {achievements && achievements?.length > 0 ? (
          <>
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="relative m-2 rounded-3xl p-4"
                style={{ backgroundColor: achievement.achieved ? getRandomColor() : 'gray' }}
              >
                <img
                  src={achievement.image}
                  alt={`Achievement ${achievement.id}`}
                  className="w-36 h-40"
                  style={{ filter: achievement.achieved ? 'none' : 'grayscale(100%)' }}
                />
                {achievement.achieved && achievement.quantity > 1 && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center transform translate-x-2 -translate-y-2">
                    {achievement.quantity}
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="text-2xl font-bold">No tienes logros aún</div>
        )}
      </div>
    </div>
  )
}

export default AchievementsPage
