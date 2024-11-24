import { renderHook } from '@testing-library/react'
import { useGetPacientReportPdf } from '@hooks'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { MockedFunction, vi } from 'vitest'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn()
  }
})

vi.mock('@http', () => ({
  getPacientReportPdf: vi.fn()
}))

describe('useGetPacientReportPdf', () => {
  const patientId = 1
  const mockPdfBlob = new Blob([new ArrayBuffer(8)], { type: 'application/pdf' })
  const error = new Error('Error fetching patient report PDF')

  let mockUseQuery: MockedFunction<typeof useQuery>

  const mockQuery = (response: Partial<UseQueryResult<Blob, Error>>) => {
    mockUseQuery.mockReturnValue(response as UseQueryResult<Blob, Error>)
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseQuery = vi.mocked(useQuery)
  })

  it('should return reportPdf when the query is successful', async () => {
    mockQuery({
      data: mockPdfBlob
    })

    const { result } = renderHook(() => useGetPacientReportPdf(patientId))

    ExpectPdf(result, mockPdfBlob)
  })

  it('should return an error if the query fails', async () => {
    mockQuery({
      error
    })

    const { result } = renderHook(() => useGetPacientReportPdf(patientId))

    ExpectError(result, error)
  })
})

function ExpectError(
  result: { current: { reportPdf: Blob | null | undefined; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.reportPdf).toBeUndefined()
  expect(result.current.error).toEqual(error)
}

function ExpectPdf(
  result: { current: { reportPdf: Blob | null | undefined; error: Error | null; isLoading: boolean } },
  mockPdfBlob: Blob
) {
  expect(result.current.reportPdf).toEqual(mockPdfBlob)
  expect(result.current.error).toBeUndefined()
}
