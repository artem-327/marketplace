import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import CompaniesOffices from "./CompaniesOffices";
import {fetchAll} from "../../../modules/companies";


function mapStateToProps(store) {
    return {
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchAll}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesOffices);
