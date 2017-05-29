import 'babel-polyfill'
import { parseNode } from './src/parser'

const dev = process.env.NODE_ENV !== 'production'

export function inject(componentList, globalProps) {
  // parse the document body recursively
  [...document.body.childNodes]
    .filter(node => node.nodeType === 1)
    .forEach(node => parseNode(componentList, globalProps, node, true))
}
