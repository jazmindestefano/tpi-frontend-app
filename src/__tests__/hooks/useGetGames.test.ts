import { renderHook, waitFor } from '@testing-library/react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useGetGames } from '../../hooks/queries'
import * as ApiService from '@http'
import { Mock, MockedFunction, vi } from 'vitest'
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
  const mockGames: Game[] = [
    {
      id: 1,
      name: 'Game 1',
      image: ''
    },
    {
      id: 2,
      name: 'Game 2',
      image: ''
    }
  ]

  let mockUseQuery: MockedFunction<typeof useQuery>

  const mockQuery = (response: Partial<UseQueryResult<Game[], Error>>) => {
    mockUseQuery.mockReturnValue(response as UseQueryResult<Game[], Error>)
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseQuery = vi.mocked(useQuery)
  })

  it('should return games data when the query is successful', async () => {
    ;(ApiService.getGames as Mock).mockResolvedValueOnce(mockGames)
    mockQuery({ data: mockGames })

    const { result } = renderHook(() => useGetGames())

    await waitFor(() => !result.current.isLoading)

    ExpectLoadedGames(result, mockGames)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => useGetGames())

    ExpectError(result, error)
  })
})

function ExpectError(
  result: { current: { games: Game[] | null | undefined; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.games).toBeUndefined()
  expect(result.current.error).toEqual(error)
}

function ExpectLoadedGames(
  result: { current: { games: Game[] | null | undefined; error: Error | null; isLoading: boolean } },
  mockGames: { id: number; name: string }[]
) {
  expect(result.current.games).toEqual(mockGames)
  expect(result.current.error).toBeUndefined()
}
