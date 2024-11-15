import { Bar } from 'react-chartjs-2'
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale } from 'chart.js'
import { useRankingChart } from '@hooks'
import { FC } from 'react'
import { barOptions, Filter, RankingProps } from '@components'

ChartJS.register(CategoryScale, LinearScale, BarElement)

const RankingChart: FC<{ chartData: RankingProps[] }> = ({ chartData }) => {
  const { data, title, setSelectedValues, groupedData, selectedValues } = useRankingChart({ chartData })

  const handleSelectChange = (newValue: string[]) => {
    setSelectedValues(newValue)
  }

  const selectOptions = Object.keys(groupedData).map((name) => ({
    value: name,
    label: name
  }))

  return (
    <div className="bg-slate-50 p-6 rounded-3xl bg-opacity-65 w-full">
      <div className="mb-4 flex flex-wrap items-center gap-6">
        <h1 className="text-2xl w-full text-center">{title}</h1>
        <div className="relative flex flex-wrap items-center gap-3">
          <h3 className="text-sm font-medium text-gray-700">Filtros:</h3>

          <div className="w-full">
            <Filter options={selectOptions} selectedValues={selectedValues} onChange={handleSelectChange} />
          </div>
        </div>
      </div>
      <Bar data={data} options={barOptions} className="flex-grow" />
    </div>
  )
}

export default RankingChart
