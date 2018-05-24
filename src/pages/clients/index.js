import {connect} from 'react-redux';
import Clients from './Clients';
import {bindActionCreators} from 'redux'

function mapStateToProps(store) {
    return {}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
