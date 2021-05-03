import * as React from 'react'
import { SecureContext } from './securePage'

const AuthComponent = Component =>
  class WithAuthComponent extends React.Component {
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

export default AuthComponent
