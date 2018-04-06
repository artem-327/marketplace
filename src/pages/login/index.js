import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Login from './Login';
import { login } from '../../modules/identity'


function mapStateToProps(store) {
    return {
        formStatus:{
            isValid:store.identity.identity.isValid,
            isFetching:store.identity.identity.isFetching,
            hasError:store.identity.identity.hasError,
        }
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({login}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
