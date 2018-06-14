import {connect} from 'react-redux';
import PopUp from './PopUp';
import {removePopup} from "../../modules/popup";
import {bindActionCreators} from 'redux';


function mapStateToProps(store) {
    return {
        components: store.popup.components
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({removePopup}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
