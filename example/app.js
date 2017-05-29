import React from 'react'
import ReactDOM from 'react-dom'
import { inject } from '../dist/index'
import CustomComponent from './CustomComponent'
import OtherComponent from './OtherComponent'

inject(
  {
    'custom-component': CustomComponent,
    'other-component': OtherComponent
  },
  {
    testProp: 'hi there'
  }
)
