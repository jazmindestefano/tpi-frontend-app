import { renderHook, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { useGetGames } from '../../hooks/queries'
import * as ApiService from '@http'
import { Mock, vi } from 'vitest'

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

  const mockQuery = (overrides: Partial<ReturnType<typeof useQuery>>) => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      ...overrides
    })
  }

  it('should return games data when the query is successful', async () => {
    ;(ApiService.getGames as Mock).mockResolvedValueOnce(mockGames)
    mockQuery({ data: mockGames })

    const { result } = renderHook(() => useGetGames())

    await waitFor(() => !result.current.isLoading)

    expect(result.current.games).toEqual(mockGames)
    expect(result.current.error).toBeNull()
    expect(result.current.isLoading).toBe(false)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => useGetGames())

    expect(result.current.games).toBeNull()
    expect(result.current.error).toEqual(error)
    expect(result.current.isLoading).toBe(false)
  })

  it('should return isLoading as true while the query is loading', () => {
    mockQuery({ isLoading: true })

    const { result } = renderHook(() => useGetGames())

    expect(result.current.games).toBeNull()
    expect(result.current.error).toBeNull()
    expect(result.current.isLoading).toBe(true)
  })
})
