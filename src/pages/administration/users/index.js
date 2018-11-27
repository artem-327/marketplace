import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Users from './Users';
import {fetchUsersNew, promoteToMerchant, promoteToOperator} from "../../../modules/users";
import {fetchOffices} from "../../../modules/companies";


function mapStateToProps(store) {
    return {
        users: store.users.usersNew,
        isFetchingOffices: store.companies.isFetching,
        offices: store.companies.offices,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchUsersNew, fetchOffices, promoteToMerchant, promoteToOperator}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
