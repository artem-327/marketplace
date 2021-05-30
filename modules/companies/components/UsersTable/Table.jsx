/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

// Components
import ProdexTable from '../../../../components/table'
import { withDatagrid } from '../../../datagrid'

// Actions
import { deleteUser, getUsersMe, userSwitchEnableDisable, openSidebar } from '../../actions'

// Constants
import { COLUMNS } from './Table.constants'

// Services
import { getRows } from './Table.services'

const UsersTable = props => {
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

import {
  makeGetUsersDatagridRows,
  makeGetEditId,
  makeGetLoading,
  makeGetEditedId,
  makeGetUserRoles,
  makeGetAdminRoles
} from '../selectors'

const makeMapStateToProps = () => {
  const getRows = makeGetUsersDatagridRows()
  const getEditId = makeGetEditId()
  const getLoading = makeGetLoading()
  const getEditedId = makeGetEditedId()
  const getUserRoles = makeGetUserRoles()
  const getAdminRoles = makeGetAdminRoles()


  const mapStateToProps = (state, props) => {
    const currentUser = state.companiesAdmin.currentUser
    const currentUserId = currentUser ? currentUser.id : null

    return {
      rows: getRows(props), //Memoized. Recalculate rows only if in prevProps.datagrid.rows !== props.datagrid.rows
      currentUser,
      currentUserId,
      editId: getEditId(state),
      loading: getLoading(state),
      editedId: getEditedId(state),
      userRoles: getUserRoles(state),
      adminRoles: getAdminRoles(state)
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = {
  deleteUser,
  getUsersMe,
  userSwitchEnableDisable,
  openSidebar
}

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(injectIntl(UsersTable)))
