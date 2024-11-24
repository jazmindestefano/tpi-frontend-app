import { renderHook, waitFor } from '@testing-library/react'
import { vi, Mock } from 'vitest'
import { useQuery } from '@tanstack/react-query'
import { useGetThemesByGameId } from '../../hooks/queries'
import { Theme } from '@interfaces'

vi.mock('@http')
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn()
  }
})

describe('useGetThemesByGameId', () => {
  const mockQuery = (overrides: Partial<ReturnType<typeof useQuery>>) => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      ...overrides
    })
  }

  const gameId = 1
  const themes = [{ id: 1, name: 'Theme 1' }]
  const error = new Error('Error fetching themes')

  it('should return themes data when the query is successful', async () => {
    mockQuery({ data: themes })

    const { result } = renderHook(() => useGetThemesByGameId(gameId))

    await waitFor(() => !result.current.isLoading)

    ExpectThemesData(result, themes)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => useGetThemesByGameId(gameId))

    await waitFor(() => {
      ExpectError(result, error)
    })
  })
})

function ExpectError(
  result: { current: { themes: Theme[] | null | undefined; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.themes).toBeNull()
  expect(result.current.error).toEqual(error)
  expect(result.current.isLoading).toBe(false)
}

function ExpectThemesData(
  result: { current: { themes: Theme[] | null | undefined; error: Error | null; isLoading: boolean } },
  themes: { id: number; name: string }[]
) {
  expect(result.current.themes).toEqual(themes)
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(false)
}
