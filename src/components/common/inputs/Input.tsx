import classNames from 'classnames'
import { Label } from '../labels/Label'
import { Eye, EyeOff } from 'lucide-react'
import { ChangeEvent, FC } from 'react'

interface InputProps {
  name: string
  id?: string
  placeholder?: string
  label?: string
  type?: string
  className?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string
  required?: boolean
  multiple?: boolean
  showToggle?: boolean
  onToggleClick?: () => void
  toggleState?: boolean
  dataTestId?: string
}

export const Input: FC<InputProps> = ({
  name,
  id,
  placeholder,
  label,
  type = 'text',
  className,
  onChange,
  value,
  required,
  multiple = false,
  showToggle = false,
  onToggleClick,
  toggleState = false,
  dataTestId = ''
}) => {
  return (
    <div className="relative w-full space-y-4">
      {label ? <Label text={label} htmlFor={name} className="flex justify-center items-center w-full" /> : null}
      <input
        data-testid={dataTestId}
        multiple={multiple}
        className={classNames('border border-gray-50 rounded-3xl p-2 pr-10 bg-gray-50 outline-0 w-full', className)}
        name={name}
        type={type}
        id={id}
        onChange={onChange}
        value={value}
        required={required}
        placeholder={placeholder}
      />
      {showToggle && onToggleClick && (
        <div className="absolute inset-y-9 right-0 flex items-center pr-3 cursor-pointer place-content-center">
          <button onClick={onToggleClick} className="focus:outline-none">
            {toggleState ? <Eye /> : <EyeOff />}
          </button>
        </div>
      )}
    </div>
  )
}
