import { renderHook, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { useGetPatientNameById } from '@hooks'
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
  getPatientNameById: vi.fn()
}))

describe('useGetPatientNameById', () => {
  const patientId = 1
  const mockName = 'John Doe'
  const error = new Error('Error fetching patient name')

  const mockQuery = (overrides: Partial<ReturnType<typeof useQuery>>) => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      ...overrides
    })
  }

  it('should return the patient name when the query is successful', async () => {
    ;(ApiService.getPatientNameById as Mock).mockResolvedValueOnce(mockName)
    mockQuery({ data: mockName })

    const { result } = renderHook(() => useGetPatientNameById(patientId))

    await waitFor(() => !result.current.isLoading)

    ExpectPatientName(result, mockName)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => useGetPatientNameById(patientId))

    ExpectErrors(result, error)
  })

  it('should return isLoading as true while the query is loading', () => {
    mockQuery({ isLoading: true })

    const { result } = renderHook(() => useGetPatientNameById(patientId))

    ExpectIsLoading(result)
  })
})

function ExpectIsLoading(result: {
  current: { data: string | null | undefined; error: Error | null; isLoading: boolean }
}) {
  expect(result.current.data).toBeNull()
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(true)
}

function ExpectErrors(
  result: { current: { data: string | null | undefined; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.data).toBeNull()
  expect(result.current.error).toEqual(error)
  expect(result.current.isLoading).toBe(false)
}

function ExpectPatientName(
  result: { current: { data: string | null | undefined; error: Error | null; isLoading: boolean } },
  mockName: string
) {
  expect(result.current.data).toEqual(mockName)
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(false)
}
