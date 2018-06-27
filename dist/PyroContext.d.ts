import React from 'react'
import { PyroFormErrors, PyroFormTouched } from './typings'
export declare const getPyroConsumer: <Values extends {}>() => React.StatelessComponent<
  React.ConsumerProps<Partial<PyroContextProps<Values, Extract<keyof Values, string>>>>
>
export declare const PyroProvider: React.ComponentType<
  React.ProviderProps<Partial<PyroContextProps<{}, never>>>
>
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
