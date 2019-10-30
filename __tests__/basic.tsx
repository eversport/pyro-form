import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import App from '../example/App'

describe('Submit basic', () => {
  it('should call submit function', async () => {
    // Render application
    const { getByText, findByTestId } = render(<App />)

    // Submit form
    fireEvent.click(getByText('Submit basic'))

    // Expect result to be rendered
    expect(await findByTestId('basic-submitted')).toHaveTextContent('Basic submitted')
  })
})
