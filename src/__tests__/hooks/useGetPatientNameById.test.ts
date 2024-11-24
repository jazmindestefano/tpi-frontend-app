import { renderHook, waitFor } from '@testing-library/react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useGetPatientNameById } from '@hooks'
import * as ApiService from '@http'
import { Mock, MockedFunction, vi } from 'vitest'

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

  let mockUseQuery: MockedFunction<typeof useQuery>

  const mockQuery = (response: Partial<UseQueryResult<string, Error>>) => {
    mockUseQuery.mockReturnValue(response as UseQueryResult<string, Error>)
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseQuery = vi.mocked(useQuery)
  })

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
})

function ExpectErrors(
  result: { current: { data: string | null | undefined; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.data).toBeUndefined()
  expect(result.current.error).toEqual(error)
}

function ExpectPatientName(
  result: { current: { data: string | null | undefined; error: Error | null; isLoading: boolean } },
  mockName: string
) {
  expect(result.current.data).toEqual(mockName)
  expect(result.current.error).toBeUndefined()
}
