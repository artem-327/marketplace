import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import TestPage from './Testpage';
import {addPopup} from '../../modules/popup';

function mapStateToProps(store) {
    return {
        identity: store.identity.identity.data,
        comboData: store.products.origin
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addPopup, dispatch},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
