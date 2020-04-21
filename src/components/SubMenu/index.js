import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SubMenu from './SubMenu'

function mapStateToProps(store) {
  return {
    filterOpen: store.filter.filter.isOpen
  }
}

export default connect(mapStateToProps)(SubMenu)
