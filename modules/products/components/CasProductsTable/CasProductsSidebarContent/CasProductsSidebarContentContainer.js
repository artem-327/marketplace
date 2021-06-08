import CasProductsSidebarContent from './CasProductsSidebarContent'
import { connect } from 'react-redux'
// Actions
import { getHazardClassesDataRequest } from '../../../actions'

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, { getHazardClassesDataRequest })(CasProductsSidebarContent)
