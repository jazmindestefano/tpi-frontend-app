import { Achievement, AchievementCount, UniqueAchievements } from '@interfaces'
import { getRandomColor } from '@helpers'

export const groupAchievements = (achievements: Achievement[]): AchievementCount => {
  return achievements.reduce((acc: AchievementCount, achievement: Achievement) => {
    acc[achievement.image] = (acc[achievement.image] || 0) + 1
    return acc
  }, {})
}

export const getUniqueAchievements = (achievements: Achievement[]): UniqueAchievements[] => {
  if (!achievements) return []

  const achievementCount = groupAchievements(achievements)

  return Object.keys(achievementCount).map((image, index) => ({
    id: index + 1,
    image,
    count: achievementCount[image],
    bgColor: getRandomColor()
  }))
}
