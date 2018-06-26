import React from 'react'
import PyroForm from '../dist'
import { ComplexInput, SimpleInput } from './CustomInput'

// Only for typescript people
interface InitialValues {
  email: string
  password: string
}

// Define initial values for the form
const initialValues = {
  email: '',
  password: '',
}

// Define an onSubmit handler (this is optional, you could also instead define an onChange handler)
const onSubmit = (values: InitialValues) => {
  // tslint:disable-next-line:no-console
  console.log('onSubmit', values)
}

// PyroForm expects a render function as a child (if you don't know what this is you can
// read more here: https://reactjs.org/docs/render-props.html#using-props-other-than-render)
// Note: If you are not a typescript person you might wonder what these
// weird "<InitialValues>" things in the component are. Just leave them out ;)
export const BasicExample = () => (
  <PyroForm initialValues={initialValues} onSubmit={onSubmit}>
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
