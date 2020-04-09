import { connect } from 'react-redux'
import DwollaRegister from './DwollaRegister'
import { getBusinessClassifications, postDwollaAccount } from '~/modules/settings/actions'
import { getBusinessTypes } from '~/modules/company-form/actions'
import { getCompanyDetails } from '~/modules/admin/actions'
import { getSafe } from '~/utils/functions'

const mapStateToProps = store => {
  let identity = store.admin.company ? { company: store.admin.company } : store.auth.identity
  return {
    identity,
    // adminCompanyId: getSafe(() => store.admin.company)
    businessTypes: store.businessTypes,
    businessClassifications: store.settings.businessClassifications,
    dwollaSaving: store.settings.dwollaSaving,
    isAdmin: getSafe(() => store.auth.identity.isAdmin, false)
  }
}

const mapDispatchToProps = {
  getBusinessClassifications,
  getBusinessTypes,
  postDwollaAccount,
  getCompanyDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(DwollaRegister)
