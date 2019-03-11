import React from 'react'
import PyroForm, { Form, PyroFormChangeData } from '../'
import { ComplexInput, SimpleInput } from './CustomInput'
import HookInput from './HookInput'

// Only for typescript people
interface InitialValues {
  name: string
  email: string
  password: string
}

// Define initial values for the form
const initialValues = {
  name: '',
  email: '',
  password: '',
}

// Define an onSubmit handler (this is optional, you could also instead define an onChange handler)
const onSubmit = (values: InitialValues) => {
  // tslint:disable-next-line:no-console
  console.log('onSubmit', values)
}

// Define an onChange handler (this is optional, you could also instead define an onSubmit handler)
const onChange = (
  values: InitialValues,
  {
    changedValue,
    changedName,
    onChange: handleChange,
  }: PyroFormChangeData<InitialValues, keyof InitialValues>
) => {
  // tslint:disable-next-line:no-console
  console.log('onChange', values)
  // If someone enters the email 'fake@example.com' we want to reset it
  if (changedName === 'email' && changedValue === 'fake@example.com') {
    handleChange(changedName, '')
  }
}

// PyroForm expects normal react nodes as a child
// Note: If you are not a typescript person you might wonder what these
// weird "<InitialValues>" things in the component are. Just leave them out ;)
export const BasicExample = () => (
  <PyroForm initialValues={initialValues} onSubmit={onSubmit} onChange={onChange}>
    <Form>
      <h1>Basic Example</h1>
      <HookInput<InitialValues> name="name" type="text" />
      <ComplexInput<InitialValues> name="email" type="email" />
      <SimpleInput<InitialValues> name="password" type="password" />
      <button type="submit">Submit</button>
    </Form>
  </PyroForm>
)

// You can also pass in a render function (if you don't know what this is you can
// read more here: https://reactjs.org/docs/render-props.html#using-props-other-than-render)
// to have more fine-grained control over your forms
export const ComplexExample = () => (
  <PyroForm initialValues={initialValues} onSubmit={onSubmit} onChange={onChange}>
    {({ handleSubmit, values }) => (
      <form onSubmit={handleSubmit}>
        <h1>Complex Example</h1>
        <p>{JSON.stringify(values)}</p>
        <HookInput<InitialValues> name="name" type="text" />
        <ComplexInput<InitialValues> name="email" type="email" />
        <SimpleInput<InitialValues> name="password" type="password" />
        <button type="submit">Submit</button>
      </form>
    )}
  </PyroForm>
)
