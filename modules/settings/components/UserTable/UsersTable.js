import React, { Component } from "react"
import { connect } from "react-redux"
import { injectIntl } from 'react-intl'

import ProdexGrid from "~/components/table"
import { TablePopUp } from "~/components/tablePopup"
import confirm from '~/src/components/Confirmable/confirm'

import {
  getUsersDataRequest,
  openPopup,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteUser,
  openRolesPopup
} from "../../actions"

class UsersTable extends Component {
  state = {
    columns: [
      { name: "name", title: "User" },
      { name: "title", title: "Job Title" },
      { name: "email", title: "E-mail" },
      { name: "phone", title: "Phone" },
      { name: "homeBranch", title: "Home Branch" },
      { name: "allUserRoles", title: "Roles", width: 200 }
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
      intl,
      deleteUser,
      // confirmMessage,
      // handleOpenConfirmPopup,
      // closeConfirmPopup,
      // deleteRowById,
      // currentTab
    } = this.props

    let { columns } = this.state
    const { formatMessage } = intl

    return (
      <React.Fragment>
        <ProdexGrid
          filterValue={filterValue}
          columns={columns}
          rows={rows.map(r => ({
            ...r,
            allUserRoles: <TablePopUp row={r} />
          }))}
          loading={loading}
          style={{ marginTop: "5px" }}
          rowActions={[
            { text: "Edit", callback: row => openPopup(row) },
            { text: "Edit Roles", callback: row => openRolesPopup(row) },
            {
              text: "Delete", callback: row => confirm(
                formatMessage({ id: 'confirm.deleteUser', defaultMessage: 'Delete user' }),
                formatMessage({ id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.name}?` }, { item: row.name })
              ).then(() => deleteUser(row.id))
            }
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
  deleteUser
}

const mapStateToProps = state => {
  return {
    rows: state.settings.usersRows,
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    deleteRowById: state.settings.deleteRowById,
    currentTab: state.settings.currentTab,
    loading: state.settings.loading,
    roles: state.settings.roles
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(UsersTable))
