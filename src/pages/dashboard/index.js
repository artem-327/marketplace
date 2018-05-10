import {connect} from 'react-redux';
import Dashboard from './Dashboard';
import {bindActionCreators} from 'redux'
import {addLocation} from "../../modules/inventory";


function mapStateToProps(store) {
    return {
        inventory: {location: store.inventory.location}
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addLocation}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
