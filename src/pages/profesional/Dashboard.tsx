import { useState } from 'react'
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
import { ThumbsUp, ThumbsDown, Star } from 'lucide-react'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import useChart from '../../hooks/useChart'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

const ResponsiveGridLayout = WidthProvider(Responsive)

const lineChartOptions = (title: string) => ({
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

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Precisión en Actividades de Letras'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      title: {
        display: true,
        text: 'Precisión (%)'
      }
    }
  }
}

export default function Dashboard() {
  const [layout, setLayout] = useState([
    { i: 'syllables', x: 0, y: 0, w: 6, h: 2 },
    { i: 'phonemes', x: 6, y: 0, w: 6, h: 2 },
    { i: 'letters', x: 0, y: 2, w: 6, h: 2 },
    { i: 'lowestSyllables', x: 6, y: 2, w: 6, h: 2 },
    { i: 'lowestPhonemes', x: 0, y: 4, w: 6, h: 2 },
    { i: 'feedback', x: 6, y: 4, w: 6, h: 2 }
  ])

  const {
    syllablesData,
    phonemesData,
    activitiesLettersData,
    lowestSyllablesData,
    lowestPhonemesData,
    surveyFeedback,
    isLoading,
    error
  } = useChart()

  const renderChart = (chartId: string) => {
    switch (chartId) {
      case 'syllables':
        return syllablesData && <Line options={lineChartOptions('Progreso de Sílabas')} data={syllablesData} />
      case 'phonemes':
        return phonemesData && <Line options={lineChartOptions('Progreso de Fonemas')} data={phonemesData} />
      case 'letters':
        return activitiesLettersData && <Bar options={barChartOptions} data={activitiesLettersData} />
      case 'lowestSyllables':
        return (
          lowestSyllablesData && (
            <Bar
              options={{
                ...barChartOptions,
                plugins: { ...barChartOptions.plugins, title: { display: true, text: 'Sílabas con Menor Puntaje' } }
              }}
              data={lowestSyllablesData}
            />
          )
        )
      case 'lowestPhonemes':
        return (
          lowestPhonemesData && (
            <Bar
              options={{
                ...barChartOptions,
                plugins: { ...barChartOptions.plugins, title: { display: true, text: 'Fonemas con Menor Puntaje' } }
              }}
              data={lowestPhonemesData}
            />
          )
        )
      case 'feedback':
        return (
          surveyFeedback && (
            <div className="flex flex-col justify-center h-full">
              <h2 className="text-2xl font-semibold mb-4">Feedback del Juego</h2>
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
          )
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return <div className="text-center p-4">Cargando datos...</div>
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>
  }

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex items-center mb-6">
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
        {layout.map((item) => (
          <div key={item.i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">
                {item.i === 'syllables' && 'Avance de Puntaje por Sílaba'}
                {item.i === 'phonemes' && 'Avance de Puntaje por Fonema'}
                {item.i === 'letters' && 'Precisión en Actividades de Letras'}
                {item.i === 'lowestSyllables' && 'Sílabas con Menor Puntaje'}
                {item.i === 'lowestPhonemes' && 'Fonemas con Menor Puntaje'}
                {item.i === 'feedback' && 'Feedback del Juego'}
              </h2>
            </div>
            <div className="p-4 h-[calc(100%-4rem)]">{renderChart(item.i)}</div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}
