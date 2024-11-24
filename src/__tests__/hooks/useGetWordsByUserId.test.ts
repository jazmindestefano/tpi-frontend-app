import { renderHook, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { useGetWordsByUserId } from '../../hooks/queries'
import * as ApiService from '@http'
import { Mock, vi } from 'vitest'
import { Word } from '@interfaces'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  getWordsByUserId: vi.fn()
}))

describe('useGetWordsByUserId', () => {
  const userId = 1
  const error = new Error('Error fetching words')
  const mockWords = [
    { fullWord: 'example', syllables: ['ex', 'am', 'ple'] },
    { fullWord: 'testing', syllables: ['test', 'ing'] }
  ]

  const mockQuery = (overrides: Partial<ReturnType<typeof useQuery>>) => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      ...overrides
    })
  }

  it('should return words data when the query is successful', async () => {
    ;(ApiService.getWordsByUserId as Mock).mockResolvedValueOnce(mockWords)
    mockQuery({ data: mockWords })

    const { result } = renderHook(() => useGetWordsByUserId(userId))

    await waitFor(() => !result.current.isLoading)

    ExpectWords(result, mockWords)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => useGetWordsByUserId(userId))

    ExpectErrors(result, error)
  })
})

function ExpectErrors(
  result: { current: { words: Word[] | null | undefined; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.words).toBeNull()
  expect(result.current.error).toEqual(error)
  expect(result.current.isLoading).toBe(false)
}

function ExpectWords(
  result: { current: { words: Word[] | null | undefined; error: Error | null; isLoading: boolean } },
  mockWords: { fullWord: string; syllables: string[] }[]
) {
  expect(result.current.words).toEqual(mockWords)
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(false)
}
