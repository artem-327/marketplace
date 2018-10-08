import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DataTable from './DataTable';
import {initDataTable} from "../../modules/dataTables";

function mapStateToProps(store, ownProps) {
    return {
        dataTable: store.dataTables[ownProps.id]
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({initDataTable}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
