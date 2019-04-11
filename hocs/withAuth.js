import React from 'react'
import { getAuthFromServerCookie, getAuthFromLocalCookie } from '~/utils/auth'

export default Component => class WithAuthComponent extends React.Component {
  // static getInitialProps(ctx) {
  //   const auth = process.browser ? getAuthFromLocalCookie() : getAuthFromServerCookie(ctx.req)
  //   const initProps = Component.getInitialProps && Component.getInitialProps(ctx)

  //   console.log("init props", auth)

  //   return {
  //     ...initProps,
  //     auth,
  //     isAdmin: auth && auth.isAdmin,
  //     fooo: true
  //   }
  // }

  render() {
    const auth = getAuthFromLocalCookie() || {}

    return <Component auth={auth} isAdmin={auth.isAdmin}  />
  }
}