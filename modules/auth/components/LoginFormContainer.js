import { connect } from 'react-redux'
//Components
import LoginForm from './LoginForm'
//Actions
import * as Actions from '../actions'

const stateToProps = ({ auth: { loginForm, identity } }) => ({ ...loginForm, identity })

export default connect(stateToProps, Actions)(LoginForm)
