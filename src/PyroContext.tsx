import React, { ConsumerProps } from 'react'
import { PyroFormErrors, PyroFormTouched } from './typings'

const { Consumer, Provider } = React.createContext<Partial<PyroContextProps>>({})

export const getPyroConsumer = <Values extends {}>() =>
  (Consumer as any) as React.SFC<
    ConsumerProps<Partial<PyroContextProps<Values, Extract<keyof Values, string>>>>
  >

export const PyroProvider = Provider

export interface PyroContextProps<
  Values = {},
  Name extends Extract<keyof Values, string> = Extract<keyof Values, string>
> {
  values: Values
  errors: PyroFormErrors<Values>
  touched: PyroFormTouched<Values>
  handleChange: (name: Name, value: Values[Name]) => void
  handleBlur: (name: Name) => void
}
