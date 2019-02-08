import React, { useContext } from 'react'
import { PyroContext, PyroContextProps } from './PyroContext'
import { PyroFieldInnerRenderProps } from './PyroField'
import { PyroFormValues } from './typings'

const usePyroField = <Values extends PyroFormValues, Name extends Extract<keyof Values, string>>(
  name: Name
): PyroFieldInnerRenderProps => {
  const context = useContext<undefined | PyroContextProps<Values, Name>>(PyroContext)

  if (!context) {
    // tslint:disable-next-line:no-console
    throw new Error('usePyroField hook not used in a valid PyroContext')
  }

  return {
    core: {
      name,
      value: context.values[name],
      onChange: (value: Values[Name]) => context.handleChange(name, value),
      onBlur: () => context.handleBlur(name),
    },
    meta: {
      error: context.errors[name],
      hasError: Boolean(context.errors[name]),
      touched: context.touched[name],
    },
  }
}

export default usePyroField
