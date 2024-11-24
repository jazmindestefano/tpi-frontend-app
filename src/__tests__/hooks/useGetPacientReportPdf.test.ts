import { renderHook } from '@testing-library/react'
import { useGetPacientReportPdf } from '@hooks'
import { useQuery } from '@tanstack/react-query'
import { Mock, vi } from 'vitest'

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

  it('should return reportPdf when the query is successful', async () => {
    ;(useQuery as Mock).mockReturnValue({
      data: mockPdfBlob,
      error: null,
      isLoading: false
    })

    const { result } = renderHook(() => useGetPacientReportPdf(patientId))

    ExpectPdf(result, mockPdfBlob)
  })

  it('should return an error if the query fails', async () => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error,
      isLoading: false
    })

    const { result } = renderHook(() => useGetPacientReportPdf(patientId))

    ExpectError(result, error)
  })
})

function ExpectError(
  result: { current: { reportPdf: Blob | null | undefined; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.reportPdf).toBeNull()
  expect(result.current.error).toEqual(error)
  expect(result.current.isLoading).toBe(false)
}

function ExpectPdf(
  result: { current: { reportPdf: Blob | null | undefined; error: Error | null; isLoading: boolean } },
  mockPdfBlob: Blob
) {
  expect(result.current.reportPdf).toEqual(mockPdfBlob)
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(false)
}
