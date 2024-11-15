import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { usePasswordVisibility } from '@hooks'

describe('usePasswordVisibility', () => {
  it('should initialize with showPassword as false', () => {
    const { result } = renderHook(() => usePasswordVisibility())
    expect(result.current.showPassword).toBe(false)
  })

  it('should toggle showPassword state', () => {
    const { result } = renderHook(() => usePasswordVisibility())

    act(() => {
      result.current.togglePasswordVisibility()
    })
    expect(result.current.showPassword).toBe(true)

    act(() => {
      result.current.togglePasswordVisibility()
    })
    expect(result.current.showPassword).toBe(false)
  })
})
