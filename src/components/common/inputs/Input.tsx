import classNames from 'classnames'
import { Label } from '../labels/Label'

interface InputProps {
  name: string
  id?: string
  placeholder?: string
  label?: string
  type?: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  required?: boolean
}

export const Input: React.FC<InputProps> = ({
  name,
  id,
  placeholder,
  label,
  type = 'text',
  className,
  onChange,
  value,
  required
}) => {
  return (
    <>
      {label ? <Label text={label} htmlFor={name} /> : null}
      <input
        className={classNames('border border-gray-50 rounded-3xl p-2 bg-gray-50 outline-0', className)}
        name={name}
        type={type}
        id={id}
        onChange={onChange}
        value={value}
        required={required}
        placeholder={placeholder}
      />
    </>
  )
}
