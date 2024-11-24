import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { usePasswordVisibility } from '@hooks'

describe('usePasswordVisibility', () => {
  it('should initialize with showPassword as false', () => {
    const { result } = renderHook(() => usePasswordVisibility())
    ExpectPasswordVisibilyToBeFalse(result)
  })

  it('should toggle showPassword state to true', () => {
    const { result } = renderHook(() => usePasswordVisibility())

    act(() => {
      result.current.togglePasswordVisibility()
    })

    ExpectPasswordVisibilityToBeTrue(result)
  })

  it('should toggle showPassword state to false', () => {
    const { result } = renderHook(() => usePasswordVisibility())

    act(() => {
      result.current.togglePasswordVisibility()
    })

    act(() => {
      result.current.togglePasswordVisibility()
    })

    ExpectPasswordVisibilyToBeFalse(result)
  })
})

function ExpectPasswordVisibilityToBeTrue(result: {
  current: { showPassword: boolean; togglePasswordVisibility: () => void }
}) {
  expect(result.current.showPassword).toBe(true)
}

function ExpectPasswordVisibilyToBeFalse(result: {
  current: { showPassword: boolean; togglePasswordVisibility: () => void }
}) {
  expect(result.current.showPassword).toBe(false)
}
