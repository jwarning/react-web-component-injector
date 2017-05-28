import React, { Component } from 'react'

class OtherComponent extends Component {
  render() {
    return (
      <div>
        <h3>My OtherComponent</h3>
        <div style={{ marginLeft: 20 }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default OtherComponent
