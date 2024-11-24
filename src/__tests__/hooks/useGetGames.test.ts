import { renderHook, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { useGetGames } from '../../hooks/queries'
import * as ApiService from '@http'
import { Mock, vi } from 'vitest'
import { Game } from '@interfaces'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  getGames: vi.fn()
}))

describe('useGetGames', () => {
  const error = new Error('Error fetching games')
  const mockGames = [
    { id: 1, name: 'Game 1' },
    { id: 2, name: 'Game 2' }
  ]

  const getGamesSetUp = (overrides: Partial<ReturnType<typeof useQuery>>) => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      ...overrides
    })
  }

  it('should return games data when the query is successful', async () => {
    ;(ApiService.getGames as Mock).mockResolvedValueOnce(mockGames)
    getGamesSetUp({ data: mockGames })

    const { result } = renderHook(() => useGetGames())

    await waitFor(() => !result.current.isLoading)

    ExpectLoadedGames(result, mockGames)
  })

  it('should return an error when the query fails', async () => {
    getGamesSetUp({ error })

    const { result } = renderHook(() => useGetGames())

    ExpectError(result, error)
  })

  it('should return isLoading as true while the query is loading', () => {
    getGamesSetUp({ isLoading: true })

    const { result } = renderHook(() => useGetGames())

    ExpectIsLoadingToBeTrue(result)
  })
})

function ExpectIsLoadingToBeTrue(result: {
  current: { games: Game[] | null | undefined; error: Error | null; isLoading: boolean }
}) {
  expect(result.current.games).toBeNull()
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(true)
}

function ExpectError(
  result: { current: { games: Game[] | null | undefined; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.games).toBeNull()
  expect(result.current.error).toEqual(error)
  expect(result.current.isLoading).toBe(false)
}

function ExpectLoadedGames(
  result: { current: { games: Game[] | null | undefined; error: Error | null; isLoading: boolean } },
  mockGames: { id: number; name: string }[]
) {
  expect(result.current.games).toEqual(mockGames)
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(false)
}
