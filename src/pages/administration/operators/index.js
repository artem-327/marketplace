import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Operators from './Operators';
import {fetchOperators} from "../../../modules/users";

function mapStateToProps(store) {
    return {
        operators: store.users.operators,
        isFetching: store.users.isFetching
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchOperators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Operators);
