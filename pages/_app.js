import App, { Container } from 'next/app'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import { makeStore } from '~/store'
import { Provider } from 'react-redux'
import { IntlProvider, FormattedNumber } from 'react-intl'
import { Formik } from 'formik'

import EN from '../localization/en.json'
import NProgress from 'nprogress'
import Router, { withRouter } from 'next/router'

import '~/semantic/dist/semantic.css'
import '~/styles/base.scss'
import 'nprogress/nprogress.css'
import shortid from 'shortid'
import { ToastProvider } from 'react-toast-notifications'
import TagManager from 'react-gtm-module'
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'react-feather'

const gtmId = process.env.REACT_APP_GTM_ID || 'GTM-MKSVRW4'

const tagManagerArgs = { gtmId: gtmId }

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const ProdexToast = toast => {
  const { appearance, autoDismiss, children, isRunning, transitionState } = toast
  let icon = null
  switch (appearance) {
    case 'error':
      icon = <AlertTriangle />
      break
    case 'success':
      icon = <CheckCircle />
      break
    case 'info':
      icon = <Info />
      break
    case 'warning':
      icon = <AlertCircle />
      break
  }

  return (
    <div
      className={`prodex-toast ${appearance} ${transitionState} ${isRunning ? 'running' : 'stopped'}`}
      onMouseEnter={() => toast.onMouseEnter()}
      onMouseLeave={() => toast.onMouseLeave()}>
      <div role='button' onClick={() => toast.onDismiss()}>
        <X />
      </div>
      {autoDismiss ? <div className='dismiss-bar'></div> : null}
      {icon}
      <div className='toast-content'>{children}</div>
    </div>
  )
}

class ProdexApp extends App {
  componentDidMount() {
    if (gtmId) {
      TagManager.initialize(tagManagerArgs)
    }
  }



  render() {
    const { Component, pageProps, store } = this.props

    return (
      <Container>
        <IntlProvider locale='en' messages={EN} textComponent={({ children }) => <>{children}</>}>
          <ToastProvider pauseOnHover autoDismiss autoDismissTimeout={10 * 1000} components={{ Toast: ProdexToast }}>
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

Formik.defaultProps.validateOnBlur = false

export default withRouter(withRedux(makeStore)(ProdexApp))
