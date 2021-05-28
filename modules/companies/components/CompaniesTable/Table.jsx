/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { injectIntl } from 'react-intl'
import { withDatagrid } from '~/modules/datagrid'
import ProdexTable from '~/components/table'
import { getSafe } from '~/utils/functions'

import * as Actions from '../../actions'
import { reviewRequest } from '~/modules/admin/actions'

import { COLUMNS } from './Table.constants'

import { getRows } from './Table.services'

const CompaniesTable = props => {
  const [reRegisterCompanyId, setReRegisterCompanyId] = useState(null)
  const state = { reRegisterCompanyId, setReRegisterCompanyId }

  const { datagrid, rows, editedId } = props

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexTable
        {...datagrid.tableProps}
        tableName='admin_companies'
        columns={COLUMNS}
        defaultSorting={{ columnName: 'displayName', direction: 'asc', sortPath: 'Company.name' }}
        rows={getRows(rows, state, props)}
        editingRowId={editedId}
        defaultHiddenColumns={['dba']}
      />
    </div>
  )
}

import {
  makeGetCompaniesDatagridRows,
  makeGetEditedId,
  makeIsOpenSidebar,
  makeCompanyListDataRequest,
  makeReRegisterP44Pending
} from '../selectors'

const makeMapStateToProps = () => {
  const getRows = makeGetCompaniesDatagridRows()
  const getEditedId = makeGetEditedId()
  const getIsOpenSidebar = makeIsOpenSidebar()
  const getCompanyListDataRequest = makeCompanyListDataRequest()
  const getReRegisterP44Pending = makeReRegisterP44Pending()

  const mapStateToProps = (state, props) => {
    return {
      rows: getRows(props),
      editedId: getEditedId(state),
      isOpenSidebar: getIsOpenSidebar(state),
      companyListDataRequest: getCompanyListDataRequest(state),
      reRegisterP44Pending: getReRegisterP44Pending(state)
    }
  }
  return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, { ...Actions, reviewRequest })(injectIntl(CompaniesTable)))
