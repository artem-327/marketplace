import { connect } from 'react-redux'
import CompanyForm from './CompanyForm'
import * as Actions from '../actions'
import { getSafe } from '~/utils/functions'

function mapStateToProps(state, props) {
  return {
    ...state.businessTypes,
    companyId: getSafe(() => state.admin.popupValues.id, getSafe(() => state.auth.identity.company.id, false)),
    selectLogo: props.selectLogo,
    companyLogo: props.companyLogo
  }
}

export default connect(mapStateToProps, Actions)(CompanyForm)
