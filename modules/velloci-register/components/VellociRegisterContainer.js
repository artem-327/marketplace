import { connect } from 'react-redux'
import VellociRegister from './VellociRegister'
import * as Actions from '../actions'

const mapStateToProps = store => ({
  activeStep: store.vellociRegister.activeStep
})

export default connect(mapStateToProps, Actions)(VellociRegister)
