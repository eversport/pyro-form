import React from 'react'

export const getValueFromEvent = (event: React.SyntheticEvent<{ value: string }>): string =>
  event.currentTarget.value

export const isEvent = (event: any): event is React.SyntheticEvent<{ value: string }> =>
  event && event.target && typeof event.target.value === 'string'

export const isPromise = (value: any): boolean => Boolean(value) && typeof value.then === 'function'

// tslint:disable-next-line:ban-types
export const isFunction = (value: any): value is Function => typeof value === 'function'

export function createValues<Values, T>(values: Values, value: T): Record<keyof Values, T> {
  return Object.keys(values).reduce(
    (previousValue, currentValue) => ({
      ...previousValue,
      [currentValue]: value,
    }),
    {}
  ) as Record<keyof Values, T>
}
