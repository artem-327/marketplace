import { connect } from 'react-redux'
import CompanyForm from './CompanyForm'
import * as Actions from '../actions'
import { getSafe } from '~/utils/functions'

function mapStateToProps(state) {
  return {
    ...state.businessTypes,
    companyId: getSafe(() => state.auth.identity.company.id, false)
  }
}

export default connect(mapStateToProps, Actions)(CompanyForm)
