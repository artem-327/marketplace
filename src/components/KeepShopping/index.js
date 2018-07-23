import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {removePopup} from "../../modules/popup";
import KeepShopping from './KeepShopping';


function mapDispatchToProps(dispatch){
    return bindActionCreators({removePopup}, dispatch)
}

export default connect(null, mapDispatchToProps)(KeepShopping);
