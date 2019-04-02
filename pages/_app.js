import App, { Container } from 'next/app'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import { makeStore } from '../src/store-next'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import EN from '../localization/en.json'
import NProgress from 'nprogress'
import Router from 'next/router'

import 'semantic-ui-css/semantic.min.css'
import '~/styles/base.scss'
import 'nprogress/nprogress.css'

Router.events.on('routeChangeStart', url => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class ProdexApp extends App {
  render() {
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