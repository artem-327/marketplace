import React from 'react'
import Router from 'next/router'

// import { getUserFromServerCookie, getUserFromLocalCookie } from '~/utils/auth'
import { getAuthFromServerCookie, getAuthFromLocalCookie } from '~/utils/auth'

export default Page => class DefaultPage extends React.Component {
  static getInitialProps(ctx) {
    const auth = process.browser ? getAuthFromLocalCookie() : getAuthFromServerCookie(ctx.req)
    const pageProps = Page.getInitialProps && Page.getInitialProps(ctx)

    return {
      ...pageProps,
      currentUrl: ctx.pathname,
      isAuthenticated: !!auth,
      auth
    }
  }

  logoutEvent = (eve) => {
    if (eve.key === 'logout') {
      Router.push(`/auth/logout?auto=true`)
    }
  }

  componentDidMount() {
    window.addEventListener('storage', this.logoutEvent, false)
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.logoutEvent, false)
  }

  render() {
    return (
      <Page {...this.props} />
    )
  }
}