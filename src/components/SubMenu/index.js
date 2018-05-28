import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import SubMenu from './SubMenu';

function mapStateToProps(store) {
    return {}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SubMenu);
