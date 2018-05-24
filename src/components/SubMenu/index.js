import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Nav from './Nav';

function mapStateToProps(store) {
    return {
        isAuthenticated: store.identity.isAuthenticated,
        identity: store.identity.identity
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch)
}

//connect impure, because activeClassName in NavLink (https://github.com/ReactTraining/react-router/issues/3935)
export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Nav);
