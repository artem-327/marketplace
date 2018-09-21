import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import UsersNew from './UsersNew';


function mapStateToProps(store) {
    return {

    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersNew);
