import React from 'react'
import { getPyroConsumer, PyroContextProps } from './PyroContext'

interface PyroFieldProps<Values, Name extends keyof Values> {
  name: Name
  children: (props: PyroFieldInnerRenderProps<Values, Name>) => React.ReactNode
}

interface PyroFieldInnerProps<Values, Name extends keyof Values>
  extends PyroFieldProps<Values, Name>,
    Partial<PyroContextProps<Values, Name>> {}

export interface PyroFieldInnerRenderProps<Values, Name extends keyof Values> {
  core: {
    name: Name
    value: Values[Name]
    onChange: (value: Values[Name]) => void
    onBlur: () => void
  }
  meta: {
    error?: string
    hasError: boolean
    touched: boolean
  }
}

class PyroFieldInner<Values, Name extends keyof Values> extends React.PureComponent<
  PyroFieldInnerProps<Values, Name>
> {
  public render() {
    if (!this.props.values || !this.props.errors || !this.props.touched) {
      throw new Error('Please use PyroField Components only within a PyroForm')
    }

    return this.props.children({
      core: {
        name: this.props.name,
        value: this.props.values[this.props.name],
        onChange: this.handleChange,
        onBlur: this.handleBlur,
      },
      meta: {
        error: this.props.errors[this.props.name],
        hasError: Boolean(this.props.errors[this.props.name]),
        touched: this.props.touched[this.props.name],
      },
    })
  }

  private handleChange = (value: Values[Name]) => {
    this.props.handleChange && this.props.handleChange(this.props.name, value)
  }

  private handleBlur = () => {
    this.props.handleBlur && this.props.handleBlur(this.props.name)
  }
}

export class PyroField<Values> extends React.PureComponent<PyroFieldProps<Values, keyof Values>> {
  private PyroConsumer = getPyroConsumer<Values>()

  public render() {
    return (
      <this.PyroConsumer>
        {contextProps => <PyroFieldInner<Values, keyof Values> {...this.props} {...contextProps} />}
      </this.PyroConsumer>
    )
  }
}
