# React Web Component Injector

** Note: these docs are still a work in progress **

React Web Component Injector provides a way to utilise your React components a bit like web components. It works by injecting your custom React components into their corresponding custom html components on the page and then letting React take over from there as usual. This provides a slightly different approach to rendering a React app over the more conventional way of defining a single root component on the page that renders the entire app.

## Why

The main reason this may be useful is when React is used alongside other technologies or in large codebases that cannot easily be entirely converted to a unified React app in one go. A common example may be a large CMS based site where a lot of the content needs to be managed and edited in a WYSIWYG fashion. Various templates or components may already be written and simply exist as plain HTML and CSS layouts. The backend of the system may not be written in JS and server side rendering for your components is not an option at this point. You want to use React for more complex and dynamic pages or sections of content but without losing the ease of editing the content of the CMS driven site.

React web component injector aims to make this process a little bit easier by providing a way of simply declaring your custom React components in CMS based fields where HTML can be inserted and then simply automatically injecting the corresponding component at runtime when the page is loaded. Your components and codebase can exist as JS or CSS files within the CMS system and then get loaded wherever necessary, only ever rendering any relevant components.

## Example Usage

Let's say we declare a custom html component called my-component:

```html
<my-component>
  Hello World
</my-component>
```

and a React component like this:

```javascript
import React, { Component } from 'react'

class MyComponent extends Component {
  render() {
    return (
      <div>
        <h3>Hello from MyComponent!</h3>
        {this.props.children}
      </div>
    )
  }
}

export default MyComponent
```

then when we run the following code on the page:

```javascript
import { inject } from 'react-web-component-injector'
import MyComponent from './MyComponent'

inject({
  'my-component': MyComponent
})
```

the original component will be replaced by a React controlled component at the same place that also renders the inner text that was inside it.

## API

###### `inject(componentList, globalProps)`

The inject methods take a map of your custom components in the format of:

```javascript
{
  'custom-selector': ReactComponent,
  'super-awesome-component': SuperAwesomeComponent
}
```

and an optional map of global props which will get injected into all the components:

```javascript
{
  myProp: 'value goes here',
  anotherProp: 12345
}
```

## License

[MIT](./LICENSE)
