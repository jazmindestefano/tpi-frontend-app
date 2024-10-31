import { describe, it, expect } from 'vitest'
import { ChartData } from '@/interfaces/interfaces'
import { transformDashboardData } from '@/components/dashboard'

describe('transformDashboardData', () => {
  it('groups and transforms the data correctly', () => {
    const input = [
      { date: '2024-10-01 12:00:00', value: 'a', score: 5 },
      { date: '2024-10-01 13:00:00', value: 'b', score: 3 },
      { date: '2024-10-02 12:00:00', value: 'a', score: 7 }
    ]

    const result: ChartData = transformDashboardData(input, 'test-id', 'Test Title')

    expect(result.id).toBe('test-id')
    expect(result.title).toBe('Test Title')
    expect(result.data.labels).toEqual(['2024-10-01', '2024-10-02'])
    expect(result.data.datasets.length).toBe(2)

    const datasetA = result.data.datasets.find((d) => d.label === 'A')
    expect(datasetA).toBeDefined()
    expect(datasetA?.data).toEqual([5, 7])

    const datasetB = result.data.datasets.find((d) => d.label === 'B')
    expect(datasetB).toBeDefined()
    expect(datasetB?.data).toEqual([3, 0])
  })
})
