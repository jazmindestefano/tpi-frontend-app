import { renderHook, act, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import useAuditoryDiscriminationChart from '../../hooks/charts/useAuditoryDiscriminationChart'

const mockChartData = [
  { activityId: 1, activityName: 'Activity 1', accuracyRate: 90, totalAttempts: 100, correctAttempts: 90 },
  { activityId: 2, activityName: 'Activity 2', accuracyRate: 80, totalAttempts: 100, correctAttempts: 80 },
  { activityId: 3, activityName: 'Activity 3', accuracyRate: 70, totalAttempts: 100, correctAttempts: 70 }
]

const updatedChartData = [
  { activityId: 4, activityName: 'Activity 4', accuracyRate: 60, totalAttempts: 100, correctAttempts: 60 },
  { activityId: 5, activityName: 'Activity 5', accuracyRate: 50, totalAttempts: 100, correctAttempts: 50 }
]

afterEach(cleanup)

describe('useAuditoryDiscriminationChart', () => {
  it('debería inicializar con datos vacíos y valores seleccionados vacíos', () => {
    const { result } = renderHook(() => useAuditoryDiscriminationChart({ chartData: [] }))

    expect(result.current.data).toEqual({ datasets: [], labels: [] })
    expect(result.current.selectedValues).toEqual([])
  })

  it('debería establecer valores seleccionados basados en chartData', () => {
    const { result } = renderHook(() => useAuditoryDiscriminationChart({ chartData: mockChartData }))

    expect(result.current.selectedValues).toEqual(['Activity 1', 'Activity 2', 'Activity 3'])
  })

  it('debería actualizar los datos cuando cambia chartData', () => {
    const { result, rerender } = renderHook(({ chartData }) => useAuditoryDiscriminationChart({ chartData }), {
      initialProps: { chartData: mockChartData }
    })

    expect(result.current.data.labels).toEqual(['Activity 1', 'Activity 2', 'Activity 3'])
    expect(result.current.data.datasets[0].data).toEqual([90, 80, 70])

    rerender({ chartData: updatedChartData })

    expect(result.current.selectedValues).toEqual(['Activity 4', 'Activity 5'])
    expect(result.current.data.labels).toEqual(['Activity 4', 'Activity 5'])
    expect(result.current.data.datasets[0].data).toEqual([60, 50])
  })

  it('debería actualizar los datos cuando cambia selectedValues', () => {
    const { result } = renderHook(() => useAuditoryDiscriminationChart({ chartData: mockChartData }))

    act(() => {
      result.current.setSelectedValues(['Activity 1', 'Activity 3'])
    })

    expect(result.current.data.labels).toEqual(['Activity 1', 'Activity 3'])
    expect(result.current.data.datasets[0].data).toEqual([90, 70])
  })
})
