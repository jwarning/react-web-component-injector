import React, { Component } from 'react'

class CustomComponent extends Component {
  render() {
    return (
      <div>
        <h3>My CustomComponent</h3>
        <div style={{ marginLeft: 20 }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default CustomComponent
