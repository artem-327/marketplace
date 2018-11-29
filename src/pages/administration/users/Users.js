import React, { Component } from "react";
import "./Users.css";
import User from "./components/User";
import DataTable from "../../../components/DataTable";
import Spinner from "../../../components/Spinner/Spinner";

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
    const { users } = this.props;
    if (this.props.users.length === 0) return <Spinner />;
    const rows = users.map(user => {
      const roles = user.roles.map(i => i).join();
      return {
        group: "user", //hack - i dont know how to initialize datatable without group - it doesnt work well... maybe it would be necessary to fix datatable component
        rows: [
          {
            id: user.id,
            data: [
              user.company.name,
              user.office.name,
              user.email,
              user.lastname,
              user.firstname,
              roles
            ]
          }
        ]
      };
    });
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
          { name: "Roles" }
        ]}
        rows={rows}
      />
    );
  }
}

export default Users;
