import React from 'react'
import PyroForm from '../dist'
import { ComplexInput, SimpleInput } from './CustomInput'

interface InitialValues {
  email: string
  password: string
}

const initialValues = {
  email: '',
  password: '',
}

const onSubmit = (values: InitialValues) => {
  // tslint:disable-next-line:no-console
  console.log('onSubmit', values)
}

const onChange = (values: InitialValues) => {
  // tslint:disable-next-line:no-console
  console.log('onChange', values)
}

export const BasicExample = () => (
  <PyroForm initialValues={initialValues} onSubmit={onSubmit} onChange={onChange}>
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <h1>Basic Example</h1>
        <ComplexInput<InitialValues> name="email" type="email" />
        <SimpleInput<InitialValues> name="password" type="password" />
        <button type="submit">Submit</button>
      </form>
    )}
  </PyroForm>
)
