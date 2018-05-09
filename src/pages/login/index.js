import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Login from './Login';
import { login, getIdentity } from '../../modules/identity'


function mapStateToProps(store) {
    return {
        formStatus:{
            isValid:store.identity.loginForm.isValid,
            isFetching:store.identity.loginForm.isFetching,
            hasError:store.identity.loginForm.hasError,
        }
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({login, getIdentity}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
