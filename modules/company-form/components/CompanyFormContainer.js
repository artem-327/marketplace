import { connect } from 'react-redux'
import CompanyForm from './CompanyForm'
import * as Actions from '../actions'
import { getSafe } from '~/utils/functions'

function mapStateToProps(state, props) {
  return {
    ...state.businessTypes,
    companyId: getSafe(
      () => state.companiesAdmin.popupValues.id,
      getSafe(() => state.auth.identity.company.id, false)
    ),
    selectLogo: props.selectLogo,
    companyLogo: props.companyLogo,
    hasLogo: props.admin
      ? getSafe(() => state.companiesAdmin.popupValues.hasLogo, false)
      : getSafe(() => state.auth.identity.company.hasLogo, false),
    associations: getSafe(() => state.businessTypes.associations, [])
  }
}

export default connect(mapStateToProps, Actions)(CompanyForm)
