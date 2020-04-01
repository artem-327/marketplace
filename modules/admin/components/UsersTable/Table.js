import React, { Component } from 'react'
import { connect } from 'react-redux'
import {FormattedMessage, injectIntl} from 'react-intl'
import confirm from '~/src/components/Confirmable/confirm'
//import ProdexGrid from '~/components/table'
import ProdexTable from '~/components/table'
import {
  deleteUser,
  getUsersMe,
  userSwitchEnableDisable,
  openPopup,
  getRoles,
  getAdminRoles,
} from '../../actions'
import { withDatagrid } from '~/modules/datagrid'
import { ArrayToFirstItem, FormattedPhone } from '~/components/formatted-messages/'
import moment from 'moment'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'
import { Checkbox, Popup, Label, List } from 'semantic-ui-react'

const handleSwitchEnabled = id => {
  userSwitchEnableDisable(id)
}

class UsersTable extends Component {

  componentDidMount() {
    this.props.getUsersMe()
    if (!this.props.allRoles.length) this.props.getRoles()
    if (!this.props.adminRoles.length) this.props.getAdminRoles()
  }

  render() {
    const {
      intl,
      loading,
      rows,
      datagrid,
      filterValue,
      openPopup,
      deleteUser,
      currentUserId,
      editId,
      adminRoles
    } = this.props

    const { formatMessage } = intl
    const { tableName } = this.props.config
    const { columns } = this.props.config.display

    return (
      <React.Fragment>
        <ProdexTable
          tableName={tableName}
          {...datagrid.tableProps}
          filterValue={filterValue}
          loading={datagrid.loading || loading}
          columns={columns}
          rows={rows}
          rowActions={[
            {
              text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
              callback: row => openPopup(row),
              disabled: row => row.roles.some(role => adminRoles.some(d => role.id === d))
            },
            {
              text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
              disabled: row => currentUserId === row.id || editId === row.id,
              callback: row =>
                confirm(
                  formatMessage({ id: 'confirm.deleteUser', defaultMessage: 'Delete User' }),
                  formatMessage(
                    {
                      id: 'confirm.deleteUser.content',
                      defaultMessage: 'Do you really want to delete user?'
                    }
                  )
                ).then(async () => {
                  try {
                    await deleteUser(row.id)
                    datagrid.removeRow(row.id)
                  } catch (e) {
                    console.log('DELETE ERROR')
                  }
                })
            }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  deleteUser,
  getUsersMe,
  userSwitchEnableDisable,
  openPopup,
  getRoles,
  getAdminRoles,
}

const userEnableDisableStatus = (r, currentUserId) => {
  let id = r.enabled ? 'settings.user.enabled' : 'settings.user.disabled'

  return (
    <div style={{ float: 'right' }}>
      <Popup
        id={r.id}
        trigger={
          <Checkbox
            toggle={true}
            defaultChecked={r.enabled}
            disabled={r.id === currentUserId}
            onChange={() => handleSwitchEnabled(r.id)}
            data-test={`settings_user_enabled_${r.id}_chckb`}
          />
        }
        content={
          r.id === currentUserId ? (
            <FormattedMessage id={id} defaultMessage={`User ${r.enabled ? 'enabled' : 'disabled'}`} />
          ) : (
            <FormattedMessage
              id={`${id}.clickToChange`}
              defaultMessage={
                r.enabled ? '!User enabled. Click to disable user.' : '!User disabled. Click to enable user.'
              }
            />
          )
        }
      />
    </div>
  )
}

const mapStateToProps = (state, { datagrid }) => {
  let cfg = state.admin.config[state.admin.currentTab.name]
  const currentUser = state.admin.currentUser
  const currentUserId = currentUser ? currentUser.id : null

  return {
    config: cfg,
    rows: datagrid.rows.map(user => {
      return {
        id: user.id,
        name: user.name,
        companyName: getSafe(() => user.company.name, ''),
        company: user.company,
        jobTitle: user.jobTitle || '',
        email: user.email,
        phone: user.phone || '',
        phoneFormatted: <FormattedPhone value={user.phone || ''} />,
        homeBranch: user.homeBranch ? user.homeBranch.id : '',
        additionalBranches: (user.additionalBranches ? user.additionalBranches : []).map(d => d.id),
        enabled: user.enabled,
        preferredCurrency: currency,
        //homeBranchName: getSafe(() => user.homeBranch.deliveryAddress.cfName, ''),
        roles: user.roles || [],
        userRoles: <ArrayToFirstItem values={user && user.roles && user.roles.length && user.roles.map(r => r.name)} />,
        switchEnable: userEnableDisableStatus(user, currentUserId),
        lastLoginAt: user.lastLoginAt
          ? moment(user.lastLoginAt)
            .toDate()
            .toLocaleString()
          : ''
      }
    }),
    currentUser,
    currentUserId,
    editId: state.admin.popupValues && state.admin.popupValues.id,
    filterValue: state.admin.filterValue,
    currentTab: state.admin.currentTab,
    loading: state.admin.loading,
    allRoles: state.admin.roles,
    adminRoles: state.admin.adminRoles.map(d => d.id),
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(UsersTable)))
