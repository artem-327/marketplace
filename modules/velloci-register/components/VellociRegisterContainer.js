import { connect } from 'react-redux'
import VellociRegister from './VellociRegister'
import { getSafe } from '~/utils/functions'
import * as Actions from '../actions'

const mapStateToProps = store => {
  let identity = store.admin.company ? { company: store.admin.company } : store.auth.identity
  return {
    activeStep: store.vellociRegister.activeStep,
    identity
  }
}

export default connect(mapStateToProps, Actions)(VellociRegister)
