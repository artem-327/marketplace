import React, { Component } from "react";
import "./Users.css";
import User from "./components/User";
import DataTable from "../../../components/DataTable";

class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  renderUsers() {
    return this.props.users.map(user => {
      return (
        <User
          key={user.id}
          {...user}
          fetchOffices={this.props.fetchOffices}
          promoteToOperator={this.props.promoteToOperator}
          promoteToMerchant={this.props.promoteToMerchant}
          offices={this.props.offices}
          isFetching={this.props.isFetchingOffices}
        />
      );
    });
  }

  render() {
    return (
      <DataTable
        id="users"
        sortFunc={nameColumn => console.log(nameColumn)}
        headerInit={[
          { name: "Company" },
          { name: "Company Office" },
          { name: "Username" },
          { name: "Last Name" },
          { name: "First Name" },
          { name: "Roles" },
        ]}
        rows={[]}
      />
      // <div >
      //     <h1 className="header">New users administration</h1>
      //     <table className="admin-users-new">
      //     <thead>
      //         <tr>
      //             <th>First Name</th>
      //             <th>Middle Name</th>
      //             <th>Last Name</th>
      //             <th>Email</th>
      //             <th className="settings"></th>
      //         </tr>
      //         </thead>
      //         <tbody>
      //         {this.renderUsers()}
      //         </tbody>
      //     </table>
      // </div>
    );
  }
}

export default Users;
