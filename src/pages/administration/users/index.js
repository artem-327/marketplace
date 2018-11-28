import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Users from './Users';
import {getUsers, promoteToMerchant, promoteToOperator} from "../../../modules/users";
import {fetchOffices} from "../../../modules/companies";


function mapStateToProps(store) {
    return {
        users: store.users.users,
        isFetchingOffices: store.companies.isFetching,
        offices: store.companies.offices,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getUsers, fetchOffices, promoteToMerchant, promoteToOperator}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
