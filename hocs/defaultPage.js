import React from 'react'
import Router from 'next/router'

// import { getUserFromServerCookie, getUserFromLocalCookie } from '~/utils/auth'
import { getTokenFromServerCookie, getTokenFromLocalCookie } from '~/utils/auth'

export default Page => class DefaultPage extends React.Component {
  static getInitialProps(ctx) {
    const token = process.browser ? getTokenFromLocalCookie() : getTokenFromServerCookie(ctx.req)
    const pageProps = Page.getInitialProps && Page.getInitialProps(ctx)
    return {
      ...pageProps,
      // loggedUser,
      currentUrl: ctx.pathname,
      isAuthenticated: !!token
    }
  }

  logout = (eve) => {
    if (eve.key === 'logout') {
      Router.push(`/auth/logout?auto=true`)
    }
  }

  componentDidMount() {
    window.addEventListener('storage', this.logout, false)
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.logout, false)
  }

  render() {
    return (
      <Page {...this.props} />
    )
  }
}