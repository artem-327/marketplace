import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import TestPage from './Testpage';

function mapStateToProps(store) {
    return {
        identity: store.identity.identity.data
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
