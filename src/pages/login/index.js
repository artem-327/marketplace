import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Login from './Login';
import { login, getIdentity, getVersion } from '../../modules/identity'


function mapStateToProps(store) {
    return {
        loginInputs: store.forms.loginForm,
        version: store.forms.version,
        formStatus:{
            isValid:store.identity.loginForm.isValid,
            isFetching:store.identity.loginForm.isFetching,
            hasError:store.identity.loginForm.hasError,
        }
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({login, getIdentity, getVersion}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
