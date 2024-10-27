import { Responsive, WidthProvider } from 'react-grid-layout'
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
import { Line, Bar } from 'react-chartjs-2'
import { ThumbsUp, ThumbsDown, Star, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { ChartData } from '../../hooks/useChart'
import useDashboard from '../../hooks/useDashboard'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

const ResponsiveGridLayout = WidthProvider(Responsive)

const chartOptions = (title: string) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: title
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Puntaje'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Fecha'
      }
    }
  }
})

export default function Dashboard() {
  const navigate = useNavigate()
  const {
    layout,
    setLayout,
    currentDate,
    chartTypes,
    handleChartTypeChange,
    syllablesData,
    phonemesData,
    activitiesLettersData,
    lowestSyllablesData,
    lowestPhonemesData,
    surveyFeedback,
    todayActivities,
    isLoading,
    error,
    getChartTitle
  } = useDashboard()

  const renderChart = (chartId: keyof typeof chartTypes, data: ChartData | null) => {
    if (!data) return <div>No data available</div>
    console.log({ data })
    const ChartComponent = chartTypes[chartId] === 'line' ? Line : Bar
    return <ChartComponent options={chartOptions(getChartTitle(chartId))} data={data} />
  }

  const renderTodayActivities = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-semibold mb-4">¿Qué pasó hoy?</h2>
        <p className="text-gray-600 mb-4">{currentDate}</p>
        <div className="flex justify-between mb-4">
          {['Letras', 'Palabras', 'La Viborita'].map((activity, index) => (
            <div key={index} className="bg-blue-100 rounded-lg p-4 w-[30%] text-center">
              <h3 className="font-semibold mb-2">{activity}</h3>
              <p className="text-2xl font-bold">{todayActivities ? todayActivities[activity.toLowerCase()] || 0 : 0}</p>
              <p className="text-sm text-gray-600">veces jugadas</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate('/profesional/paciente/1/timeline')}
          className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center justify-center w-full"
        >
          Ver más <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    )
  }

  if (isLoading) {
    return <div className="text-center p-4">Cargando datos...</div>
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>
  }

  return (
    <div className="w-full mx-auto lg:p-4">
      <div className="flex items-center mb-6 lg:pt-0 pt-20">
        <div className="flex-center">
          <h1 className="text-3xl font-bold mb-6 text-center">Seguimiento del Progreso de Juan</h1>
        </div>
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={300}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
        isDraggable={true}
        isResizable={true}
      >
        <div key="today" className="bg-white rounded-lg shadow-md overflow-hidden">
          {renderTodayActivities()}
        </div>
        {layout
          .filter((item) => item.i !== 'today' && item.i !== 'feedback')
          .map((item) => (
            <div key={item.i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold">{getChartTitle(item.i)}</h2>
                <select
                  value={chartTypes[item.i as keyof typeof chartTypes]}
                  onChange={(e) => handleChartTypeChange(item.i, e.target.value as 'line' | 'bar')}
                  className="border rounded p-2"
                >
                  <option value="line">Línea</option>
                  <option value="bar">Barra</option>
                </select>
              </div>
              <div className="p-4 h-[calc(100%-4rem)]">
                {renderChart(
                  item.i as keyof typeof chartTypes,
                  {
                    syllables: syllablesData,
                    phonemes: phonemesData,
                    letters: activitiesLettersData,
                    lowestSyllables: lowestSyllablesData,
                    lowestPhonemes: lowestPhonemesData
                  }[item.i as keyof typeof chartTypes]
                )}
              </div>
            </div>
          ))}
        <div key="feedback" className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Feedback del Juego</h2>
          </div>
          <div className="p-4 h-[calc(100%-4rem)]">
            {surveyFeedback && (
              <div className="flex flex-col justify-center h-full">
                <div className="flex justify-around items-center">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Actividad Más Gustada</h3>
                    <p>{surveyFeedback.most_liked_activity.activity_name}</p>
                    <div className="flex items-center justify-center mt-2">
                      <ThumbsUp className="text-green-500 mr-2" />
                      <Star className="text-yellow-500" />
                      <Star className="text-yellow-500" />
                      <Star className="text-yellow-500" />
                      <Star className="text-yellow-500" />
                      <Star className="text-yellow-500" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Actividad Menos Gustada</h3>
                    <p>{surveyFeedback.least_liked_activity.activity_name}</p>
                    <div className="flex items-center justify-center mt-2">
                      <ThumbsDown className="text-red-500 mr-2" />
                      <Star className="text-yellow-500" />
                      <Star className="text-yellow-500" />
                      <Star className="text-gray-300" />
                      <Star className="text-gray-300" />
                      <Star className="text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ResponsiveGridLayout>
    </div>
  )
}
