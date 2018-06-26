import React from 'react'

export const getValueFromEvent = (event: React.SyntheticEvent<{ value: string }>): string =>
  event.currentTarget.value

export const isEvent = (event: any): event is React.SyntheticEvent<{ value: string }> =>
  event && event.target && event.target.value && typeof event.target.value === 'string'
