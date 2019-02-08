import React from 'react'
import { PyroFormValues, usePyroField } from '../'

interface InputProps<Values extends PyroFormValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Extract<keyof Values, string>
}

const HookInput = <Values extends PyroFormValues = any>(props: InputProps<Values>) => {
  const { core, meta } = usePyroField<Values, Extract<keyof Values, string>>(props.name)

  return <input {...props} {...core} />
}

export default HookInput
