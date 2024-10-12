import React from "react";
import classNames from "classnames";
import {Label} from "./Label.tsx";

interface InputProps {
  name: string
  placeholder?: string
  label?: string
  type?: string
  className?: string,
  onChange?: () => void
}

export const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  label,
  type = 'text',
  className,
  onChange
}) => {
  return (
    <>
    {label ? (<Label text={label} htmlFor={name} />) : null}
    <input className={classNames('border border-gray-50 rounded-3xl p-2 bg-gray-50 outline-0', className)}
           name={name}
           type={type}
           onChange={onChange}
           placeholder={placeholder}/>
    </>
  )
};