import { describe, it, expect, vi } from 'vitest'
import { useAchievements } from '../../hooks/useAchievement'
import { getRandomColor } from '../../helpers/colors'
import { useAchievements as fetchAchievements } from '../../hooks/queries'
import { Achievement } from '../../interfaces/interfaces'

vi.mock('../../hooks/queries')
vi.mock('../../helpers/colors')

describe('useAchievements', () => {
  const mockAchievements: Achievement[] = [
    { id: 1, image: 'image1.png' },
    { id: 2, image: 'image2.png' },
    { id: 3, image: 'image1.png' }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return unique achievements with count and random color', () => {
    ;(fetchAchievements as jest.Mock).mockReturnValue({
      achievement: mockAchievements,
      error: null,
      isLoading: false
    })
    ;(getRandomColor as jest.Mock).mockReturnValue('randomColor')

    const { uniqueAchievements, error, isLoading } = useAchievements()

    expect(uniqueAchievements).toEqual([
      { id: 1, image: 'image1.png', count: 2, bgColor: 'randomColor' },
      { id: 2, image: 'image2.png', count: 1, bgColor: 'randomColor' }
    ])
    expect(error).toBeNull()
    expect(isLoading).toBe(false)
  })

  it('should return empty array when loading', () => {
    ;(fetchAchievements as jest.Mock).mockReturnValue({
      achievement: null,
      error: null,
      isLoading: true
    })

    const { uniqueAchievements, error, isLoading } = useAchievements()

    expect(uniqueAchievements).toEqual([])
    expect(error).toBeNull()
    expect(isLoading).toBe(true)
  })

  it('should return empty array and error when there is an error', () => {
    const mockError = new Error('Failed to fetch')
    ;(fetchAchievements as jest.Mock).mockReturnValue({
      achievement: null,
      error: mockError,
      isLoading: false
    })

    const { uniqueAchievements, error, isLoading } = useAchievements()

    expect(uniqueAchievements).toEqual([])
    expect(error).toBe(mockError)
    expect(isLoading).toBe(false)
  })

  it('should return empty array when achievementsData is not an array', () => {
    ;(fetchAchievements as jest.Mock).mockReturnValue({
      achievement: {},
      error: null,
      isLoading: false
    })

    const { uniqueAchievements, error, isLoading } = useAchievements()

    expect(uniqueAchievements).toEqual([])
    expect(error).toBeNull()
    expect(isLoading).toBe(false)
  })
})
