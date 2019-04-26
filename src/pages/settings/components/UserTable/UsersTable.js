import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexGrid from '~/components/table'
import { Confirm } from 'semantic-ui-react'

import { TablePopUp } from '../../../../../components/tableCells'

import {
  getUsersDataRequest,
  openPopup,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteConfirmation,
  openRolesPopup
} from '../../actions'

class UsersTable extends Component {
  state = {
    columns: [
      { name: 'userName', title: 'User' },
      { name: 'title', title: 'Job Title' },
      { name: 'email', title: 'E-mail' },
      { name: 'phone', title: 'Phone' },
      { name: 'homeBranch', title: 'Home Branch' },
      {
        name: 'allUserRoles',
        title: 'Roles'
      }
    ]
  }

  componentDidMount() {
    this.props.getUsersDataRequest()
  }

  render() {
    const {
      rows,
      filterValue,
      loading,
      openPopup,
      openRolesPopup,
      confirmMessage,
      handleOpenConfirmPopup,
      closeConfirmPopup,
      deleteConfirmation
    } = this.props

    const { columns } = this.state

    return (
      <React.Fragment>
        <Confirm
          size="tiny"
          content="Do you really want to delete user?"
          open={confirmMessage}
          onCancel={closeConfirmPopup}
          onConfirm={deleteConfirmation}
        />
        <ProdexGrid
          filterValue={filterValue}
          columns={columns}
          rows={rows.map(r => ({
            ...r,
            allUserRoles: <TablePopUp row={r} />
          }))}
          loading={loading}
          style={{ marginTop: '5px' }}
          rowActions={[
            { text: 'Edit', callback: row => openPopup(row) },
            {
              text: 'Edit Roles',
              callback: row => openRolesPopup(row)
            },
            { text: 'Delete', callback: row => handleOpenConfirmPopup(row.id) }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getUsersDataRequest,
  openPopup,
  openRolesPopup,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteConfirmation
}

const mapStateToProps = state => {
  return {
    rows: state.settings.usersRows,
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    loading: state.settings.loading
    // roles: state.settings.roles
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersTable)
