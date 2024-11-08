import { AuditoryDiscriminationChartProps } from '@components/dashboard/interfaces'
import { useAuditoryDiscriminationChart } from '@hooks'
import { renderHook } from '@testing-library/react'
import { expect, vi } from 'vitest'

vi.mock('@helpers', () => ({
  getRandomColorDashboard: vi.fn().mockReturnValue('#FF5733')
}))

const chartData: AuditoryDiscriminationChartProps[] = [
  {
    activityId: 1,
    activityName: 'A',
    accuracyRate: 80,
    correctAttempts: 8,
    totalAttempts: 10
  },
  {
    activityId: 2,
    activityName: 'B',
    accuracyRate: 60,
    correctAttempts: 6,
    totalAttempts: 10
  },
  {
    activityId: 3,
    activityName: 'X',
    accuracyRate: 75,
    correctAttempts: 9,
    totalAttempts: 12
  }
]

describe('useAuditoryDiscriminationChart', () => {
  it('Init auditory discrmination chart data correctly', () => {
    const { result } = renderHook(() => useAuditoryDiscriminationChart({ chartData }))

    expect(result.current.selectedValues).toEqual(['A', 'B', 'X'])
    expect(result.current.data.datasets).toHaveLength(1)
    expect(result.current.data.labels).toEqual(['A', 'B', 'X'])
  })
})
