import { renderHook, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { usePhonemeDashboard } from '@hooks'
import * as ApiService from '@http'
import { Mock, vi } from 'vitest'
import { PhonemeDashboard } from '@components'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  getPhonemeDashboard: vi.fn()
}))

describe('usePhonemeDashboard', () => {
  const patientId = 1
  const mockData: PhonemeDashboard[] = [
    { date: '2024-01-01', type: 'Short', value: 'A', score: 85 },
    { date: '2024-01-02', type: 'Long', value: 'O', score: 88 }
  ]
  const error = new Error('Error fetching phoneme data')

  const mockQuery = (overrides: Partial<ReturnType<typeof useQuery>>) => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      ...overrides
    })
  }

  it('should return phoneme data when the query is successful', async () => {
    ;(ApiService.getPhonemeDashboard as Mock).mockResolvedValueOnce(mockData)
    mockQuery({ data: mockData })

    const { result } = renderHook(() => usePhonemeDashboard(patientId))

    await waitFor(() => !result.current.isLoading)

    ExpectPhonemeData(result, mockData)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => usePhonemeDashboard(patientId))

    ExpectErrors(result, error)
  })

  it('should return isLoading as true while the query is loading', () => {
    mockQuery({ isLoading: true })

    const { result } = renderHook(() => usePhonemeDashboard(patientId))

    ExpectIsLoading(result)
  })
})

function ExpectIsLoading(result: {
  current: { data: PhonemeDashboard[] | null; error: Error | null; isLoading: boolean }
}) {
  expect(result.current.data).toBeNull()
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(true)
}

function ExpectErrors(
  result: { current: { data: PhonemeDashboard[] | null; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.data).toBeNull()
  expect(result.current.error).toEqual(error)
  expect(result.current.isLoading).toBe(false)
}

function ExpectPhonemeData(
  result: { current: { data: PhonemeDashboard[] | null; error: Error | null; isLoading: boolean } },
  mockData: PhonemeDashboard[]
) {
  expect(result.current.data).toEqual(mockData)
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(false)
}
