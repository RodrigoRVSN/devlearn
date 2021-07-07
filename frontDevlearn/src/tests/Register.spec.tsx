import React from 'react'
import { render } from '@testing-library/react'
import { Register } from '../pages/Register'

describe('<Register />', () => {
  it('should render the register page', () => {
    const { container } = render(<Register />)
    expect(container).toMatchSnapshot()
  })
})
