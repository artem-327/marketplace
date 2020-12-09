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
  openPopup,
  getClientCompanyRoles,
  deleteUser
} from '../../../actions'

import { MoreVertical } from 'react-feather'
import { Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'

const DivRow = styled.div`
  display: flex !important;

  > div {
    flex-grow: 0;
    flex-shrink: 0;
  }

  > span {
    flex-grow: 1;
    flex-shrink: 1;
  }
`

const SpanText = styled.span`
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    color: #2599d5;
  }
`

const RowDropdown = styled(Dropdown)`
  display: block !important;
  height: 100% !important;

  &:hover {
    font-weight: bold;
    color: #2599d5;
  }

  .dropdown.icon {
    display: none;
  }
`

const RowDropdownIcon = styled.div`
  width: 16px;
  height: 16px;
  margin: 2px 8px 2px -4px;

  svg {
    width: 16px !important;
    height: 16px !important;
    color: #848893 !important;
  }
`

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

  getActionsByRow = () => {
    const {
      openPopup,
      intl,
      datagrid,
      deleteUser,
      companyId
    } = this.props
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

  getActionItems = (actions = [], row) => {
    if (!getSafe(() => actions.length, false)) return
    return actions.map((a, i) =>
      'hidden' in a && typeof a.hidden === 'function' && a.hidden(row) ? null : (
        <Dropdown.Item
          data-test={`action_${row.id}_${i}`}
          key={i}
          text={typeof a.text !== 'function' ? a.text : a.text(row)}
          disabled={getSafe(() => a.disabled(row), false)}
          onClick={() => a.callback(row)}
        />
      )
    )
  }

  getRows = rows => {
    return rows.map(row => {
      return {
        ...row,
        name: (
          <DivRow>
            <RowDropdown
              trigger={
                <RowDropdownIcon>
                  <MoreVertical />
                </RowDropdownIcon>
              }>
              <Dropdown.Menu>{this.getActionItems(this.getActionsByRow(row), row)}</Dropdown.Menu>
            </RowDropdown>
            <SpanText onClick={() => this.props.openPopup(row.rawData)}>
              {row.name}
            </SpanText>
          </DivRow>
        )
      }
    })
  }

  render() {
    const {
      rows,
      filterValue,
      loading,
      datagrid,
      editedId
    } = this.props

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
        userRoles:
          <ArrayToFirstItem values={user && user.roles && user.roles.length && user.roles.map(r => r.name)} />
      }
    })
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(UsersTable)))

