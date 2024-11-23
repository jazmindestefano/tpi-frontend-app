import { ChartOptions } from 'chart.js'

export const barOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  elements: {
    bar: {
      borderRadius: 10
    }
  },
  scales: {
    x: {
      beginAtZero: true
    }
  }
}

export const lineOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      beginAtZero: true
    }
  }
}
