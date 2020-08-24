import { connect } from 'react-redux'
import VellociRegister from './VellociRegister'
import { getSafe } from '~/utils/functions'
import * as Actions from '../actions'

const mapStateToProps = store => {
  let identity = store.admin.company ? { company: store.admin.company } : store.auth.identity
  return {
    activeStep: store.vellociRegister.activeStep,
    identity,
    // adminCompanyId: getSafe(() => store.admin.company)
    businessTypes: store.businessTypes,
    businessClassifications: store.settings.businessClassifications,
    dwollaSaving: store.settings.dwollaSaving,
    isAdmin: getSafe(() => store.auth.identity.isAdmin, false)
  }
}

export default connect(mapStateToProps, Actions)(VellociRegister)
