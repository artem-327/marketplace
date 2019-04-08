import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import defaultPage from './defaultPage'
import IdleTimer from 'react-idle-timer'
import {IDLE_TIMEOUT, refreshToken} from '~/utils/auth'

const securePageHoc = Page => class SecurePage extends React.Component {
  static getInitialProps (ctx) {
    return Page.getInitialProps && Page.getInitialProps(ctx)
  }
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) Router.push('/auth/login')
  }
  
  render () {
    const {isAuthenticated} = this.props
    
    if (!isAuthenticated) {
      return null
    }

    return (
      <>
        <IdleTimer
          timeout={IDLE_TIMEOUT}
          onIdle={() => Router.push(`/auth/logout?auto=true`)}
          onAction={() => refreshToken()}
          throttle={IDLE_TIMEOUT/2}
        />
        <Page {...this.props} />
      </>
    )
  }
}

export default Page => defaultPage(securePageHoc(Page))