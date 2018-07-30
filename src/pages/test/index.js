import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import TestPage from './Testpage';
import {addPopup} from '../../modules/popup';

function mapStateToProps(store) {
    return {
        identity: store.identity.identity.data
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addPopup, dispatch},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
