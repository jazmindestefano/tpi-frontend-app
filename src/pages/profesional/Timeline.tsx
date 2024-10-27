'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import useChart from '../../hooks/useChart'
import { rawData } from '../../testData/chartsData'

interface DailyActivity {
  date: string
  activities: {
    name: string
    count: number
  }[]
}

export default function Timeline() {
  const navigate = useNavigate()
  const [activities, setActivities] = useState<DailyActivity[]>([])
  const [visibleActivities, setVisibleActivities] = useState<DailyActivity[]>([])
  const { isLoading, error } = useChart()
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
          activities: Object.entries(activities).map(([name, count]) => ({ name, count }))
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

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto p-4 pb-40 min-h-screen">
      <button
        onClick={() => navigate(`/profesional/paciente/1`)}
        className="mb-8 flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
        aria-label="Volver al Dashboard"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        <span className="text-lg">Volver al Dashboard</span>
      </button>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Línea de Tiempo de Actividades</h1>
      <div className="relative space-y-6 pl-[9%]">
        <div className="absolute left-[5%] top-[24px] bottom-0 w-0.5 bg-blue-300"></div>
        {visibleActivities.map((day, index) => (
          <div
            key={day.date}
            className="relative bg-white rounded-lg shadow-sm p-6 transition-all duration-300 ease-in-out transform hover:shadow-md hover:-translate-y-1"
            ref={index === visibleActivities.length - 1 ? lastActivityRef : null}
          >
            <div className="absolute left-[-5%] top-6 w-6 h-6 bg-blue-500 rounded-full border-4 border-white z-10"></div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {new Date(day.date).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h2>
            <ul className="space-y-3">
              {day.activities.map((activity, actIndex) => (
                <li
                  key={actIndex}
                  className="flex justify-between items-center text-gray-600 hover:bg-gray-50 p-2 rounded-md transition-colors duration-200"
                >
                  <span className="capitalize">{activity.name}s</span>
                  <span className="font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    Jugó {activity.count} {activity.count === 1 ? 'vez' : 'veces'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {visibleActivities.length < activities.length && (
        <div className="flex justify-center mt-8 mb-16">
          <div className="animate-pulse text-blue-500">Cargando más actividades...</div>
        </div>
      )}
      <div className="h-32 bg-gradient-to-t from-white to-transparent fixed bottom-0 left-0 right-0 pointer-events-none"></div>
    </div>
  )
}
