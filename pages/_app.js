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
import TagManager from 'react-gtm-module'

const gtmId = process.env.GTM_ID

const tagManagerArgs = { gtmId: gtmId }

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class ProdexApp extends App {

  componentDidMount() {
    if (gtmId) {
      console.log('GTM initialized')
      TagManager.initialize(tagManagerArgs)
    } else {
      console.log('GTM not initialized, GTM ID: '+gtmId)
    }
  }

  render() {
    const { Component, pageProps, store } = this.props

    return (
      <Container>
        <IntlProvider locale="en" messages={EN} textComponent={({children}) => <label>{children}</label>}>
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