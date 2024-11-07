import Select, { MultiValue } from 'react-select'

interface SelectOption {
  value: string
  label: string
}

interface FilterProps {
  options: SelectOption[]
  selectedValues: string[]
  onChange: (values: string[]) => void
}

const Filter = ({ options, selectedValues, onChange }: FilterProps) => {
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
