import React from 'react'
import { hot } from 'react-hot-loader'
import { BasicExample, ComplexExample } from './BasicExample'

const App = () => (
  <div>
    <BasicExample />
    <ComplexExample />
  </div>
)

export default hot(module)(App)
