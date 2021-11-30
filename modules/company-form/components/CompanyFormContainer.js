import { connect } from 'react-redux'
import CompanyForm from './CompanyForm'
import * as Actions from '../actions'
import { getSafe } from '~/utils/functions'

function mapStateToProps(state, props) {
  return {
    ...state.businessTypes,
    companyId: props.companyId,
    w9AttachmentId: props.w9AttachmentId,
    selectLogo: props.selectLogo,
    selectDoc: props.selectDoc,
    companyLogo: props.companyLogo,
    companyDoc: props.companyDoc,
    hasLogo: props.hasLogo,
    hasDoc: props.hasDoc,
    associations: getSafe(() => state.businessTypes.associations, [])
  }
}

export default connect(mapStateToProps, Actions)(CompanyForm)
