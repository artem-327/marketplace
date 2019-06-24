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
  openRolesPopup,
  userSwitchEnableDisable
} from "../../actions"
import Router from "next/router"
import { Checkbox, Popup } from "semantic-ui-react"


const handleSwitchEnabled = (id) => {
  userSwitchEnableDisable(id)
}

class UsersTable extends Component {
  state = {
    columns: [
      { name: "name", title: "User" },
      { name: "title", title: "Job Title" },
      { name: "email", title: "E-mail" },
      { name: "phone", title: "Phone" },
      { name: "homeBranch", title: "Home Branch" },
      { name: "userRoles", title: "Roles", width: 200 },
      { name: "switchEnable", title: "Enable User", width: 120 }
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
          tableName="settings_users"
          filterValue={filterValue}
          columns={columns}
          rows={rows}
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
  deleteUser,
  userSwitchEnableDisable,
}

const userEnableDisableStatus = (r, currentUserId) => (
  <div style={{ float: 'right' }}>
    <Popup id={r.id}
      trigger={
        <Checkbox toggle={true}
          defaultChecked={r.enabled}
          disabled={r.id === currentUserId}
          onChange={() => handleSwitchEnabled(r.id)}
        />
      }
      content={
        r.id === currentUserId ?
          r.enabled ? 'User enabled.' : 'User disabled.' :
          r.enabled ? 'User enabled. Click to disable user.' : 'User disabled. Click to enable user.'
      }
    />
  </div>
)

const mapStateToProps = state => {
  const currentUserId = state.settings.currentUser && state.settings.currentUser.id
  return {
    rows: state.settings.usersRows.map(r => ({
      ...r,
      userRoles: r.allUserRoles.map(rol => (
        rol.name
      )).join(", "),
      switchEnable: userEnableDisableStatus(r, currentUserId),
    })),
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    deleteRowById: state.settings.deleteRowById,
    currentTab: Router && Router.router && Router.router.query && Router.router.query.type ?
      state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
    loading: state.settings.loading,
    roles: state.settings.roles
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(UsersTable))
