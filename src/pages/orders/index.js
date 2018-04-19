import {connect} from 'react-redux';
import Orders from './Orders';
import {bindActionCreators} from 'redux'
import {sendMessage} from "../../modules/contact";


function mapStateToProps(store) {
    return {
        formStatus:{
            isValid:store.contact.landingForm.isValid,
            isFetching:store.contact.landingForm.isFetching,
            hasError:store.contact.landingForm.hasError,
        }
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({sendMessage}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
