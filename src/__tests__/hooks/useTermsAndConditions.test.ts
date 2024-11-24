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
  const error = new Error('Error updating terms and conditions')

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

  it('should return error when updating terms and conditions fails', async () => {
    mockMutation({ error })

    const { result } = renderHook(() => useTermsAndConditions())

    expect(result.current.isSuccess).toBe(false)
    expect(result.current.error).toEqual(error)
    expect(result.current.isPending).toBe(false)
  })

  it('should return isPending as true while mutation is pending', () => {
    mockMutation({ isPending: true })

    const { result } = renderHook(() => useTermsAndConditions())

    expect(result.current.isPending).toBe(true)
  })
})
