import React from 'react'
import { PyroFieldInnerRenderProps } from './PyroField'

export interface PyroFormValues {
  [key: string]: any
}
export type PyroFormErrors<Values extends {}> = Partial<{ [key in keyof Values]: string }>
export type PyroFormTouched<Values extends {}> = { [key in keyof Values]: boolean }

export interface PyroFieldProps<Values = any, Name extends Extract<keyof Values, string> = any> {
  name: Name
  children: (props: PyroFieldInnerRenderProps<Values, Name>) => React.ReactNode
}

export interface PyroFormChangeData<Values, T extends Extract<keyof Values, string>> {
  changedName: T
  changedValue: Values[T]
  onChange: (
    name: T,
    value: Values[T] | (Values[T] extends string ? React.ChangeEvent<{ value: string }> : never)
  ) => void
}

export interface PyroFormSubmitData<Values> {
  onChange: <T extends Extract<keyof Values, string>>(
    name: T,
    value: Values[T] | (Values[T] extends string ? React.ChangeEvent<{ value: string }> : never)
  ) => void
}

export interface RenderProps<Values> {
  handleSubmit: () => void
  handleChange: <T extends Extract<keyof Values, string>>(
    name: T,
    value: Values[T] | (Values[T] extends string ? React.ChangeEvent<{ value: string }> : never)
  ) => void
  values: Values
  hasErrors: boolean
  isSubmitting: boolean
  errors: PyroFormErrors<Values>
}

export interface PyroFormProps<Values> {
  initialValues: Values
  children: ((renderProps: RenderProps<Values>) => React.ReactNode) | React.ReactNode
  errors?: PyroFormErrors<Values>
  onSubmit?: (values: Values) => void | Promise<void>
  onChange?: (values: Values, actions: PyroFormChangeData<Values, any>) => void | Promise<void>
  onValidate?: (values: Values) => PyroFormErrors<Values>
  onValid?: () => void
  onInvalid?: () => void
}
