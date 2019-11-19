import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Nav from './Nav'
import {logout} from '../../modules/identity'
import {withRouter} from 'react-router-dom'

function mapStateToProps(store) {
  return {
    isAuthenticated: store.identity.isAuthenticated,
    identity: store.identity.identity
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({logout}, dispatch)
}

//connect impure, because activeClassName in NavLink (https://github.com/ReactTraining/react-router/issues/3935)
export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(withRouter(Nav))
