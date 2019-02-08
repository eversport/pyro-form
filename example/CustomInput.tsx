import React, { ChangeEvent } from 'react'
import { getValueFromEvent, PyroField, PyroFormValues } from '../'

interface InputProps<Name extends string> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Name
}

// Wrap a simple input with the field (PyroField recognizes events and pulls their value automatically)
export class SimpleInput<
  InitialValuesType extends PyroFormValues = any
> extends React.PureComponent<InputProps<Extract<keyof InitialValuesType, string>>> {
  public render() {
    return (
      <PyroField<InitialValuesType> name={this.props.name}>
        {({ core }) => <input {...this.props} {...core} />}
      </PyroField>
    )
  }
}

// Wrap a complex input with the field (You can also map the received value manually)
export class ComplexInput<
  InitialValuesType extends PyroFormValues = any
> extends React.PureComponent<InputProps<Extract<keyof InitialValuesType, string>>> {
  public render() {
    return (
      <PyroField<InitialValuesType> name={this.props.name}>
        {({ core }) => <input {...this.props} {...core} />}
      </PyroField>
    )
  }
}
