import React from 'react'

export const getValueFromEvent = (event: React.SyntheticEvent<{ value: string }>): string =>
  event.currentTarget.value
