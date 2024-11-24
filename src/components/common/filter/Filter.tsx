import Select, { MultiValue } from 'react-select'
import { FC } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface FilterProps {
  options: SelectOption[]
  selectedValues: string[]
  onChange: (values: string[]) => void
}

const Filter: FC<FilterProps> = ({ options, selectedValues, onChange }) => {
  const handleSelectChange = (newValue: MultiValue<SelectOption>) => {
    const values = newValue ? newValue.map((option) => option.value) : []
    onChange(values)
  }

  return (
    <Select
      isMulti
      options={options}
      value={options.filter((option) => selectedValues.includes(option.value))}
      onChange={handleSelectChange}
      placeholder="Seleccionar filtro"
    />
  )
}

export default Filter
