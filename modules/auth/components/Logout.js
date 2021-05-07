import { useEffect } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions'

const Logout = props => {
  useEffect(() => {
    const { logout, router } = props
    logout(router.query.auto)
  }, [])

  return null
}

export default connect(() => ({}), { logout })(Logout)
