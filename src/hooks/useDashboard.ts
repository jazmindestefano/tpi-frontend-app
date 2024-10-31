import { SyllableDashboard } from '@/components'
import { useSurveyFeedbackForDashboard, useSyllableDashboard } from '@/hooks/queries'
import { ChartData } from '@/interfaces/interfaces'
import { useEffect, useState } from 'react'

const transformSyllableData = (data: SyllableDashboard[]): ChartData => {
  const groupedData: Record<string, Record<string, number[]>> = {}

  data.forEach(({ date, value, score }) => {
    const dateKey = date.split(' ')[0] // Extraer solo la fecha

    // Inicializar el grupo para la fecha si no existe
    if (!groupedData[dateKey]) {
      groupedData[dateKey] = {}
    }

    // Inicializar el puntaje para la sílaba si no existe
    if (!groupedData[dateKey][value]) {
      groupedData[dateKey][value] = []
    }

    // Agregar el puntaje al grupo correspondiente
    groupedData[dateKey][value].push(score)
  })

  const labels = Object.keys(groupedData)
  const datasets: ChartData['data']['datasets'] = []
  const syllables = new Set<string>()

  for (const dateKey in groupedData) {
    for (const syllable in groupedData[dateKey]) {
      syllables.add(syllable)
    }
  }

  syllables.forEach((syllable) => {
    const dataPoints = labels.map((label) => {
      const scores = groupedData[label][syllable] || []
      // Puedes elegir cómo manejar los puntajes. Aquí se mantiene un array.
      return scores.length > 0 ? scores : [0] // Mantiene los puntajes individuales o un 0 si no hay puntajes
    })

    datasets.push({
      label: syllable.toUpperCase(),
      data: dataPoints.flat(), // Aplanar el array para usarlo en el gráfico
      borderColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
      backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`
    })
  })

  return {
    id: 'syllables',
    title: 'Sílabas',
    data: {
      labels,
      datasets
    }
  }
}

const useDashboard = (selectedPatientId: number) => {
  const {
    data: surveyFeedbackData,
    error: surveyFeedbackError,
    isLoading: surveyFeedbackLoading
  } = useSurveyFeedbackForDashboard(selectedPatientId)
  const { data: syllableData } = useSyllableDashboard(selectedPatientId)
  const [chartData, setChartData] = useState<ChartData[] | null>(null)

  useEffect(() => {
    if (syllableData) {
      setChartData([transformSyllableData(syllableData as SyllableDashboard[])])
    } else {
      setChartData(null)
    }
  }, [syllableData])

  return {
    surveyFeedbackData,
    surveyFeedbackError,
    surveyFeedbackLoading,
    chartData
  }
}

export default useDashboard
