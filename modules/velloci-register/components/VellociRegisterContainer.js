import { connect } from 'react-redux'
import VellociRegister from './VellociRegister'
//Actions
import * as Actions from '../actions'
import { getBusinessClassifications } from '~/modules/settings/actions'
import { getBusinessTypes } from '~/modules/company-form/actions'
//components
import { getSafe } from '~/utils/functions'
import { getIdentity } from '~/modules/auth/actions'

const mapStateToProps = store => ({
  ...store.vellociRegister
})

const mapDispatchToProps = {
  getBusinessClassifications,
  getBusinessTypes,
  getIdentity,
  ...Actions
}

export default connect(mapStateToProps, mapDispatchToProps)(VellociRegister)
