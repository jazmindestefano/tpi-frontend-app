import { renderHook, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { Mock, vi } from 'vitest'
import { useGetGameLevels } from '../../hooks/queries'
import * as ApiService from '@http'
import { GameLevel } from '@interfaces'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  getGameLevels: vi.fn()
}))

describe('useGetGameLevels', () => {
  const themeId = 1
  const mockLevels = [
    { id: 1, name: 'Level 1' },
    { id: 2, name: 'Level 2' }
  ]
  const error = new Error('Error fetching levels')

  const mockQuery = (overrides: Partial<ReturnType<typeof useQuery>>) => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      ...overrides
    })
  }

  it('should return levels data when the query is successful', async () => {
    ;(ApiService.getGameLevels as Mock).mockResolvedValueOnce(mockLevels)
    mockQuery({ data: mockLevels })

    const { result } = renderHook(() => useGetGameLevels(themeId))

    await waitFor(() => !result.current.isLoading)

    ExpectLevels(result, mockLevels)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => useGetGameLevels(themeId))

    ExpectError(result, error)
  })

  it('should return isLoading as true while the query is loading', () => {
    mockQuery({ isLoading: true })

    const { result } = renderHook(() => useGetGameLevels(themeId))

    ExpectIsLoading(result)
  })
})

function ExpectIsLoading(result: {
  current: { levels: GameLevel[] | null | undefined; error: Error | null; isLoading: boolean }
}) {
  expect(result.current.levels).toBeNull()
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(true)
}

function ExpectError(
  result: { current: { levels: GameLevel[] | null | undefined; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.levels).toBeNull()
  expect(result.current.error).toEqual(error)
  expect(result.current.isLoading).toBe(false)
}

function ExpectLevels(
  result: { current: { levels: GameLevel[] | null | undefined; error: Error | null; isLoading: boolean } },
  mockLevels: { id: number; name: string }[]
) {
  expect(result.current.levels).toEqual(mockLevels)
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(false)
}
