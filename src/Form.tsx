import React, { FormHTMLAttributes } from 'react'
import { PyroContext } from './PyroContext'

const Form: React.FC<FormHTMLAttributes<HTMLFormElement>> = props => {
  const context = React.useContext(PyroContext)

  if (!context) {
    // tslint:disable-next-line:no-console
    console.error('Form used in non PyroForm context')
    return null
  }

  return <form onSubmit={context.handleSubmit} {...props} />
}

export default Form
