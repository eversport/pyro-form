import React, { useEffect, useState } from 'react'
import { getValueFromEvent, isEvent, isFunction, isPromise } from './helper'
import { PyroProvider } from './PyroContext'
import { PyroFormErrors } from './typings'

interface PyroFormChangeData<Values, T extends Extract<keyof Values, string>> {
  changedName: T
  changedValue: Values[T]
  onChange: (
    name: T,
    value: Values[T] | (Values[T] extends string ? React.ChangeEvent<{ value: string }> : never)
  ) => void
}

interface PyroFormSubmitData<Values> {
  onChange: <T extends Extract<keyof Values, string>>(
    name: T,
    value: Values[T] | (Values[T] extends string ? React.ChangeEvent<{ value: string }> : never)
  ) => void
}
interface RenderProps<Values> {
  handleSubmit: () => void
  handleChange: <T extends Extract<keyof Values, string>>(
    name: T,
    value: Values[T] | (Values[T] extends string ? React.ChangeEvent<{ value: string }> : never)
  ) => void
  values: Values
  hasErrors: boolean
  errors: PyroFormErrors<Values>
}

interface Props<Values> {
  initialValues: Values
  children: ((renderProps: RenderProps<Values>) => React.ReactNode) | React.ReactNode
  errors?: PyroFormErrors<Values>
  onSubmit?: (values: Values) => void | Promise<void>
  onChange?: (values: Values, actions: PyroFormChangeData<Values, any>) => void | Promise<void>
  onValidate?: (values: Values) => PyroFormErrors<Values>
  onValid?: () => void
  onInvalid?: () => void
}

function createValues<Values, T>(values: Values, value: T): Record<keyof Values, T> {
  return Object.keys(values).reduce(
    (previousValue, currentValue) => ({
      ...previousValue,
      [currentValue]: value,
    }),
    {}
  ) as Record<keyof Values, T>
}

const PyroForm2 = <Values extends {}>({
  initialValues,
  onValidate: handleValidate,
  onSubmit: handleSubmit,
  children,
}: Props<Values>) => {
  const [isMounted, setIsMounted] = useState(true)
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState(createValues(initialValues, false))
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openValidations, setOpenValidations] = useState(0)
  const [submitCount, setSubmitCount] = useState(0)

  const onValidate = React.useCallback(async () => {
    if (!handleValidate) return
    const validateResult = handleValidate(values)

    if (isPromise(validateResult)) {
      setOpenValidations(openValidations + 1)
      await validateResult
      setOpenValidations(openValidations - 1)
    }

    // TODO: Just do if mounted
    setErrors(validateResult)
  }, [])

  const touchValue = React.useCallback((name: keyof Values) => {
    setTouched({
      ...touched,
      name: true,
    })
  }, [])

  const onSubmit = React.useCallback(async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    // Touch all values
    setTouched(createValues(initialValues, true))

    // Execute submit action if defined
    if (handleSubmit) {
      const submitResult = handleSubmit(values)

      // Await async submits
      if (isPromise(submitResult)) {
        setIsSubmitting(true)
        await submitResult
      }
    }

    // TODO: Just do if mounted
    // Indicate a finished submission
    setIsSubmitting(false)
    setSubmitCount(submitCount + 1)
  }, [])

  const onChange = React.useCallback(
    <Name extends keyof Values>(
      name: Name,
      value:
        | Values[Name]
        | (Values[Name] extends string ? React.ChangeEvent<{ value: string }> : never)
    ) => {
      // Check if passed value is an event and use it's value
      const sanitizedValue = isEvent(value) ? getValueFromEvent(value) : value

      // Set updated value
      setValues(oldValues => ({
        ...oldValues,
        [name]: sanitizedValue,
      }))
    },
    []
  )

  const onBlur = React.useCallback((name: keyof Values) => {
    touchValue(name)
  }, [])

  // Trigger validation every time values change
  useEffect(() => {
    // TODO: Should this somehow also do some awaiting
    // TODO: Use low scheduler priority
    onValidate()
  }, [values])

  const contextValue = {
    errors,
    touched,
    values,
    handleBlur: onBlur,
    handleChange: onChange,
    handleSubmit: onSubmit,
  }

  return (
    <PyroProvider value={contextValue}>
      {isFunction(children)
        ? children({
            ...contextValue,
            hasErrors: Object.keys(errors).length !== 0,
          })
        : children}
    </PyroProvider>
  )
}

export default PyroForm2
