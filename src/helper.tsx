import React from 'react'

export const getValueFromEvent = (event: React.SyntheticEvent<{ value: string }>): string =>
  event.currentTarget.value

export const isEvent = (event: any): event is React.SyntheticEvent<{ value: string }> =>
  event && event.target && typeof event.target.value === 'string'

export const isPromise = (value: any): boolean => Boolean(value) && typeof value.then === 'function'
