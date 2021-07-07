import React from 'react'
import { render } from '@testing-library/react'
import { Admin } from '../pages/Admin'

describe('<Admin />', () => {
  it('should render the admin page', () => {
    const { container } = render(<Admin />)
    expect(container).toMatchSnapshot()
  })
})
