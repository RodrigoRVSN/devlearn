import React from 'react'
import { render } from '@testing-library/react'
import { Login } from '../pages/Login'

describe('<Login />', () => {
  it('should render the login page', () => {
    const { container } = render(<Login />)
    expect(container).toMatchSnapshot()
  })
})
