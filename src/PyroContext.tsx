import React, { ConsumerProps } from 'react'
import { PyroFormErrors, PyroFormTouched } from './typings'

export const PyroContext = React.createContext<PyroContextProps<any, any> | undefined>(undefined)

export const getPyroConsumer = <Values extends {}>() =>
  (PyroContext.Consumer as any) as React.FC<
    ConsumerProps<PyroContextProps<Values, Extract<keyof Values, string>>>
  >

export const PyroProvider = PyroContext.Provider

export interface PyroContextProps<
  Values = {},
  Name extends Extract<keyof Values, string> = Extract<keyof Values, string>
> {
  values: Values
  errors: PyroFormErrors<Values>
  touched: PyroFormTouched<Values>
  handleChange: (name: Name, value: Values[Name]) => void
  handleBlur: (name: Name) => void
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void | Promise<void>
}
