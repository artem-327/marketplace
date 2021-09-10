import { connect } from 'react-redux'
//Components
import LoginForm from './LoginForm'
//Actions
import * as Actions from '../actions'

const stateToProps = ({ auth: { loginForm, identity, twoFactorAuthSession } }) => (
  {
    ...loginForm,
    identity,
    twoFactorAuthSession
  }
)

export default connect(stateToProps, Actions)(LoginForm)
