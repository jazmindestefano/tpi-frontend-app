import { getRandomColor } from '../helpers/colors'
import { useAchievements as fetchAchievements } from '../hooks/queries'
import { Achievement } from '../interfaces/interfaces'

interface AchievementCount {
  [key: string]: number
}

export const useAchievements = () => {
  const { achievement: achievementsData, error, isLoading } = fetchAchievements(1)

  const groupAchievements = (achievements: Achievement[]): AchievementCount => {
    return achievements.reduce((acc: AchievementCount, achievement: Achievement) => {
      acc[achievement.image] = (acc[achievement.image] || 0) + 1
      return acc
    }, {})
  }

  const uniqueAchievements = () => {
    if (!Array.isArray(achievementsData)) return []

    const achievementCount = groupAchievements(achievementsData)

    return Object.keys(achievementCount).map((image, index) => ({
      id: index + 1,
      image,
      count: achievementCount[image],
      bgColor: getRandomColor()
    }))
  }

  return {
    uniqueAchievements: isLoading ? [] : uniqueAchievements(),
    error,
    isLoading
  }
}
