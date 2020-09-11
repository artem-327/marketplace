import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import moment from 'moment'

import { ArrayToFirstItem, FormattedPhone } from '~/components/formatted-messages/'
import ProdexGrid from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'
// import { TablePopUp } from '~/components/tablePopup'
import confirm from '~/src/components/Confirmable/confirm'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'

import {
  getUsersDataRequest,
  openSidebar,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteUser,
  openRolesPopup,
  userSwitchEnableDisable,
  resendWelcomeEmail,
  setPrimaryUser
} from '../../actions'
import Router from 'next/router'
import { Checkbox, Popup, Label, List, Icon } from 'semantic-ui-react'

const handleSwitchEnabled = id => {
  userSwitchEnableDisable(id)
}

class UsersTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.user' defaultMessage='User'>
              {text => text}
            </FormattedMessage>
          ),
          actions: this.getActions()
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
          width: 120,
          align: 'center'
        }
      ]
    }
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

  getActions = () => {
    const { openSidebar, intl, deleteUser, resendWelcomeEmail, currentUserId, setPrimaryUser } = this.props

    const { formatMessage } = intl
    return [
      {
        text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
        callback: row => openSidebar(row.rawData)
        // hidden: row => currentUserId === row.id
      },
      /* #34139
      {
        text: formatMessage({ id: 'settings.editRoles', defaultMessage: 'Edit Roles' }),
        callback: row => openRolesPopup(row.rawData)
        // hidden: row => currentUserId === row.id
      },
      */
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
          confirm(
            formatMessage({ id: 'confirm.deleteUser', defaultMessage: 'Delete User' }),
            formatMessage(
              { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.rawData.name}?` },
              { item: row.rawData.name }
            )
          ).then(() => deleteUser(row.id, row.rawData.name)),
        hidden: row => currentUserId === row.id
      },
      {
        text: <FormattedMessage id='settings.resendWelcomeEmail' defaultMessage='Resend Welcome Email' />,
        callback: async row => {
          const { value } = await resendWelcomeEmail(row.id)
        },
        hidden: row => !!row.lastLoginAt || currentUserId === row.id
      },
      {
        text: <FormattedMessage id='settings.user.setAsCompPrimUser' defaultMessage='Set as Company Primary User' />,
        callback: async row => {
          const { value } = await setPrimaryUser(this.props.currentCompanyId, row.id)
        },
        hidden: row => !row.isCompanyAdmin || this.props.currentCompanyId === null
      }
    ]
  }

  render() {
    const {
      rows,
      filterValue,
      loading,
      openSidebar,
      openRolesPopup,
      intl,
      datagrid,
      deleteUser,
      resendWelcomeEmail,
      currentUserId,
      setPrimaryUser
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
          columnActions='name'
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getUsersDataRequest,
  openSidebar,
  openRolesPopup,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteUser,
  userSwitchEnableDisable,
  resendWelcomeEmail,
  setPrimaryUser
}

const userEnableDisableStatus = (r, currentUserId) => {
  let id = r.enabled ? 'settings.user.enabled' : 'settings.user.disabled'

  return (
    <div>
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
  const currentUserId = state.settings.currentUser && state.settings.currentUser.id
  return {
    rows: datagrid.rows.map(user => {
      const isCompanyAdmin = (user.roles || []).some(role => role.id === 2)

      return {
        rawData: user,
        name:
          user.id === getSafe(() => state.auth.identity.company.primaryUser.id, '') ? (
            <>
              <Icon name='user crown' style={{ color: '#2599d5' }} />
              <span style={{ fontWeight: '500' }}>{user.name}</span>
            </>
          ) : (
            <div style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
          ),
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
        userRoles: <ArrayToFirstItem values={user && user.roles && user.roles.length && user.roles.map(r => r.name)} />,
        isCompanyAdmin: isCompanyAdmin,
        switchEnable: userEnableDisableStatus(user, currentUserId),
        lastLoginAt: user.lastLoginAt ? moment(user.lastLoginAt).toDate().toLocaleString() : '',
        sellMarketSegments: getSafe(() => user.sellMarketSegments, []),
        buyMarketSegments: getSafe(() => user.buyMarketSegments, [])
      }
    }),
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
    roles: state.settings.roles,
    currentCompanyId: getSafe(() => state.auth.identity.company.id, null)
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(UsersTable)))
