import CasProductsSidebarContent from './CasProductsSidebarContent'
import { connect } from 'react-redux'
// Actions
import { getHazardClassesDataRequest } from '../../../actions'

function mapStateToProps(store) {
    return {}
  }
  
  export default connect(mapStateToProps, { getHazardClassesDataRequest })(CasProductsSidebarContent)