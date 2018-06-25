export interface PyroFormValues {
  [key: string]: any
}
export type PyroFormErrors<Values extends {}> = Partial<{ [key in keyof Values]: string }>
export type PyroFormTouched<Values extends {}> = { [key in keyof Values]: boolean }
