import { connect } from 'react-redux'
import DwollaRegister from './DwollaRegister'
import { getBusinessClassifications, postDwollaAccount } from '~/modules/settings/actions'
import { getBusinessTypes } from '~/modules/company-form/actions'

const mapStateToProps = (store) => ({
  identity: store.auth.identity,
  businessTypes: store.businessTypes,
  businessClassifications: store.settings.businessClassifications,
  dwollaSaving: store.settings.dwollaSaving
})

const mapDispatchToProps = {
  getBusinessClassifications,
  getBusinessTypes,
  postDwollaAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(DwollaRegister)
