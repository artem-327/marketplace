import { useEffect } from 'react'
import { connect } from 'react-redux'
//Actions
import { logout } from '../actions'

const Logout = props => {
  useEffect(() => {
    const { logout, router } = props
    logout(router.query.auto)
  }, [])

  return null
}

export default connect(() => ({}), { logout })(Logout)
