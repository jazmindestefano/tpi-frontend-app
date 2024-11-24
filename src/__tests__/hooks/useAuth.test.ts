import { renderHook } from '@testing-library/react'
import { useDispatch } from 'react-redux'
import { useToken } from '@hooks/selectors'
import { useGetMe } from '@hooks/queries'
import { setUser } from '@redux/slices'
import { vi, describe, it, expect, MockedFunction } from 'vitest'
import { useAuth } from '@hooks/auth'
import { AppDispatch } from '@redux/store'
import { User } from '@interfaces'
import { NOT_YET_ASSIGNED_STR } from '@config'

vi.mock('react-redux', () => ({
  useDispatch: vi.fn()
}))

vi.mock('@hooks/queries', () => ({
  useGetMe: vi.fn()
}))

vi.mock('@hooks/selectors', () => ({
  useToken: vi.fn()
}))

vi.mock('@redux/slices', () => ({
  setUser: vi.fn()
}))

describe('useAuth', () => {
  let dispatchMock: AppDispatch
  let useGetMeMock: MockedFunction<typeof useGetMe>
  let useTokenMock: MockedFunction<typeof useToken>

  beforeEach(() => {
    vi.clearAllMocks()
    dispatchMock = vi.fn()
    vi.mocked(useDispatch).mockReturnValue(dispatchMock)
    useGetMeMock = vi.mocked(useGetMe)
    useTokenMock = vi.mocked(useToken)
  })

  it('should return isAuthorized as true and dispatches setUser for an authorized user', () => {
    const mockUser: User = { role: 'PATIENT', username: 'example', id: 1 }
    useGetMeMock.mockReturnValue({ user: mockUser, isLoading: false, error: null })
    useTokenMock.mockReturnValue('valid-token')

    const { result } = renderHook(() => useAuth())

    expect(result.current.isAuthorized).toBe(true)
    expect(result.current.isLoading).toBe(false)
    expect(dispatchMock).toHaveBeenCalledWith(setUser(mockUser))
  })

  it('should return isAuthorized as false for an unauthorized user', () => {
    useGetMeMock.mockReturnValue({ user: null, isLoading: false, error: null })
    useTokenMock.mockReturnValue(NOT_YET_ASSIGNED_STR)

    const { result } = renderHook(() => useAuth())

    expect(result.current.isAuthorized).toBe(false)
    expect(result.current.isLoading).toBe(false)
    expect(dispatchMock).not.toHaveBeenCalled()
  })

  it('should return isLoading as true when loading', () => {
    useGetMeMock.mockReturnValue({ user: null, isLoading: true, error: null })
    useTokenMock.mockReturnValue(NOT_YET_ASSIGNED_STR)

    const { result } = renderHook(() => useAuth())

    expect(result.current.isAuthorized).toBe(false)
    expect(result.current.isLoading).toBe(true)
  })
})
