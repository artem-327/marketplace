import React, {Component} from 'react'
import './Users.scss'
import User from './components/User'
import DataTable from '../../../components/DataTable'
import Spinner from '../../../components/Spinner/Spinner'

class Users extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  renderUsers() {
    return this.props.users.map(user => {
      return (
        <User
          key={user.id}
          {...user}
          getOffices={this.props.getOffices}
          putPromoteToOperator={this.props.putPromoteToOperator}
          putPromoteToMerchant={this.props.putPromoteToMerchant}
          offices={this.props.offices}
          isFetching={this.props.isFetchingOffices}
        />
      )
    })
  }

  render() {
    const {users} = this.props
    if (this.props.users.length === 0) return <Spinner />
    const rows = users.map(user => {
      const roles = user.roles.map(i => i).join()
      return {
        group: 'user', //hack - i dont know how to initialize datatable without group - it doesnt work well... maybe it would be necessary to fix datatable component
        rows: [
          {
            id: user.id,
            data: [user.company.name, user.office.name, user.email, user.lastname, user.firstname, roles]
          }
        ]
      }
    })
    return (
      <DataTable
        id='users'
        sortFunc={nameColumn => console.log(nameColumn)}
        headerInit={[
          {name: 'company'},
          {name: 'companyOffice'},
          {name: 'username'},
          {name: 'lastName'},
          {name: 'firstName'},
          {name: 'roles'}
        ]}
        contextMenu={[
          {action: id => console.log('edit user with id: ' + id), label: 'editUser'},
          {action: id => console.log('remove user with id: ' + id), label: 'removeUser'}
        ]}
        rows={rows}
      />
    )
  }
}

export default Users
