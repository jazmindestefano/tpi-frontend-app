import { Layout, Responsive, WidthProvider } from 'react-grid-layout'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { ThumbsUp, ThumbsDown, Star, ArrowRight } from 'lucide-react'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Chart from './Chart'
import localStorageManager from '../../localStorage/localStorageManager'
import { useDashboard } from '@/hooks'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

const ResponsiveGridLayout = WidthProvider(Responsive)

const getCurrentDate = () => {
  return new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

export default function Dashboard() {
  const navigate = useNavigate()
  // to-do: implement slicer redux
  const selectedPatientId = localStorageManager.getItem('selectedPatientId')
  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({})
  const [chartTypes, setChartTypes] = useState<{ [key: string]: 'line' | 'bar' }>({})

  const {
    surveyFeedbackData,
    surveyFeedbackError,
    surveyFeedbackLoading,
    chartData,
    whatHappenedTodayData,
    whatHappenedTodayError,
    whatHappenedTodayLoading
  } = useDashboard(selectedPatientId)

  useEffect(() => {
    const initialChartTypes: { [key: string]: 'line' | 'bar' } = {}
    chartData?.forEach((chart) => {
      initialChartTypes[chart.id] = 'bar'
    })
    setChartTypes(initialChartTypes)
  }, [chartData])

  const renderChart = (chartId: string) => {
    const chartDataRender = chartData?.find((item) => item.id === chartId)
    if (!chartDataRender) return null

    const chartType = chartTypes[chartId] || 'line'

    return (
      <Chart
        chartData={chartDataRender}
        chartType={chartType}
        onChartTypeChange={(type) => setChartTypes({ ...chartTypes, [chartId]: type })}
      />
    )
  }

  const buildLayouts = useCallback(
    (w: number): Layout[] => [
      { i: 'today', w: 6, h: 2, x: 0, y: 0 },
      { i: 'feedback', w: 6, h: 2, x: 6, y: 0 },
      ...(chartData
        ? chartData.map((chart, index) => ({
            i: chart.id,
            w,
            h: 2,
            x: 0,
            y: index + 1
          }))
        : [])
    ],
    [chartData]
  )

  useEffect(() => {
    const newLayouts: { [key: string]: Layout[] } = {
      lg: buildLayouts(12),
      md: buildLayouts(12),
      sm: buildLayouts(12),
      xs: buildLayouts(12),
      xxs: buildLayouts(12)
    }

    setLayouts(newLayouts)
  }, [buildLayouts])

  // to-do: fix because it doesnt always work
  const handleClick = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
    navigate(`/profesional/paciente/${selectedPatientId}/timeline`)
  }

  const handleDragStart = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold text-center w-full">Seguimiento del Progreso de Juan</h1>
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={250}
        isDraggable={true}
        isResizable={true}
        onLayoutChange={(_currentLayout, allLayouts) => setLayouts(allLayouts)}
      >
        <div key="today" className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 h-full flex flex-col">
            <h2 className="text-2xl mb-2">¿Qué pasó hoy?</h2>
            <p className="text-gray-600 mb-2">{getCurrentDate()}</p>
            <div className="flex justify-between mb-4 flex-grow">
              {!whatHappenedTodayError &&
                !whatHappenedTodayLoading &&
                whatHappenedTodayData.length > 0 &&
                whatHappenedTodayData.map((activity, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 rounded-lg p-2 w-[30%] text-center flex flex-col justify-center"
                  >
                    <h3 className="font-semibold mb-1 text-2xl">{activity.gameDescription}</h3>
                    <p className="text-2xl font-bold">{activity.playedTimes}</p>
                    <p className="text-md text-gray-600">actividades hechas</p>
                  </div>
                ))}
            </div>
            <button
              onClick={handleClick}
              onDragStart={handleDragStart}
              className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center justify-center w-full cursor-pointer"
            >
              <p>Ver más</p>
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
        {chartData?.map((chart) => (
          <div key={chart.id} className="bg-white rounded-lg shadow-md overflow-hidden p-6">
            {renderChart(chart.id)}
          </div>
        ))}
        <div key="feedback" className="bg-white rounded-lg shadow-md overflow-hidden w-full">
          {!surveyFeedbackError && !surveyFeedbackLoading && surveyFeedbackData && (
            <>
              <div className="p-4 border-b border-gray-200 w-full">
                <h2 className="text-2xl">Feedback del Juego</h2>
              </div>
              <div className="h-[calc(100%-3rem)] flex flex-col justify-center">
                <div className="flex justify-around items-center">
                  <div className="text-center" key={surveyFeedbackData.mostLikedActivity.gameId}>
                    <h3 className="text-2xl font-semibold mb-1">Actividad Más Gustada</h3>
                    <p className="text-xl">{surveyFeedbackData.mostLikedActivity.gameName}</p>
                    <div className="flex items-center justify-center mt-1">
                      <ThumbsUp className="text-green-500 mr-1" size={24} />
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={
                            i < Number(surveyFeedbackData.mostLikedActivity.ranking)
                              ? 'text-yellow-500'
                              : 'text-gray-300'
                          }
                          size={20}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-center" key={surveyFeedbackData.leastLikedActivity.gameId}>
                    <h3 className="text-2xl font-semibold mb-1">Actividad Menos Gustada</h3>
                    <p className="text-xl">{surveyFeedbackData.leastLikedActivity.gameName}</p>
                    <div className="flex items-center justify-center mt-1">
                      <ThumbsDown className="text-red-500 mr-1" size={24} />
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={
                            i < Number(surveyFeedbackData.leastLikedActivity.ranking)
                              ? 'text-yellow-500'
                              : 'text-gray-300'
                          }
                          size={20}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </ResponsiveGridLayout>
    </div>
  )
}
