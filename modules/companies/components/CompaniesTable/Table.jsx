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

const mapStateToProps = ({ admin, companiesAdmin }, { datagrid }) => {
  return {
    isOpenSidebar: companiesAdmin.isOpenSidebar,
    companyListDataRequest: companiesAdmin.companyListDataRequest,
    reRegisterP44Pending: companiesAdmin.reRegisterP44Pending,
    editedId: companiesAdmin.editedId,
    rows: datagrid.rows.map(c => ({
      rawData: c,
      ...c,
      companyName: getSafe(() => c.name, ''),
      dba: getSafe(() => c.dba, ''),
      associations: getSafe(() => c.associations, ''),
      hasLogisticsAccounts: getSafe(() => c.logisticsAccount, false) ? 'Yes' : 'No',
      hasDwollaAccount: getSafe(() => c.dwollaAccountStatus, false) === 'verified',
      hasVellociAccount: getSafe(() => c.vellociAccountStatus, false) === 'active',
      primaryBranchAddress: getSafe(() => c.primaryBranch.deliveryAddress.address, false)
        ? c.primaryBranch.deliveryAddress.address.streetAddress +
          ', ' +
          c.primaryBranch.deliveryAddress.address.city +
          ', ' +
          (c.primaryBranch.deliveryAddress.address.province
            ? c.primaryBranch.deliveryAddress.address.province.name + ', '
            : '') +
          (c.primaryBranch.deliveryAddress.address.country ? c.primaryBranch.deliveryAddress.address.country.name : '')
        : '',
      primaryContact: getSafe(() => c.primaryUser.name, ''),
      contactEmail: getSafe(() => c.primaryUser.email, ''),
      reviewRequested: getSafe(() => c.reviewRequested, ''),
      hasLogo: getSafe(() => c.hasLogo, ''),
      enabled: getSafe(() => c.enabled, false),
      p44CompanyId: getSafe(() => c.project44Id, '')
    }))
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions, reviewRequest })(injectIntl(CompaniesTable)))
