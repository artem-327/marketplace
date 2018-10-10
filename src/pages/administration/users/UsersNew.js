import React, {Component} from 'react';
import './usersNew.css';
import User from "./components/User";

class UsersNew extends Component {

    componentDidMount(){
        this.props.fetchUsersNew();
    }

    renderUsers(){
        return this.props.users.map((user)=>{
            return <User key={user.id}{...user}
                         fetchOffices={this.props.fetchOffices}
                         promoteToOperator={this.props.promoteToOperator}
                         promoteToMerchant={this.props.promoteToMerchant}
                         offices={this.props.offices}
                         isFetching={this.props.isFetchingOffices}/>
        });
    }

    render(){
        return (
            <div >
                <h1 className="header">New users administration</h1>
                <table className="admin-users-new">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th className="settings"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderUsers()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UsersNew;