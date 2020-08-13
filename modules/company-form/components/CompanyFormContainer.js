import { connect } from 'react-redux'
import CompanyForm from './CompanyForm'
import * as Actions from '../actions'
import { getSafe } from '~/utils/functions'

function mapStateToProps(state, props) {
  return {
    ...state.businessTypes,
    companyId: props.companyId,
    selectLogo: props.selectLogo,
    companyLogo: props.companyLogo,
    hasLogo: props.hasLogo,
    associations: getSafe(() => state.businessTypes.associations, [])
  }
}

export default connect(mapStateToProps, Actions)(CompanyForm)
