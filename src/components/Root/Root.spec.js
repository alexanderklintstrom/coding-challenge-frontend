import React from 'react'
import { shallow } from 'enzyme'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Root from './Root'

describe('<Root />', () => {
  const wrap = shallow(<Root />)

  it('contains Router component', () => {
    expect(wrap.find(Router).exists()).toBe(true)
  })

  it('contains Route component', () => {
    const result = wrap.find(Route)
    expect(result.exists()).toBe(true)
  })

  it('contains Route component with path /', () => {
    const result = wrap
      .find(Route)
      .filterWhere(item => item.prop('path') === '/')
    expect(result.exists()).toBe(true)
  })

  it('contains Route component with path /inident/:id', () => {
    const result = wrap
      .find(Route)
      .filterWhere(item => item.prop('path') === '/incident/:id')
    expect(result.exists()).toBe(true)
  })
})
