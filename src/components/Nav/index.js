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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
