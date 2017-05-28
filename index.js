import 'babel-polyfill'
import { parseNode } from './src/parser'

const dev = process.env.NODE_ENV !== 'production'

export function componentInit(components) {
  // parse the document body recursively
  [...document.body.childNodes]
    .filter(n => n.nodeType === 1)
    .forEach(n => parseNode(components, n, true))
}
