import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import CompaniesAdmin from "./CompaniesAdmin";
import {createCompany, fetchAll} from "../../../modules/companies";

function mapStateToProps(store) {
    return {
        isFetching: store.companies.isFetching,
        companies: store.companies.data
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchAll, createCompany}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesAdmin);
