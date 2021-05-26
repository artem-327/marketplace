/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'
import { injectIntl } from 'react-intl'

import {
  deleteUser,
  getUsersMe,
  userSwitchEnableDisable,
  openSidebar,
  getUserRoles,
  getAdminRoles
} from '../../actions'
import { withDatagrid } from '~/modules/datagrid'
import { ArrayToFirstItem, FormattedPhone } from '~/components/formatted-messages/'
import moment from 'moment'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'

import { COLUMNS } from './Table.constants'

import { getRows } from './Table.services'

const UsersTable = props => {
  // ! ! move to sidebar?
  useEffect(() => {
    props.getUsersMe()
    if (!props.userRoles.length) props.getUserRoles()
    if (!props.adminRoles.length) props.getAdminRoles()
  }, [])

  const { loading, rows, datagrid, editedId } = props

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexTable
        tableName={'admin_users'}
        {...datagrid.tableProps}
        loading={datagrid.loading || loading}
        columns={COLUMNS}
        rows={getRows(rows, props)}
        editingRowId={editedId}
      />
    </div>
  )
}

const mapDispatchToProps = {
  deleteUser,
  getUsersMe,
  userSwitchEnableDisable,
  openSidebar,
  getUserRoles,
  getAdminRoles
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
        lastLoginAt: user.lastLoginAt ? moment(user.lastLoginAt).toDate().toLocaleString() : ''
      }
    }),
    currentUser,
    currentUserId,
    editId: state.companiesAdmin.popupValues && state.companiesAdmin.popupValues.id,
    loading: state.companiesAdmin.loading,
    editedId: state.companiesAdmin.editedId,
    userRoles: state.companiesAdmin.userRoles,
    adminRoles: state.companiesAdmin.adminRoles.map(d => d.id)
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(UsersTable)))
