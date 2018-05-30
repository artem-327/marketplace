import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Filter from './Filter';


function mapStateToProps(store) {
    return {}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
