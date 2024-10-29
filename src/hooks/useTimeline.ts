import { useState, useEffect, useRef, useCallback } from 'react'
import { rawData } from '../testData/chartsData'

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

  useEffect(() => {
    if (rawData) {
      const groupedActivities = rawData.reduce(
        (acc, item) => {
          const date = item.date
          if (!acc[date]) {
            acc[date] = {}
          }
          if (!acc[date][item.type]) {
            acc[date][item.type] = 0
          }
          acc[date][item.type]++
          return acc
        },
        {} as Record<string, Record<string, number>>
      )

      const formattedActivities = Object.entries(groupedActivities)
        .map(([date, activities]) => ({
          date,
          activities: Object.entries(activities as Record<string, number>).map(([name, count]) => ({ name, count }))
        }))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      setActivities(formattedActivities)
      setVisibleActivities(formattedActivities.slice(0, 5))
    }
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
    isLoading: !rawData,
    error: null
  }
}

export default useTimeline
