'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var React = _interopDefault(require('react'))

const getValueFromEvent = event => event.currentTarget.value
const isEvent = event => event && event.target && typeof event.target.value === 'string'

const { Consumer, Provider } = React.createContext({})
const getPyroConsumer = () => Consumer
const PyroProvider = Provider

const isPromise = value => Boolean(value) && typeof value.then === 'function'
class PyroForm extends React.PureComponent {
  constructor() {
    super(...arguments)
    this.state = {
      values: this.props.initialValues,
      touched: Object.keys(this.props.initialValues).reduce(
        (previousValue, currentValue) =>
          Object.assign({}, previousValue, { [currentValue]: false }),
        {}
      ),
      errors: {},
      isSubmitting: false,
      submitCount: 0,
    }
    this.getPyroFormActions = () => ({})
    this.handleSubmit = async e => {
      if (e) {
        e.preventDefault()
      }
      const { onSubmit } = this.props
      if (onSubmit) {
        const result = onSubmit(this.state.values, this.getPyroFormActions)
        if (isPromise(result)) {
          this.setState({
            isSubmitting: true,
          })
          await result
        }
      }
      this.setState(state => ({
        isSubmitting: false,
        submitCount: state.submitCount + 1,
      }))
    }
    this.handleChange = (name, value) => {
      // Check if passed value is an event and use it's value
      if (isEvent(value)) {
        value = getValueFromEvent(value)
      }
      this.setState(
        state => ({
          values: Object.assign({}, state.values, { [name]: value }),
        }),
        () => {
          this.handleValidate()
          if (this.props.onChange) {
            this.props.onChange(this.state.values, this.getPyroFormActions())
          }
        }
      )
    }
    this.handleBlur = name => {
      this.setTouched(name)
    }
    // @ts-ignore Since the usage of name and value below is also ignored this will throw an unused parameter error
    this.setTouched = name => {
      this.setState(state => ({
        touched: Object.assign({}, state.touched, { [name]: true }),
      }))
    }
    this.isValid = () => {
      return Object.keys(this.state.errors).length === 0
    }
    this.handleValidate = () => {
      const { onValidate, onValid, onInvalid } = this.props
      if (!onValidate) return
      this.setState(
        state => ({
          errors: onValidate(state.values, this.getPyroFormActions()),
        }),
        () => {
          if (this.isValid()) {
            onValid && onValid()
          } else {
            onInvalid && onInvalid()
          }
        }
      )
    }
  }
  componentDidMount() {
    this.handleValidate()
  }
  render() {
    // TODO: Add some error handling here if no children are passed
    const contextValue = {
      values: this.state.values,
      errors: this.state.errors,
      touched: this.state.touched,
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
    }
    return React.createElement(
      PyroProvider,
      { value: contextValue },
      this.props.children({
        handleSubmit: this.handleSubmit,
        values: this.state.values,
        errors: this.state.errors,
        hasErrors: !this.isValid(),
      })
    )
  }
}

class PyroFieldInner extends React.PureComponent {
  constructor() {
    super(...arguments)
    this.handleChange = value => {
      this.props.handleChange && this.props.handleChange(this.props.name, value)
    }
    this.handleBlur = () => {
      this.props.handleBlur && this.props.handleBlur(this.props.name)
    }
  }
  render() {
    if (!this.props.values || !this.props.errors || !this.props.touched) {
      throw new Error('Please use PyroField Components only within a PyroForm')
    }
    return this.props.children({
      core: {
        name: this.props.name,
        value: this.props.values[this.props.name],
        onChange: this.handleChange,
        onBlur: this.handleBlur,
      },
      meta: {
        error: this.props.errors[this.props.name],
        hasError: Boolean(this.props.errors[this.props.name]),
        touched: this.props.touched[this.props.name],
      },
    })
  }
}
class PyroField extends React.PureComponent {
  constructor() {
    super(...arguments)
    this.PyroConsumer = getPyroConsumer()
  }
  render() {
    return React.createElement(this.PyroConsumer, null, contextProps =>
      React.createElement(PyroFieldInner, Object.assign({}, this.props, contextProps))
    )
  }
}

exports.default = PyroForm
exports.PyroField = PyroField
exports.getPyroConsumer = getPyroConsumer
exports.PyroProvider = PyroProvider
exports.getValueFromEvent = getValueFromEvent
exports.isEvent = isEvent
