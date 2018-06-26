import React from 'react'
export declare const getValueFromEvent: (
  event: React.SyntheticEvent<{
    value: string
  }>
) => string
export declare const isEvent: (
  event: any
) => event is React.SyntheticEvent<{
  value: string
}>
