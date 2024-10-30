import { ChartData } from '../interfaces/interfaces'

// INFO: Will disappear when connect with BE
export const staticChartData: ChartData[] = [
  {
    id: 'syllables',
    title: 'Sílabas',
    data: {
      labels: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05', '2024-10-06', '2024-10-07'],
      datasets: [
        {
          label: 'BE',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
        {
          label: 'RA',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }
      ]
    }
  },
  {
    id: 'phonemes',
    title: 'Fonemas',
    data: {
      labels: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05', '2024-10-06', '2024-10-07'],
      datasets: [
        {
          label: 'R',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
        {
          label: 'K',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }
      ]
    }
  },
  {
    id: 'letters',
    title: 'Letras',
    data: {
      labels: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05', '2024-10-06', '2024-10-07'],
      datasets: [
        {
          label: 'A',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
        {
          label: 'M',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }
      ]
    }
  },
  {
    id: 'lowestSyllables',
    title: 'Sílabas con menor puntaje',
    data: {
      labels: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05', '2024-10-06', '2024-10-07'],
      datasets: [
        {
          label: 'BE',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
        {
          label: 'RA',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }
      ]
    }
  },
  {
    id: 'lowestPhonemes',
    title: 'Fonemas con menor puntaje',
    data: {
      labels: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05', '2024-10-06', '2024-10-07'],
      datasets: [
        {
          label: 'BE',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
        {
          label: 'RA',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }
      ]
    }
  }
]

// INFO: Will disappear when connect with BE
export const staticSurveyFeedback = {
  most_liked_activity: { activity_name: 'Letras' },
  least_liked_activity: { activity_name: 'La Viborita' }
}
