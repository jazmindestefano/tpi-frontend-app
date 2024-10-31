import { ChartData } from '@/interfaces/interfaces'

export const transformDashboardData = <T extends { date: string; value: string; score: number }>(
  data: T[],
  id: string,
  title: string
): ChartData => {
  // Agrupar los datos por fecha y valor
  const groupedData: Record<string, Record<string, number[]>> = data.reduce(
    (acc, { date, value, score }) => {
      const dateKey = date.split(' ')[0] // Extraer solo la fecha

      // Inicializar el grupo para la fecha si no existe
      if (!acc[dateKey]) {
        acc[dateKey] = {}
      }

      // Inicializar el puntaje para la sílaba/fonema si no existe
      if (!acc[dateKey][value]) {
        acc[dateKey][value] = []
      }

      // Agregar el puntaje al grupo correspondiente
      acc[dateKey][value].push(score)
      return acc
    },
    {} as Record<string, Record<string, number[]>>
  )

  const labels = Object.keys(groupedData)
  const datasets: ChartData['data']['datasets'] = []

  // Crear conjuntos de sílabas/fonemas
  const syllables = new Set<string>()
  for (const dateKey in groupedData) {
    for (const syllable in groupedData[dateKey]) {
      syllables.add(syllable)
    }
  }

  // Generar datasets
  syllables.forEach((syllable) => {
    const dataPoints = labels.map((label) => {
      // Obtener los puntajes para la sílaba actual
      return groupedData[label][syllable] || [0] // Devolver 0 si no hay puntajes
    })

    datasets.push({
      label: syllable.toUpperCase(),
      data: dataPoints.flat(), // Aplanar el array para usarlo en el gráfico
      borderColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
      backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`
    })
  })

  return {
    id,
    title,
    data: {
      labels,
      datasets
    }
  }
}
