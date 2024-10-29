import { useState, useEffect, useRef, useCallback } from 'react'
import { staticChartData } from '../testData/dashboardData'

// Definición de los tipos
interface DailyActivity {
  date: string
  activities: {
    name: string
    count: number
  }[]
}

const useTimeline = () => {
  const [activities, setActivities] = useState<DailyActivity[]>([])
  const [visibleActivities, setVisibleActivities] = useState<DailyActivity[]>([])
  const observerRef = useRef<IntersectionObserver | null>(null)
  const lastActivityRef = useRef<HTMLDivElement | null>(null)

  // info: it is not how the info will come, but to let the mock working
  useEffect(() => {
    const formattedActivities = staticChartData
      .flatMap((chart) => {
        return chart.data.labels.map((date, index) => ({
          date,
          activities: chart.data.datasets.map((dataset) => ({
            name: dataset.label,
            count: dataset.data[index]
          }))
        }))
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    setActivities(formattedActivities)
    setVisibleActivities(formattedActivities.slice(0, 5))
  }, [])

  const loadMoreActivities = useCallback(() => {
    setVisibleActivities((prev) => [...prev, ...activities.slice(prev.length, prev.length + 5)])
  }, [activities])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleActivities.length < activities.length) {
          loadMoreActivities()
        }
      },
      { threshold: 1 }
    )

    if (lastActivityRef.current) {
      observerRef.current.observe(lastActivityRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [visibleActivities, activities, loadMoreActivities])

  return {
    activities,
    visibleActivities,
    lastActivityRef,
    isLoading: !staticChartData,
    error: null
  }
}

export default useTimeline
