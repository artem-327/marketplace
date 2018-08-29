import {connect} from 'react-redux';
import AddInventory from './AddInventory';
import {bindActionCreators} from 'redux'
import {resetForm} from "../../../utils/functions";

function mapStateToProps() {
    return {}
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        resetForm
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AddInventory);
