import React from 'react'
import { PyroFieldProps } from './typings'
export interface PyroFieldInnerRenderProps<
  Values = any,
  Name extends Extract<keyof Values, string> = any
> {
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
export declare class PyroField<Values> extends React.PureComponent<
  PyroFieldProps<Values, Extract<keyof Values, string>>
> {
  private PyroConsumer
  render(): JSX.Element
}
