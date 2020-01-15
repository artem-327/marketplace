import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { generateToastMarkup } from '~/utils/functions'
import { withToastManager } from 'react-toast-notifications'
import moment from 'moment'

import { FormattedDateTime, FormattedPhone } from '~/components/formatted-messages/'
import ProdexGrid from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'
// import { TablePopUp } from '~/components/tablePopup'
import confirm from '~/src/components/Confirmable/confirm'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'

import {
  getUsersDataRequest,
  openPopup,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteUser,
  openRolesPopup,
  userSwitchEnableDisable,
  resendWelcomeEmail
} from '../../actions'
import Router from 'next/router'
import { Checkbox, Popup, Label, List } from 'semantic-ui-react'

const handleSwitchEnabled = id => {
  userSwitchEnableDisable(id)
}

class UsersTable extends Component {
  state = {
    columns: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='global.user' defaultMessage='User'>
            {text => text}
          </FormattedMessage>
        )
      },
      {
        name: 'jobTitle',
        title: (
          <FormattedMessage id='global.jobTitle' defaultMessage='Job Title'>
            {text => text}
          </FormattedMessage>
        )
      },
      {
        name: 'email',
        title: (
          <FormattedMessage id='global.email' defaultMessage='E-mail'>
            {text => text}
          </FormattedMessage>
        )
      },
      {
        name: 'phoneFormatted',
        title: (
          <FormattedMessage id='global.phone' defaultMessage='Phone'>
            {text => text}
          </FormattedMessage>
        )
      },
      {
        name: 'homeBranchName',
        title: (
          <FormattedMessage id='global.homeBranch' defaultMessage='Home Branch'>
            {text => text}
          </FormattedMessage>
        )
      },
      {
        name: 'userRoles',
        title: (
          <FormattedMessage id='global.roles' defaultMessage='Roles'>
            {text => text}
          </FormattedMessage>
        ),
        width: 200
      },
      {
        name: 'lastLoginAt',
        title: (
          <FormattedMessage id='global.lastLogin' defaultMessage='Last Login'>
            {text => text}
          </FormattedMessage>
        ),
        width: 200
      },
      {
        name: 'switchEnable',
        title: (
          <FormattedMessage id='global.enableUser' defaultMessage='Enable User'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      }
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
      toastManager,
      currentUserId
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
          tableName='settings_users'
          {...datagrid.tableProps}
          filterValue={filterValue}
          columns={columns}
          rows={rows}
          loading={datagrid.loading || loading}
          style={{ marginTop: '5px' }}
          rowActions={[
            {
              text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
              callback: row => openPopup(row)
              // hidden: row => currentUserId === row.id
            },
            {
              text: formatMessage({ id: 'settings.editRoles', defaultMessage: 'Edit Roles' }),
              callback: row => openRolesPopup(row)
              // hidden: row => currentUserId === row.id
            },
            {
              text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
              callback: row =>
                confirm(
                  formatMessage({ id: 'confirm.deleteUser', defaultMessage: 'Delete User' }),
                  formatMessage(
                    { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.name}?` },
                    { item: row.name }
                  )
                ).then(() => deleteUser(row.id, row.name)),
              hidden: row => currentUserId === row.id
            },
            {
              text: <FormattedMessage id='settings.resendWelcomeEmail' defaultMessage='Resend Welcome Email' />,
              callback: async row => {
                const { value } = await resendWelcomeEmail(row.id)

                toastManager.add(generateToastMarkup(null, value.clientMessage), {
                  appearance: 'success'
                })
              },
              hidden: row => !!row.lastLoginAt || currentUserId === row.id
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

const displayUserRoles = roles => {
  if (!roles) return
  const rolesList = (
    <List>
      {roles.map(rol => (
        <List.Item key={rol.id}>
          <List.Content>{rol.name}</List.Content>
        </List.Item>
      ))}
    </List>
  )

  return roles.map(rol => (
    <Popup
      wide='very'
      data-test='array_to_multiple_list'
      content={rolesList}
      key={rol.id}
      trigger={
        <Label size='small' key={rol.id}>
          {rol.name}
        </Label>
      }
    />
  ))
}

const mapStateToProps = (state, { datagrid }) => {
  const currentUserId = state.settings.currentUser && state.settings.currentUser.id
  return {
    rows: datagrid.rows.map(user => ({
      name: user.name,
      jobTitle: user.jobTitle || '',
      email: user.email,
      phone: user.phone || '',
      phoneFormatted: <FormattedPhone value={user.phone} />,
      homeBranch: user.homeBranch && user.homeBranch.id,
      additionalBranches: user.additionalBranches && user.additionalBranches.map(b => b.id),
      enabled: user.enabled,
      // preferredCurrency: (user.preferredCurrency || {}).id || undefined,
      preferredCurrency: currency,
      homeBranchName: getSafe(() => user.homeBranch.deliveryAddress.cfName, ''),
      permissions: user.roles ? user.roles.name : '', // ! ! array?
      id: user.id,
      allUserRoles: user.roles || [],
      userRoles: displayUserRoles(user.roles),
      switchEnable: userEnableDisableStatus(user, currentUserId),
      lastLoginAt: user.lastLoginAt
        ? moment(user.lastLoginAt)
            .toDate()
            .toLocaleString()
        : ''
    })),
    currentUserId,
    addedItem: state.settings.addedItem,
    editedItem: state.settings.editedItem,
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    deleteRowById: state.settings.deleteRowById,
    currentTab:
      Router && Router.router && Router.router.query && Router.router.query.type
        ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type)
        : state.settings.tabsNames[0],
    loading: state.settings.loading,
    roles: state.settings.roles
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(UsersTable))))
