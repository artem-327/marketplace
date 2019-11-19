import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import Timeout from '~/components/timeout'

export const SecureContext = React.createContext()

const authorize = ctx => {
  const {auth} = nextCookie(ctx)

  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */
  if (ctx.req && !auth) {
    ctx.res.writeHead(302, {Location: '/auth/login'})
    ctx.res.end()
    return
  }

  // We already checked for server. This should only happen on client.
  if (!auth) {
    Router.push('/auth/login')
    return
  }

  return JSON.parse(auth)
}

const securePageHoc = Page =>
  class SecurePage extends React.Component {
    static getInitialProps(ctx) {
      const auth = authorize(ctx)

      const pageProps = Page.getInitialProps && Page.getInitialProps(ctx)

      return {
        ...pageProps,
        currentUrl: ctx.pathname,
        isAuthenticated: !!auth,
        auth
      }
    }

    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired
    }

    logoutEvent = eve => {
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
      const {auth} = this.props

      return (
        <SecureContext.Provider value={{auth}}>
          <Page {...this.props} />
          <Timeout />
        </SecureContext.Provider>
      )
    }
  }

export default Page => securePageHoc(Page)
