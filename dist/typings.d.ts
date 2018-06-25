export interface PyroFormValues {
  [key: string]: any
}
export declare type PyroFormErrors<Values extends {}> = Partial<{ [key in keyof Values]: string }>
export declare type PyroFormTouched<Values extends {}> = { [key in keyof Values]: boolean }
