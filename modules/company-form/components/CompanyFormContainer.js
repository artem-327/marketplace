import { connect } from 'react-redux'
import CompanyForm from './CompanyForm'
import * as Actions from '../actions'

function mapStateToProps({ businessTypes }) {
  return {
    ...businessTypes
  }
}

export default connect(mapStateToProps, Actions)(CompanyForm)
