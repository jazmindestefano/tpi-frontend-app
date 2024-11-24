import { renderHook, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { useGetProfileData } from '@hooks'
import * as ApiService from '@http'
import { Mock, vi } from 'vitest'
import { ProfileData, Role } from '@interfaces'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  getProfileData: vi.fn()
}))

describe('useGetProfileData', () => {
  const id = 1
  const role: Role = 'PATIENT'
  const error = new Error('Error fetching profile data')
  const mockProfileData: ProfileData = {
    email: 'user@example.com',
    name: 'John',
    surname: 'Doe',
    image: 'profile.jpg'
  }

  const mockQuery = (overrides: Partial<ReturnType<typeof useQuery>>) => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      ...overrides
    })
  }

  it('should return profile data when the query is successful', async () => {
    ;(ApiService.getProfileData as Mock).mockResolvedValueOnce(mockProfileData)
    mockQuery({ data: mockProfileData })

    const { result } = renderHook(() => useGetProfileData(id, role))

    await waitFor(() => !result.current.isLoading)

    ExpectProfileData(result, mockProfileData)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => useGetProfileData(id, role))

    ExpectError(result, error)
  })
})

function ExpectError(
  result: { current: { data: ProfileData | null | undefined; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.data).toBeNull()
  expect(result.current.error).toEqual(error)
  expect(result.current.isLoading).toBe(false)
}

function ExpectProfileData(
  result: { current: { data: ProfileData | null | undefined; error: Error | null; isLoading: boolean } },
  mockProfileData: ProfileData
) {
  expect(result.current.data).toEqual(mockProfileData)
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(false)
}
