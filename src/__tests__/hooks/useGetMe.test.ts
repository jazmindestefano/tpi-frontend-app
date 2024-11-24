import { renderHook, waitFor } from '@testing-library/react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useGetMe } from '@hooks'
import * as ApiService from '@http'
import { Mock, MockedFunction, vi } from 'vitest'
import { User } from '@interfaces'

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

  let mockUseQuery: MockedFunction<typeof useQuery>

  const mockQuery = (response: Partial<UseQueryResult<User, Error>>) => {
    mockUseQuery.mockReturnValue(response as UseQueryResult<User, Error>)
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseQuery = vi.mocked(useQuery)
  })

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
  expect(result.current.user).toBeUndefined()
  expect(result.current.error).toEqual(error)
}

function ExpectUser(
  result: { current: { user: User | null | undefined; error: Error | null; isLoading: boolean } },
  mockUser: User
) {
  expect(result.current.user).toEqual(mockUser)
  expect(result.current.error).toBeUndefined()
}
