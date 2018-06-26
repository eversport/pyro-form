import React from 'react'
import { PyroFieldInnerRenderProps } from './PyroField'
export interface PyroFormValues {
  [key: string]: any
}
export declare type PyroFormErrors<Values extends {}> = Partial<{ [key in keyof Values]: string }>
export declare type PyroFormTouched<Values extends {}> = { [key in keyof Values]: boolean }
export interface PyroFieldProps<Values = any, Name extends Extract<keyof Values, string> = any> {
  name: Name
  children: (props: PyroFieldInnerRenderProps<Values, Name>) => React.ReactNode
}
