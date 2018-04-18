import {connect} from 'react-redux';
import AddInventory from './AddInventory';
import {bindActionCreators} from 'redux'
import {sendMessage} from "../../../modules/contact";


function mapStateToProps(store) {
    return {

    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({sendMessage}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddInventory);
