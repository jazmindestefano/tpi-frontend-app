import { parse, format } from 'date-fns'

interface DateFilterProps {
  startDate: Date | null
  endDate: Date | null
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>
}

const DateFilter: React.FC<DateFilterProps> = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const handleDateChange = (dateString: string, setDate: React.Dispatch<React.SetStateAction<Date | null>>) => {
    const date = dateString ? parse(dateString, 'yyyy-MM-dd', new Date()) : null
    setDate(date)
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <input
        type="date"
        value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
        onChange={(e) => handleDateChange(e.target.value, setStartDate)}
        className="px-3 py-2 border rounded"
      />
      <input
        type="date"
        value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
        onChange={(e) => handleDateChange(e.target.value, setEndDate)}
        className="px-3 py-2 border rounded"
      />
    </div>
  )
}

export default DateFilter
