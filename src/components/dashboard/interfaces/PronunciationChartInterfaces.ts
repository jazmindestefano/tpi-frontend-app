export interface GroupedData {
  [key: string]: {
    label: string
    data: number[]
    dates: string[]
  }
}

export interface PronunciationChartData {
  date: string
  value: string
  score: number
  type: string
}

export interface PronunciationChartProps {
  type: string
  data: PronunciationChartData
}
