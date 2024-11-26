import { renderHook, waitFor } from '@testing-library/react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useGetAchievements } from '@hooks'
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
  getAchievements: vi.fn()
}))

describe('useGetAchievements', () => {
  const patientId = 1
  const error = new Error('Error fetching achievements')
  const mockAchievements: Achievement[] = [
    {
      id: 1,
      image: 'Achievement 1',
      achieved: false,
      quantity: 0
    },
    {
      id: 2,
      image: 'Achievement 2',
      achieved: false,
      quantity: 0
    }
  ]

  let mockUseQuery: MockedFunction<typeof useQuery>

  const mockQuery = (response: Partial<UseQueryResult<Achievement[], Error>>) => {
    mockUseQuery.mockReturnValue(response as UseQueryResult<Achievement[], Error>)
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseQuery = vi.mocked(useQuery)
  })

  it('should return achievements data when the query is successful', async () => {
    ;(ApiService.getAchievements as Mock).mockResolvedValueOnce(mockAchievements)
    mockQuery({ data: mockAchievements })

    const { result } = renderHook(() => useGetAchievements(patientId))

    await waitFor(() => !result.current.isLoading)

    ExpectAchievements(result, mockAchievements)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => useGetAchievements(patientId))

    ExpectErrors(result, error)
  })
})

function ExpectErrors(
  result: { current: { achievements: Achievement[] | null | undefined; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.achievements).toBeUndefined()
  expect(result.current.error).toEqual(error)
}

function ExpectAchievements(
  result: { current: { achievements: Achievement[] | null | undefined; error: Error | null; isLoading: boolean } },
  mockAchievements: Achievement[]
) {
  expect(result.current.achievements).toEqual(mockAchievements)
  expect(result.current.error).toBeUndefined()
}
