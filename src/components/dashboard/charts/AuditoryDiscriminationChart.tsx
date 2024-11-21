import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { barOptions } from './options'
import { Filter } from '@components'
import { AuditoryDiscriminationChartProps, SelectOption } from '@interfaces'
import { useAuditoryDiscriminationChart } from '@hooks'
import { FC } from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const AuditoryDiscriminationChart: FC<{ chartData: AuditoryDiscriminationChartProps[] }> = ({ chartData }) => {
  const { data, setSelectedValues, selectedValues } = useAuditoryDiscriminationChart({ chartData })

  const handleSelectChange = (newValue: string[]) => {
    setSelectedValues(newValue)
  }

  const selectOptions: SelectOption[] = chartData.map(({ activityName }) => ({
    value: activityName,
    label: activityName
  }))

  return (
    <div className="bg-slate-50 py-5 px-10 rounded-3xl bg-opacity-65">
      <div className="mb-4 flex flex-wrap items-center gap-6">
        <h1 className="text-2xl w-full text-center">Discriminación Auditiva de Letras</h1>
        <h3 className="mb-2">Filtros:</h3>
        <div className="w-full">
          <Filter options={selectOptions} selectedValues={selectedValues} onChange={handleSelectChange} />
        </div>
      </div>
      <Bar data={data} options={barOptions} className="flex-grow" />
    </div>
  )
}

export default AuditoryDiscriminationChart
