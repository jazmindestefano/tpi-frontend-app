import SpinnerLoader from '../components/common/SpinnerLoader'
import { useAchievements } from '../hooks/useAchievement'
import { HearableButton } from '../components/common/buttons/HearableButton.tsx'

const AchievementsPage = () => {
  const { uniqueAchievements, error, isLoading } = useAchievements()

  if (isLoading) return <SpinnerLoader />
  if (error) return <div>Error al cargar los logros</div>

  return (
    <div className="flex flex-col items-center justify-start lg:pt-28 pt-16 w-full h-screen lg:px-32 px-10">
      <div className="flex-center gap-4">
        <h1 className="text-4xl font-bold">Logros</h1>
        <HearableButton text={'Logros'} />
      </div>
      <div className="flex flex-wrap justify-center mt-4">
        {uniqueAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className="relative m-2 rounded-3xl p-4"
            style={{ backgroundColor: achievement.bgColor }}
          >
            <img src={achievement.image} alt={`Achievement ${achievement.id}`} className="w-36 h-40" />
            {achievement.count > 1 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center transform translate-x-2 -translate-y-2">
                {achievement.count}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AchievementsPage
