import App, { Container } from 'next/app'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import { makeStore } from '~/store'
import { Provider } from 'react-redux'
import { IntlProvider, FormattedNumber } from 'react-intl'

import EN from '../localization/en.json'
import NProgress from 'nprogress'
import Router, { withRouter } from 'next/router'

import '~/semantic/dist/semantic.css'
import '~/styles/base.scss'
import 'nprogress/nprogress.css'
import shortid from 'shortid'
import { ToastProvider } from 'react-toast-notifications'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class ProdexApp extends App {

  state = {
    key: shortid.generate()
  }

  componentDidMount() {
    Router.events.on('routeChangeComplete', () => this.setState({ key: shortid.generate() }))
  }


  render() {
    const { Component, pageProps, store } = this.props

    return (
      <Container key={this.state.key}>
        <IntlProvider locale="en" messages={EN}>
          <ToastProvider pauseOnHover autoDismiss autoDismissTimeout={10 * 1000}>
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </ToastProvider>
        </IntlProvider>
      </Container>
    )
  }
}

FormattedNumber.defaultProps = {
  minimumFractionDigits: 3
}

export default withRouter(withRedux(makeStore)(ProdexApp))