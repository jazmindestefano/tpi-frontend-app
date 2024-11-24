import { renderHook, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { useSyllableDashboard } from '@hooks'
import * as ApiService from '@http'
import { Mock, vi } from 'vitest'
import { SyllableDashboard } from '@components'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  getSyllableDashboard: vi.fn()
}))

describe('useSyllableDashboard', () => {
  const patientId = 1
  const mockData: SyllableDashboard[] = [
    { date: '2024-01-01', type: 'Vowel', value: 'A', score: 80 },
    { date: '2024-01-02', type: 'Consonant', value: 'B', score: 90 }
  ]
  const error = new Error('Error fetching syllable data')

  const mockQuery = (overrides: Partial<ReturnType<typeof useQuery>>) => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      ...overrides
    })
  }

  it('should return syllable data when the query is successful', async () => {
    ;(ApiService.getSyllableDashboard as Mock).mockResolvedValueOnce(mockData)
    mockQuery({ data: mockData })

    const { result } = renderHook(() => useSyllableDashboard(patientId))

    await waitFor(() => !result.current.isLoading)

    ExpectSyllableData(result, mockData)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => useSyllableDashboard(patientId))

    ExpectErrors(result, error)
  })

  it('should return isLoading as true while the query is loading', () => {
    mockQuery({ isLoading: true })

    const { result } = renderHook(() => useSyllableDashboard(patientId))

    ExpectIsLoading(result)
  })
})

function ExpectIsLoading(result: {
  current: { data: SyllableDashboard[] | null; error: Error | null; isLoading: boolean }
}) {
  expect(result.current.data).toBeNull()
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(true)
}

function ExpectErrors(
  result: { current: { data: SyllableDashboard[] | null; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.data).toBeNull()
  expect(result.current.error).toEqual(error)
  expect(result.current.isLoading).toBe(false)
}

function ExpectSyllableData(
  result: { current: { data: SyllableDashboard[] | null; error: Error | null; isLoading: boolean } },
  mockData: SyllableDashboard[]
) {
  expect(result.current.data).toEqual(mockData)
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(false)
}
