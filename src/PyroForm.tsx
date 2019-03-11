import React from 'react'
import { getValueFromEvent, isEvent, isFunction, isPromise } from './helper'
import { PyroContextProps, PyroProvider } from './PyroContext'
import { PyroFormErrors, PyroFormTouched, PyroFormValues } from './typings'

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

interface RenderProps<Values> {
  handleSubmit: () => void
  values: Values
  hasErrors: boolean
  errors: PyroFormErrors<Values>
}

interface PyroFormProps<Values extends PyroFormValues> {
  initialValues: Values
  children: ((renderProps: RenderProps<Values>) => React.ReactNode) | React.ReactNode
  errors?: PyroFormErrors<Values>
  onSubmit?: (values: Values, actions: PyroFormSubmitData<Values>) => void | Promise<void>
  onChange?: (values: Values, actions: PyroFormChangeData<Values, any>) => void | Promise<void>
  onValidate?: (values: Values) => PyroFormErrors<Values>
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

class PyroForm<Values extends { [key: string]: any }> extends React.PureComponent<
  PyroFormProps<Values>,
  PyroFormState<Values>
> {
  public state = {
    values: this.props.initialValues,
    touched: Object.keys(this.props.initialValues).reduce(
      (previousValue, currentValue) => ({
        ...previousValue,
        [currentValue]: false,
      }),
      {}
    ) as PyroFormState<Values>['touched'],
    errors: {},
    isSubmitting: false,
    submitCount: 0,
  }

  public componentDidMount() {
    this.handleValidate()
  }

  public render() {
    const { children } = this.props

    const contextValue = {
      values: this.state.values,
      errors: this.getErrors(),
      touched: this.state.touched,
      handleSubmit: this.handleSubmit,
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
    }

    return (
      <PyroProvider value={contextValue}>
        {isFunction(children)
          ? children({
              handleSubmit: this.handleSubmit,
              values: this.state.values,
              errors: this.getErrors(),
              hasErrors: !this.isValid(),
            })
          : children}
      </PyroProvider>
    )
  }

  private getChangeData = <T extends Extract<keyof Values, string>>(
    changedName: T,
    changedValue: Values[T]
  ): PyroFormChangeData<Values, T> => ({
    changedName,
    changedValue,
    onChange: this.handleChange,
  })

  private getSubmitData = (): PyroFormSubmitData<Values> => ({
    onChange: this.handleChange,
  })

  private getErrors = (): PyroFormErrors<Values> => ({ ...this.state.errors, ...this.props.errors })

  private handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault()
    }

    this.setTouchedAll()
    const { onSubmit } = this.props

    if (onSubmit) {
      const result = onSubmit(this.state.values, this.getSubmitData())

      if (isPromise(result)) {
        this.setState({
          isSubmitting: true,
        })
        await result
      }
    }

    this.setState(state => ({
      isSubmitting: false,
      submitCount: state.submitCount + 1,
    }))
  }

  private handleChange = <T extends Extract<keyof Values, string>>(
    name: T,
    value: Values[T] | (Values[T] extends string ? React.ChangeEvent<{ value: string }> : never)
  ) => {
    // Check if passed value is an event and use it's value
    const sanitizedValue = isEvent(value) ? (getValueFromEvent(value) as Values[T]) : value

    this.setState(
      state => ({
        values: {
          ...state.values,
          [name]: sanitizedValue,
        },
      }),
      () => {
        this.handleValidate()
        if (this.props.onChange) {
          this.props.onChange(this.state.values, this.getChangeData(name, sanitizedValue))
        }
      }
    )
  }

  private handleBlur = <T extends Extract<keyof Values, string>>(name: T) => {
    this.setTouched(name)
  }

  private setTouched = <T extends Extract<keyof Values, string>>(name: T) => {
    this.setState(state => ({
      touched: {
        ...state.touched,
        [name]: true,
      },
    }))
  }

  private setTouchedAll = () => {
    for (const key of Object.keys(this.state.values)) {
      this.setTouched(key as Extract<keyof Values, string>)
    }
  }

  private isValid = (): boolean => {
    return Object.keys(this.getErrors()).length === 0
  }

  private handleValidate = <T extends Extract<keyof Values, string>>() => {
    const { onValidate, onValid, onInvalid } = this.props

    if (!onValidate) return

    this.setState(
      state => ({
        errors: onValidate(state.values),
      }),
      () => {
        if (this.isValid()) {
          onValid && onValid()
        } else {
          onInvalid && onInvalid()
        }
      }
    )
  }
}

export default PyroForm
