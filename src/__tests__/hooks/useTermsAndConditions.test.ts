import { renderHook, waitFor } from '@testing-library/react'
import { useMutation } from '@tanstack/react-query'
import { useTermsAndConditions } from '@hooks'
import * as ApiService from '@http'
import { Mock, vi } from 'vitest'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useMutation: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  UpdatePatientTermsAndConditions: vi.fn()
}))

describe('useTermsAndConditions', () => {
  const mockMutation = (overrides: Partial<ReturnType<typeof useMutation>>) => {
    ;(useMutation as Mock).mockReturnValue({
      error: null,
      isSuccess: false,
      isPending: false,
      ...overrides
    })
  }

  it('should return success when terms and conditions are updated successfully', async () => {
    ;(ApiService.UpdatePatientTermsAndConditions as Mock).mockResolvedValueOnce(true)
    mockMutation({ isSuccess: true })

    const { result } = renderHook(() => useTermsAndConditions())

    await waitFor(() => result.current.isSuccess)

    expect(result.current.isSuccess).toBe(true)
    expect(result.current.error).toBeNull()
    expect(result.current.isPending).toBe(false)
  })
})
