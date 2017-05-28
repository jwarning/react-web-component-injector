import React from 'react'
import ReactDOM from 'react-dom'
import { componentInit } from '../dist/index'
import CustomComponent from './CustomComponent'
import OtherComponent from './OtherComponent'

componentInit(
  {
    'custom-component': CustomComponent,
    'other-component': OtherComponent
  },
  {
    testProp: 'hi there'
  }
)
