import * as React from 'react'
import classNames from 'classnames'

interface LabelProps {
  text: string
  htmlFor?: string
  className?: string
}

export const Label: React.FC<LabelProps> = ({ text, htmlFor, className = '' }) => {
  return (
    <label className={classNames('block ps-2', className)} htmlFor={htmlFor}>
      {text}
    </label>
  )
}
