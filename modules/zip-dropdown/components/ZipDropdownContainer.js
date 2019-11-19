import { connect } from 'react-redux'
import ZipDropdown from './ZipDropdown'
import * as Actions from '../actions'

function mapStateToProps({ zip }) {
  return {
    ...zip
  }
}

export default connect(mapStateToProps, Actions)(ZipDropdown)
