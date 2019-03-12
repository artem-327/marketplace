import App, { Container } from 'next/app'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import {makeStore} from '../src/store-next'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import EN from '../localization/en.json'

class ProdexApp extends App {
  render () {
    const { Component, pageProps, store } = this.props

    return (
      <Container>
        <IntlProvider locale="en" messages={EN}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </IntlProvider>
      </Container>
    )
  }
}

export default withRedux(makeStore)(ProdexApp)