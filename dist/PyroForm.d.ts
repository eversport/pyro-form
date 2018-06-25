import React from 'react'
import { PyroFormErrors, PyroFormTouched, PyroFormValues } from './typings'
interface PyroFormActions {}
interface RenderProps<Values> {
  handleSubmit: () => void
  values: Values
  hasErrors: boolean
  errors: PyroFormErrors<Values>
}
interface PyroFormProps<Values extends PyroFormValues> {
  initialValues: Values
  children: (renderProps: RenderProps<Values>) => React.ReactNode
  onSubmit?: (values: Values, actions: PyroFormActions) => void | Promise<void>
  onChange?: (values: Values, actions: PyroFormActions) => void | Promise<void>
  onValidate?: (values: Values, actions: PyroFormActions) => PyroFormErrors<Values>
  onValid?: () => void
  onInvalid?: () => void
}
interface PyroFormState<Values> {
  values: Values
  errors: PyroFormErrors<Values>
  touched: PyroFormTouched<Values>
  isSubmitting: boolean
  submitCount: number
}
declare class PyroForm<
  Values extends {
    [key: string]: any
  }
> extends React.PureComponent<PyroFormProps<Values>, PyroFormState<Values>> {
  state: {
    values: Values
    touched: PyroFormTouched<Values>
    errors: {}
    isSubmitting: boolean
    submitCount: number
  }
  componentDidMount(): void
  render(): JSX.Element
  private getPyroFormActions
  private handleSubmit
  private handleChange
  private handleBlur
  private setTouched
  private isValid
  private handleValidate
}
export default PyroForm
