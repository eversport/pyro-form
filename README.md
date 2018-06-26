# Pyro-Form

Pyro-Form is a fast and simple form manager that helps you with managing the state of components in a form. It's also unbelievably small and has **ZERO** external dependencies. Give it a try!

## Why use Pyro-Form

Compact, simple and fast state management in react is hard. Pyro-Form takes away all the worries while still allowing you to hook into every process you want. I allows you to build forms fast, keeps overhead minimal and makes maintainability a breeze. 

You probably think now "Ok I get why I need to use a form manager. But why should I use Pyro-Form and not one of the others out there?"

1) **Pyro form is small** (and in the JS world size does matter) - Since Pyro-Form was built with the overall package size in mind it has zero external dependencies which makes it so small (2kb gzipped 😱). For more information see the size comparison [here](#comparison-with-the-most-popular-form-management-libraries-for-react).

2) **Simple API** - Why make it hard when it can be so easy? The API provides you with all necessary hooks you are used to while not making you worry about them if you don't want to. Also the Field Wrapper Component will allow you to make your components reuseable and easy-to-use with almost no changes to your current codebase.  

3) **100% built in Typescript** - Almost everything is strictly typed. This not only makes it easier for us to provide high-quality and maintainable code for you, but also allows you to use our typings to make your code better. 

#### Comparison with the most popular form management libraries for react
  
| | Redux-Form | Formik | React-Form | Pyro-Form |
| --- | --- | --- | --- | --- |
| **Minified** | 117.5kB | 39.7kB | 113.1kB | **6.2kB** |
| **Minified+Gzipped** | 27.4kB | 11.4kB | 30.1kB | **2.1kB** |

## Installation

Add via [Yarn](https://www.npmjs.com/package/@eversports/pyro-form):
```
yarn add @eversports/pyro-form
```

Add via [NPM](https://www.npmjs.com/package/@eversports/pyro-form):
```
npm i @eversports/pyro-form
```

If you would like us to support other ways of using formik please open an issue.


## Example

Here is a simple example for a login form.

``` jsx harmony
// Define initial values for the form
const initialValues = {
  email: '',
  password: '',
}

// Define an onSubmit handler (this is optional, you could also instead define an onChange handler)
const onSubmit = (values) => {
  console.log('onSubmit', values)
}

// PyroForm expects a render function as a child (if you don't know what this is you can
// read more here: https://reactjs.org/docs/render-props.html#using-props-other-than-render)
export const BasicExample = () => (
  <PyroForm initialValues={initialValues} onSubmit={onSubmit}>
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <h1>Basic Example</h1>
        <ComplexInput name="email" type="email" />
        <SimpleInput name="password" type="password" />
        <button type="submit">Submit</button>
      </form>
    )}
  </PyroForm>
)
```

The referenced inputs look like this:

``` jsx harmony
// Wrap a simple input with the field (PyroField recognices events and pulls there value automatically)
export class SimpleInput extends React.PureComponent {
  public render() {
    return (
      <PyroField name={this.props.name}>
        {({ core }) => <input {...this.props} {...core} />}
      </PyroField>
    )
  }
}

// Wrap a complex input with the field (You can also map the received value manually)
export class ComplexInput extends React.PureComponent {
  public render() {
    return (
      <PyroField name={this.props.name}>
        {({ core }) => (
          <input
            {...this.props}
            {...core}
            onChange={(e) => core.onChange(getValueFromEvent(e))}
          />
        )}
      </PyroField>
    )
  }
}
```

If you want to try more:
 1) Clone the repository: ```git clone git@github.com:eversport/pyro-form.git```
 2) Start the dev server: ```yarn run dev```
 3) Play around in the ```/example``` folder and try crazy stuff 

## Documentation

TODO

## Who already uses Pyro-Form?

- Eversports

## TODO

- [x] Add ts-lint
- [x] Add example
- [ ] Add tests
- [ ] Add documentation
