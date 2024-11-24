import { renderHook, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { useGetMe } from '@hooks' // Asegúrate de que esta ruta sea correcta
import * as ApiService from '@http' // Asegúrate de que esta ruta sea correcta
import { Mock, vi } from 'vitest'
import { User } from '@interfaces' // Asegúrate de que esta ruta sea correcta

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  getMe: vi.fn()
}))

describe('useGetMe', () => {
  const mockUser: User = { id: 1, username: 'John Doe', role: 'PATIENT' }
  const error = new Error('Error fetching user')

  const mockQuery = (overrides: Partial<ReturnType<typeof useQuery>>) => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      ...overrides
    })
  }

  it('should return user data when the query is successful', async () => {
    ;(ApiService.getMe as Mock).mockResolvedValueOnce(mockUser)
    mockQuery({ data: mockUser })

    const { result } = renderHook(() => useGetMe())

    await waitFor(() => !result.current.isLoading)

    ExpectUser(result, mockUser)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => useGetMe())

    ExpectErrors(result, error)
  })
})

function ExpectErrors(
  result: { current: { user: User | null | undefined; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.user).toBeNull()
  expect(result.current.error).toEqual(error)
  expect(result.current.isLoading).toBe(false)
}

function ExpectUser(
  result: { current: { user: User | null | undefined; error: Error | null; isLoading: boolean } },
  mockUser: User
) {
  expect(result.current.user).toEqual(mockUser)
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(false)
}
