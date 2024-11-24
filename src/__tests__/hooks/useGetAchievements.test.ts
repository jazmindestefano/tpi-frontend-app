import { renderHook, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { useGetAchievements } from '@hooks'
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
  getAchievements: vi.fn()
}))

describe('useGetAchievements', () => {
  const patientId = 1
  const error = new Error('Error fetching achievements')
  const mockAchievements = [
    { id: 1, title: 'Achievement 1' },
    { id: 2, title: 'Achievement 2' }
  ]

  const mockQuery = (overrides: Partial<ReturnType<typeof useQuery>>) => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      ...overrides
    })
  }

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
  expect(result.current.achievements).toBeNull()
  expect(result.current.error).toEqual(error)
  expect(result.current.isLoading).toBe(false)
}

function ExpectAchievements(
  result: { current: { achievements: Achievement[] | null | undefined; error: Error | null; isLoading: boolean } },
  mockAchievements: { id: number; title: string }[]
) {
  expect(result.current.achievements).toEqual(mockAchievements)
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(false)
}
