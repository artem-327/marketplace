import React from 'react'
import { SecureContext } from './securePage'

export default Component => class WithAuthComponent extends React.Component {
  static contextType = SecureContext

  render() {
    const { auth } = this.context

    return (
      <Component
        {...this.props}
        {...{
          auth: auth,
          isAdmin: auth && auth.isAdmin
        }}
      />
    )
  }
}