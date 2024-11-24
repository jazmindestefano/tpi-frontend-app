import { renderHook, waitFor } from '@testing-library/react'
import { vi, Mock } from 'vitest'
import { useQuery } from '@tanstack/react-query'
import { useGetThemesByGameId } from '../../hooks/queries'

vi.mock('@http')
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn()
  }
})

describe('useGetThemesByGameId', () => {
  const gameId = 1
  const themes = [{ id: 1, name: 'Theme 1' }]
  const error = new Error('Error fetching themes')

  it('should return themes data when the query is successful', async () => {
    ;(useQuery as Mock).mockReturnValue({
      data: themes,
      error: null,
      isLoading: false
    })

    const { result } = renderHook(() => useGetThemesByGameId(gameId))

    await waitFor(() => result.current.isLoading === false)

    expect(result.current.themes).toEqual(themes)
    expect(result.current.error).toBeNull()
    expect(result.current.isLoading).toBe(false)
  })

  it('should return an error when the query fails', async () => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error,
      isLoading: false
    })

    const { result } = renderHook(() => useGetThemesByGameId(gameId))

    await waitFor(() => {
      expect(result.current.themes).toBeNull()
      expect(result.current.error).toEqual(error)
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('should return isLoading as true while the query is loading', async () => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true
    })

    const { result } = renderHook(() => useGetThemesByGameId(gameId))

    expect(result.current.themes).toBeNull()
    expect(result.current.error).toBeNull()
    expect(result.current.isLoading).toBe(true)
  })
})
