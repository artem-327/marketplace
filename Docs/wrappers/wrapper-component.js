// wrapper-component.js
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(() => ({}), {})

const Component = props => {
  return (
    <React.Fragment>
      <head>
        <link
          type='text/css'
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.css'
        />
      </head>
      <Provider store={store}>
        <BrowserRouter>{props.children}</BrowserRouter>
      </Provider>
    </React.Fragment>
  )
}

export default Component
