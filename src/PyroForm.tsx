import React from 'react'
import { getValueFromEvent, isEvent } from './helper'
import { PyroContextProps, PyroProvider } from './PyroContext'
import { PyroFormErrors, PyroFormTouched, PyroFormValues } from './typings'

const isPromise = (value: any): boolean => Boolean(value) && typeof value.then === 'function'

// tslint:disable-next-line: no-empty-interface
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
    // TODO: Add some error handling here if no children are passed
    const contextValue: PyroContextProps = {
      values: this.state.values,
      errors: this.state.errors,
      touched: this.state.touched,
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
    }

    return (
      <PyroProvider value={contextValue}>
        {this.props.children({
          handleSubmit: this.handleSubmit,
          values: this.state.values,
          errors: this.state.errors,
          hasErrors: !this.isValid(),
        })}
      </PyroProvider>
    )
  }

  private getPyroFormActions = (): PyroFormActions => ({})

  private handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault()
    }

    const { onSubmit } = this.props

    if (onSubmit) {
      const result = onSubmit(this.state.values, this.getPyroFormActions)

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

  private handleChange = <T extends keyof Values>(
    name: T,
    value: Values[T] | React.ChangeEvent<{ value: string }>
  ) => {
    // Check if passed value is an event and use it's value
    if (isEvent(value)) {
      value = getValueFromEvent(value)
    }

    this.setState(
      state => ({
        values: {
          // @ts-ignore Sadly spreading generic values still not work in typescript
          ...state.values,
          [name]: value,
        },
      }),
      () => {
        this.handleValidate()
        if (this.props.onChange) {
          this.props.onChange(this.state.values, this.getPyroFormActions())
        }
      }
    )
  }

  private handleBlur = <T extends keyof Values>(name: T) => {
    this.setTouched(name)
  }

  // @ts-ignore Since the usage of name and value below is also ignored this will throw an unused parameter error
  private setTouched = <T extends keyof Values>(name: T) => {
    this.setState(state => ({
      touched: {
        // @ts-ignore Sadly spreading generic values still not work in typescript
        ...state.touched,
        [name]: true,
      },
    }))
  }

  private isValid = (): boolean => {
    return Object.keys(this.state.errors).length === 0
  }

  private handleValidate = () => {
    const { onValidate, onValid, onInvalid } = this.props

    if (!onValidate) return

    this.setState(
      state => ({
        errors: onValidate(state.values, this.getPyroFormActions()),
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
