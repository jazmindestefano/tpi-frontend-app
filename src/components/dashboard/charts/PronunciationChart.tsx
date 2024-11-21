import { Line } from 'react-chartjs-2'
import { CategoryScale, Chart, LinearScale, LineElement, PointElement } from 'chart.js'
import Select, { MultiValue } from 'react-select'
import { DateFilter } from '@components'
import { PronunciationChartProps, SelectOption } from '@interfaces'
import { usePronunciationChart } from '@hooks'
import { FC } from 'react'
import { lineOptions } from './options'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement)

const PronunciationChart: FC<{ chartData: PronunciationChartProps[] }> = ({ chartData }) => {
  const {
    data,
    setSelectedOptions,
    setSelectedValues,
    groupedData,
    title,
    setStartDate,
    setEndDate,
    startDate,
    endDate,
    selectedOptions
  } = usePronunciationChart({ chartData })

  const handleSelectChange = (newValue: MultiValue<SelectOption>) => {
    const selectedValues = newValue.map((option) => option.value)
    setSelectedOptions(newValue as SelectOption[])
    setSelectedValues(selectedValues)
  }

  const optionsSelect = Object.keys(groupedData).map((value) => ({
    value,
    label: value
  }))

  return (
    <div className="bg-slate-50 p-10 rounded-xl bg-opacity-65">
      <div className="mb-4 flex flex-wrap items-center gap-6">
        <h1 className="text-2xl w-full text-center">{title}</h1>
        <h3 className="mb-2">Filtros de fecha:</h3>
        <DateFilter startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <h3 className="mb-2">Seleccionar opciones:</h3>
        <Select
          isMulti
          options={optionsSelect}
          value={selectedOptions}
          onChange={(newValue) => handleSelectChange(newValue)}
          className="w-full"
        />
      </div>

      <Line data={data} options={lineOptions} className="flex-grow" />
    </div>
  )
}

export default PronunciationChart
