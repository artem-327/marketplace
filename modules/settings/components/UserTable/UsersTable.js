import React, { Component } from "react"
import { connect } from "react-redux"
import { injectIntl, FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'

import { FormattedDateTime } from '~/components/formatted-messages/'

import ProdexGrid from "~/components/table"
import { withDatagrid } from '~/modules/datagrid'
// import { TablePopUp } from "~/components/tablePopup"
import confirm from '~/src/components/Confirmable/confirm'


import {
  getUsersDataRequest,
  openPopup,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteUser,
  openRolesPopup,
  userSwitchEnableDisable,
  resendWelcomeEmail
} from "../../actions"
import Router from "next/router"
import { Checkbox, Popup, Label } from "semantic-ui-react"


const handleSwitchEnabled = (id) => {
  userSwitchEnableDisable(id)
}

class UsersTable extends Component {
  state = {
    columns: [
      { name: "name", title: "User" },
      { name: "jobTitle", title: "Job Title" },
      { name: "email", title: "E-mail" },
      { name: "phone", title: "Phone" },
      { name: "homeBranchName", title: "Home Branch" },
      { name: "userRoles", title: "Roles", width: 200 },
      { name: "lastLoginAt", title: "Last Login", width: 200 },
      { name: "switchEnable", title: "Enable User", width: 120 }
    ]
  }

  componentDidUpdate(oldProps) {
    const { addedItem, editedItem, datagrid } = this.props

    if (addedItem !== oldProps.addedItem) {
      datagrid.loadData()
    }

    if (editedItem !== oldProps.editedItem) {
      datagrid.updateRow(editedItem.id, this.getEditedUser)
    }
  }

  componentDidMount() {
    this.props.getUsersDataRequest()
  }

  getEditedUser = () => {
    return this.props.editedItem
  }

  render() {
    const {
      rows,
      filterValue,
      loading,
      openPopup,
      openRolesPopup,
      intl,
      datagrid,
      deleteUser,
      resendWelcomeEmail,
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
          {...datagrid.tableProps}
          filterValue={filterValue}
          columns={columns}
          rows={rows}
          loading={datagrid.loading || loading}
          style={{ marginTop: "5px" }}
          rowActions={[
            { text: formatMessage({ id: 'global.edit', defaultMessage: "Edit" }), callback: row => openPopup(row) },
            { text: formatMessage({ id: 'settings.editRoles', defaultMessage: "Edit Roles" }), callback: row => openRolesPopup(row) },
            {
              text: formatMessage({ id: 'global.delete', defaultMessage: "Delete" }), callback: row => confirm(
                formatMessage({ id: 'confirm.deleteUser', defaultMessage: 'Delete User' }),
                formatMessage({ id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.name}?` }, { item: row.name })
              ).then(() => deleteUser(row.id, row.name))
            },
            {
              text: <FormattedMessage id='settings.resendWelcomeEmail' defaultMessage='Resend Welcome Email' />,
              callback: (row) => resendWelcomeEmail(row.id),
              hidden: row => !!row.lastLoginAt
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
  resendWelcomeEmail
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

const formatDateTime = dt => {
  const s = dt.split('T')
  return (
    s[0] + ' ' + s[1].split('.')[0]
  )
}

const mapStateToProps = (state, { datagrid }) => {
  const currentUserId = state.settings.currentUser && state.settings.currentUser.id
  return {
    rows: datagrid.rows.map(user => ({
      name: user.name,
      jobTitle: user.jobTitle || '',
      email: user.email,
      phone: user.phone || '',
      homeBranch: user.homeBranch && user.homeBranch.id,
      additionalBranches: user.additionalBranches && user.additionalBranches.map(b => b.id),
      enabled: user.enabled,
      preferredCurrency: (user.preferredCurrency || {}).id || 0,
      homeBranchName: user.homeBranch && user.homeBranch.name,
      permissions: user.roles ? user.roles.name : "", // ! ! array?
      id: user.id,
      allUserRoles: user.roles || [],
      userRoles: user.roles && user.roles.map(rol => <Label size="small">{rol.name}</Label>),
      switchEnable: userEnableDisableStatus(user, currentUserId),
      lastLoginAt: user.lastLoginAt ? <FormattedDateTime dateTime={user.lastLoginAt} /> : ''
    })),
    addedItem: state.settings.addedItem,
    editedItem: state.settings.editedItem,
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    deleteRowById: state.settings.deleteRowById,
    currentTab: Router && Router.router && Router.router.query && Router.router.query.type ?
      state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
    loading: state.settings.loading,
    roles: state.settings.roles
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(UsersTable))))
