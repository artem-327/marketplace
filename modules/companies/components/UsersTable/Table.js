import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import confirm from '~/src/components/Confirmable/confirm'
import ProdexTable from '~/components/table'
import {
  deleteUser,
  getUsersMe,
  userSwitchEnableDisable,
  openSidebar,
  getUserRoles,
  getClientCompanyRoles,
  getAdminRoles
} from '../../actions'
import { withDatagrid } from '~/modules/datagrid'
import { ArrayToFirstItem, FormattedPhone } from '~/components/formatted-messages/'
import moment from 'moment'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'
import { Checkbox, Popup } from 'semantic-ui-react'

const handleSwitchEnabled = (id, row) => {
  userSwitchEnableDisable(id, row)
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
          width: 180,
          sortPath: 'User.name',
          actions: this.getActions()
        },
        {
          name: 'companyName',
          title: (
            <FormattedMessage id='global.companyName' defaultMessage='Company Name'>
              {text => text}
            </FormattedMessage>
          ),
          width: 180
        },
        {
          name: 'jobTitle',
          title: (
            <FormattedMessage id='global.jobTitle' defaultMessage='Job Title'>
              {text => text}
            </FormattedMessage>
          ),
          width: 130
        },
        {
          name: 'email',
          title: (
            <FormattedMessage id='global.email' defaultMessage='E-mail'>
              {text => text}
            </FormattedMessage>
          ),
          width: 180,
          sortPath: 'User.email'
        },
        {
          name: 'phoneFormatted',
          title: (
            <FormattedMessage id='global.phone' defaultMessage='Phone'>
              {text => text}
            </FormattedMessage>
          ),
          width: 160
        },
        /*
        {
          name: 'homeBranchName',
          title: (
            <FormattedMessage id='global.homeBranch' defaultMessage='Home Branch'>
              {text => text}
            </FormattedMessage>
          ),
          width: 180
        },
        */
        {
          name: 'userRoles',
          title: (
            <FormattedMessage id='global.roles' defaultMessage='Roles'>
              {text => text}
            </FormattedMessage>
          ),
          width: 160
        },
        /*
        {
          name: 'lastLoginAt',
          title: (
            <FormattedMessage id='global.lastLogin' defaultMessage='Last Login'>
              {text => text}
            </FormattedMessage>
          ),
          width: 180
        },
        */
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
  }

  componentDidMount() {
    this.props.getUsersMe()
    if (!this.props.userRoles.length) this.props.getUserRoles()
    if (!this.props.clientCompanyRoles.length) this.props.getClientCompanyRoles()
    if (!this.props.adminRoles.length) this.props.getAdminRoles()
  }

  getActions = () => {
    const { intl, datagrid, openSidebar, deleteUser, currentUserId } = this.props

    const { formatMessage } = intl
    return [
      {
        text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
        callback: row => openSidebar(row)
      },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        disabled: row => currentUserId === row.id || this.props.editedId === row.id,
        callback: row =>
          confirm(
            formatMessage({ id: 'confirm.deleteUser', defaultMessage: 'Delete User' }),
            formatMessage({
              id: 'confirm.deleteUser.content',
              defaultMessage: 'Do you really want to delete user?'
            })
          ).then(async () => {
            try {
              await deleteUser(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          })
      }
    ]
  }

  render() {
    const { loading, rows, datagrid, editedId } = this.props

    return (
      <React.Fragment>
        <ProdexTable
          tableName={'admin_users'}
          {...datagrid.tableProps}
          loading={datagrid.loading || loading}
          columns={this.state.columns}
          rows={rows}
          columnActions='name'
          editingRowId={editedId}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  deleteUser,
  getUsersMe,
  userSwitchEnableDisable,
  openSidebar,
  getUserRoles,
  getClientCompanyRoles,
  getAdminRoles
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
            onChange={() => handleSwitchEnabled(r.id, r)}
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
  const currentUser = state.companiesAdmin.currentUser
  const currentUserId = currentUser ? currentUser.id : null

  return {
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
        lastLoginAt: user.lastLoginAt ? moment(user.lastLoginAt).toDate().toLocaleString() : ''
      }
    }),
    currentUser,
    currentUserId,
    editId: state.companiesAdmin.popupValues && state.companiesAdmin.popupValues.id,
    currentTab: state.companiesAdmin.currentTab,
    loading: state.companiesAdmin.loading,
    editedId: state.companiesAdmin.editedId,
    userRoles: state.companiesAdmin.userRoles,
    clientCompanyRoles: state.companiesAdmin.clientCompanyRoles.map(d => d.id),
    adminRoles: state.companiesAdmin.adminRoles.map(d => d.id)
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(UsersTable)))
