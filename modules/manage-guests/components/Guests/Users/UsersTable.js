import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import moment from 'moment'

import { ArrayToFirstItem, FormattedPhone } from '~/components/formatted-messages/'
import ProdexGrid from '~/components/table'
import ActionCell from '~/components/table/ActionCell'
import { withDatagrid } from '~/modules/datagrid'
// import { TablePopUp } from '~/components/tablePopup'
import confirm from '~/components/Confirmable/confirm'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'

import { openPopup, getClientCompanyRoles, deleteUser } from '../../../actions'

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
          sortPath: 'User.name',
          width: 300,
          allowReordering: false
        },
        {
          name: 'jobTitle',
          title: (
            <FormattedMessage id='global.jobTitle' defaultMessage='Job Title'>
              {text => text}
            </FormattedMessage>
          ),
          //sortPath: 'User.name',
          width: 130
        },
        {
          name: 'email',
          title: (
            <FormattedMessage id='global.email' defaultMessage='E-mail'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'User.email',
          width: 180
        },
        {
          name: 'phoneFormatted',
          title: (
            <FormattedMessage id='global.phone' defaultMessage='Phone'>
              {text => text}
            </FormattedMessage>
          ),
          //sortPath: 'User.phone',
          width: 160
        },
        {
          name: 'homeBranchName',
          title: (
            <FormattedMessage id='global.homeBranch' defaultMessage='Home Branch'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'User.homeBranch.deliveryAddress.cfName',
          width: 180
        },
        {
          name: 'userRoles',
          title: (
            <FormattedMessage id='global.roles' defaultMessage='Roles'>
              {text => text}
            </FormattedMessage>
          ),
          //sortPath: 'User.roles',
          width: 140
        }
      ]
    }
  }

  componentDidMount() {
    const { clientCompanyRoles, getClientCompanyRoles } = this.props
    if (!clientCompanyRoles.length) getClientCompanyRoles()
  }

  getActions = () => {
    const { openPopup, intl, datagrid, deleteUser, companyId } = this.props
    const { formatMessage } = intl

    return [
      {
        text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
        callback: row => openPopup(row.rawData)
        // hidden: row => this.props.editedId === row.id
      },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
          confirm(
            formatMessage({ id: 'confirm.deleteUser', defaultMessage: 'Delete User' }),
            formatMessage(
              { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.rawData.name}?` },
              { item: row.rawData.name }
            )
          ).then(async () => {
            try {
              await deleteUser(row.id, companyId)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          }),
        disabled: row => this.props.editedId === row.id
      }
    ]
  }

  getRows = rows => {
    return rows.map(row => {
      return {
        ...row,
        name: (
          <ActionCell
            row={row}
            getActions={this.getActions}
            content={row.name}
            onContentClick={() => this.props.openPopup(row.rawData)}
          />
        )
      }
    })
  }

  render() {
    const { rows, filterValue, loading, datagrid, editedId } = this.props

    let { columns } = this.state

    return (
      <React.Fragment>
        <div className='flex stretched listings-wrapper'>
          <ProdexGrid
            tableName='manage_guests_users'
            {...datagrid.tableProps}
            filterValue={filterValue}
            columns={columns}
            rows={this.getRows(rows)}
            loading={datagrid.loading || loading}
            style={{ marginTop: '5px' }}
            editingRowId={editedId}
          />
        </div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  openPopup,
  getClientCompanyRoles,
  deleteUser
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    ...state.manageGuests,
    companyId: getSafe(() => state.manageGuests.companyEditValues.id, null),
    rows: datagrid.rows.map(user => {
      return {
        id: user.id,
        rawData: user,
        name: <div style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>,
        jobTitle: user.jobTitle || '',
        email: user.email,
        phone: user.phone || '',
        phoneFormatted: <FormattedPhone value={user.phone} />,
        homeBranchName: getSafe(() => user.homeBranch.deliveryAddress.cfName, ''),
        userRoles: <ArrayToFirstItem values={user && user.roles && user.roles.length && user.roles.map(r => r.name)} />
      }
    })
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(UsersTable)))
