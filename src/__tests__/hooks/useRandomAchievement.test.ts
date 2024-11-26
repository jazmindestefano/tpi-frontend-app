import { renderHook, waitFor } from '@testing-library/react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useRandomAchievement } from '../../hooks/queries'
import * as ApiService from '@http'
import { Mock, MockedFunction, vi } from 'vitest'
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
  const themeId = 1
  const error = new Error('Error fetching achievement')
  const mockAchievement: Achievement = {
    id: 1,
    image: 'achievement1.png',
    achieved: false,
    quantity: 0
  }

  let mockUseQuery: MockedFunction<typeof useQuery>

  const mockQuery = (response: Partial<UseQueryResult<Achievement, Error>>) => {
    mockUseQuery.mockReturnValue(response as UseQueryResult<Achievement, Error>)
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseQuery = vi.mocked(useQuery)
  })

  it('should return achievement data when the query is successful', async () => {
    ;(ApiService.getRandomAchievement as Mock).mockResolvedValueOnce(mockAchievement)
    mockQuery({ data: mockAchievement })

    const { result } = renderHook(() => useRandomAchievement(patientId, themeId))

    await waitFor(() => !result.current.isLoading)

    ExpectAchievementToLoad(result, mockAchievement)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => useRandomAchievement(patientId, themeId))

    ExpectError(result, error)
  })
})

function ExpectError(
  result: { current: { achievement: Achievement | null | undefined; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.achievement).toBeUndefined()
  expect(result.current.error).toEqual(error)
}

function ExpectAchievementToLoad(
  result: { current: { achievement: Achievement | null | undefined; error: Error | null; isLoading: boolean } },
  mockAchievement: { id: number; image: string }
) {
  expect(result.current.achievement).toEqual(mockAchievement)
  expect(result.current.error).toBeUndefined()
}
