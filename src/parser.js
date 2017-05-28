import camelCase from 'lodash/camelCase'
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import React from 'react'
import ReactDOM from 'react-dom'

export function parseNode(componentList, globalProps, node, shouldMount) {
  // if we are inside a React controlled component and the current node
  // is a text node then we want to return it as a string
  if (!shouldMount && node.nodeType === 3) {
    return node.textContent
  }

  // look for a match in the list of custom defined components
  let match = find(
    componentList,
    (e, key) => node.nodeName.toLowerCase() === key.toLowerCase()
  )

  // if we are inside a React controlled component then match the dom node itself
  if (!match && !shouldMount) match = node

  if (!match) {
    // if we don't have a match then continue parsing the tree
    const childNodes = [...node.childNodes].filter(n => n.nodeType === 1)

    if (childNodes.length > 0) {
      forEach(childNodes, c => parseNode(componentList, globalProps, c, true))
    }

    // if we have reached the end of a branch then return null
    return null
  } else {
    // if the match was successful then either mount or construct the
    // relevant react component here
    let props = {}

    // loop through any props defined on the component instance
    forEach(node.attributes, attribute => {
      // camel case the name of each prop and remove the 'prop-' prefix
      let name = camelCase(attribute.name.replace('prop-', ''))

      // deal with exceptions to the naming scheme
      if (name === 'class') name = 'className'
      else if (name === 'for') name = 'htmlFor'

      let value
      if (attribute.value.match(/^{|\[/)) {
        // value is a json object or array
        value = JSON.parse(attribute.value)
      } else if (attribute.value.trim() === 'true') {
        // convert value to boolean true
        value = true
      } else if (attribute.value.trim() === 'false') {
        // convert value to boolean false
        value = false
      } else {
        // pass value as a string
        value = attribute.value
      }

      props = {
        ...props,
        [name]: value
      }
    })

    if (!shouldMount) {
      // if the component is already a child component
      // return the component instead of mounting it

      return React.createElement(
        match.nodeName ? match.nodeName.toLowerCase() : match,
        { ...(!match.nodeName ? globalProps : {}), ...props },
        ...map([...node.childNodes], c =>
          parseNode(componentList, globalProps, c, false)
        )
      )
    }

    // otherwise render the react root of this branch into the dom

    // map child components
    const children = map([...node.childNodes], c =>
      parseNode(componentList, globalProps, c, false)
    )

    // render the new component
    const tempDiv = document.createElement('div')
    ReactDOM.render(
      React.createElement(match, { ...globalProps, ...props }, ...children),
      tempDiv
    )
    node.parentNode.replaceChild(tempDiv.firstChild, node)
  }
}
