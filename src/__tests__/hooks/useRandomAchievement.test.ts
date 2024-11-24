import { renderHook, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { useRandomAchievement } from '../../hooks/queries'
import * as ApiService from '@http'
import { Mock, vi } from 'vitest'
import { Achievement } from '@interfaces'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  getRandomAchievement: vi.fn()
}))

describe('useRandomAchievement', () => {
  const patientId = 123
  const error = new Error('Error fetching achievement')
  const mockAchievement = { id: 1, image: 'achievement1.png' }

  const RandomAchievementSetUp = (overrides: Partial<ReturnType<typeof useQuery>>) => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      ...overrides
    })
  }

  it('should return achievement data when the query is successful', async () => {
    ;(ApiService.getRandomAchievement as Mock).mockResolvedValueOnce(mockAchievement)
    RandomAchievementSetUp({ data: mockAchievement })

    const { result } = renderHook(() => useRandomAchievement(patientId))

    await waitFor(() => !result.current.isLoading)

    ExpectAchievementToLoad(result, mockAchievement)
  })

  it('should return an error when the query fails', async () => {
    RandomAchievementSetUp({ error })

    const { result } = renderHook(() => useRandomAchievement(patientId))

    ExpectError(result, error)
  })

  it('should return isLoading as true while the query is loading', () => {
    RandomAchievementSetUp({ isLoading: true })

    const { result } = renderHook(() => useRandomAchievement(patientId))

    ExpectIsLoadingToBeTrue(result)
  })
})

function ExpectIsLoadingToBeTrue(result: {
  current: { achievement: Achievement | null | undefined; error: Error | null; isLoading: boolean }
}) {
  expect(result.current.achievement).toBeNull()
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(true)
}

function ExpectError(
  result: { current: { achievement: Achievement | null | undefined; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.achievement).toBeNull()
  expect(result.current.error).toEqual(error)
  expect(result.current.isLoading).toBe(false)
}

function ExpectAchievementToLoad(
  result: { current: { achievement: Achievement | null | undefined; error: Error | null; isLoading: boolean } },
  mockAchievement: { id: number; image: string }
) {
  expect(result.current.achievement).toEqual(mockAchievement)
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(false)
}
