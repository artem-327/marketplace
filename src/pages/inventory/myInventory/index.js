import {connect} from 'react-redux';
import MyInventory from './MyInventory';
// import {bindActionCreators} from 'redux'


function mapStateToProps(store) {
    return {

    }
}

function mapDispatchToProps(dispatch){
    // return bindActionCreators({sendMessage}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInventory);
