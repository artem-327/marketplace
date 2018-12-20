import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Users from './Users';
import {getUsers, putPromoteToMerchant, putPromoteToOperator} from "../../../modules/users";
import {getOffices} from "../../../modules/companies";


function mapStateToProps(store) {
    return {
        users: store.users.users,
        isFetchingOffices: store.companies.isFetching,
        offices: store.companies.offices,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getUsers, getOffices, putPromoteToMerchant, putPromoteToOperator}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
