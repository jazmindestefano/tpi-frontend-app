import classNames from 'classnames'
import { FC } from 'react'

interface LabelProps {
  text: string
  htmlFor?: string
  className?: string
}

const Label: FC<LabelProps> = ({ text, htmlFor, className = '' }) => {
  return (
    <label className={classNames('block ps-2', className)} htmlFor={htmlFor}>
      {text}
    </label>
  )
}

export default Label
