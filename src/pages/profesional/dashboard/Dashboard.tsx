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
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Chart from '../../../components/Chart'
import localStorageManager from '../../../localStorage/localStorageManager'
import { staticChartData, staticSurveyFeedback } from '../../../testData/dashboardData'

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

  const generateLayout = () => {
    const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
    const newLayouts: { [key: string]: Layout[] } = {}

    Object.keys(breakpoints).forEach((breakpoint) => {
      const layout: Layout[] = [
        { i: 'today', w: 6, h: 2, x: 0, y: 0 },
        { i: 'feedback', w: 6, h: 2, x: 6, y: 0 },
        ...staticChartData.map((chart, index) => ({
          i: chart.id,
          w: 6,
          h: 2,
          x: index % 2 === 0 ? 0 : 6,
          y: Math.floor(index / 2 + 1) * 2
        }))
      ]
      newLayouts[breakpoint] = layout
    })
    setLayouts(newLayouts)
  }

  useEffect(() => {
    generateLayout()

    const initialChartTypes: { [key: string]: 'line' | 'bar' } = {}
    staticChartData.forEach((chart) => {
      initialChartTypes[chart.id] = 'line'
    })
    setChartTypes(initialChartTypes)
  }, [])

  const renderChart = (chartId: string) => {
    const chartData = staticChartData.find((item) => item.id === chartId)
    if (!chartData) return null

    const chartType = chartTypes[chartId] || 'line'

    return (
      <Chart
        chartData={chartData}
        chartType={chartType}
        onChartTypeChange={(type) => setChartTypes({ ...chartTypes, [chartId]: type })}
      />
    )
  }

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
        rowHeight={200}
        isDraggable={true}
        isResizable={true}
        onLayoutChange={(_currentLayout, allLayouts) => setLayouts(allLayouts)}
      >
        <div key="today" className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 h-full flex flex-col">
            <h2 className="text-2xl font-semibold mb-2">¿Qué pasó hoy?</h2>
            <p className="text-gray-600 mb-2">{getCurrentDate()}</p>
            <div className="flex justify-between mb-4 flex-grow">
              {['Letras', 'Palabras', 'La Viborita'].map((activity, index) => (
                <div
                  key={index}
                  className="bg-blue-100 rounded-lg p-2 w-[30%] text-center flex flex-col justify-center"
                >
                  <h3 className="font-semibold mb-1">{activity}</h3>
                  <p className="text-xl font-bold">0</p>
                  <p className="text-xs text-gray-600">veces jugadas</p>
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
        {staticChartData.map((chart) => (
          <div key={chart.id} className="bg-white rounded-lg shadow-md overflow-hidden p-6">
            {renderChart(chart.id)}
          </div>
        ))}
        <div key="feedback" className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-2 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Feedback del Juego</h2>
          </div>
          <div className="h-[calc(100%-3rem)] flex flex-col justify-center">
            <div className="flex justify-around items-center">
              <div className="text-center">
                <h3 className="text-base font-semibold mb-1">Actividad Más Gustada</h3>
                <p className="text-xl">{staticSurveyFeedback.most_liked_activity.activity_name}</p>
                <div className="flex items-center justify-center mt-1">
                  <ThumbsUp className="text-green-500 mr-1" size={16} />
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-500" size={16} />
                  ))}
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-base font-semibold mb-1">Actividad Menos Gustada</h3>
                <p className="text-xl">{staticSurveyFeedback.least_liked_activity.activity_name}</p>
                <div className="flex items-center justify-center mt-1">
                  <ThumbsDown className="text-red-500 mr-1" size={16} />
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={i < 2 ? 'text-yellow-500' : 'text-gray-300'} size={16} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ResponsiveGridLayout>
    </div>
  )
}
