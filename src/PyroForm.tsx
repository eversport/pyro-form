import React, { useEffect, useState } from 'react'
import { createValues, getValueFromEvent, isEvent, isFunction, isPromise } from './helper'
import { PyroProvider } from './PyroContext'
import { PyroFormProps } from './typings'

const PyroForm = <Values extends {}>({
  initialValues,
  onValidate: handleValidate,
  onSubmit: handleSubmit,
  children,
}: PyroFormProps<Values>) => {
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
    setTouched(oldTouched => ({
      ...oldTouched,
      [name]: true,
    }))
  }, [])

  const onSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
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
  }

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
    isSubmitting,
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

export default PyroForm
