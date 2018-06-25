import React from 'react'
interface PyroFieldProps<Values, Name extends keyof Values> {
  name: Name
  children: (props: PyroFieldInnerRenderProps<Values, Name>) => React.ReactNode
}
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
export declare class PyroField<Values> extends React.PureComponent<
  PyroFieldProps<Values, keyof Values>
> {
  private PyroConsumer
  render(): JSX.Element
}
export {}
