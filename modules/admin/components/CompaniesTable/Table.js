import React, { Component } from 'react'
import { connect } from 'react-redux'
import {injectIntl} from 'react-intl'
import { withDatagrid } from '~/modules/datagrid'
import ProdexTable from '~/components/table'
import confirm from '~/src/components/Confirmable/confirm'

import * as Actions from '../../actions'


class CompaniesTable extends Component {

  componentWillReceiveProps({filterValue}) {
    
    if (this.props.filterValue !== filterValue) {
      this.props.datagrid.setFilter({
        filters: filterValue && filterValue.length >= 1 ? [{
          operator: "LIKE",
          path: "Company.name",
          values: ['%'+filterValue+'%']
        }] : []
      })
    }

  }

  render() {
    const {
      datagrid,
      columns,
      rows,
      filterValue,
      loading,
      openEditCompany,
      confirmMessage,
      handleOpenConfirmPopup,
      // closeConfirmPopup,
      // deleteRowById,
      deleteCompany,
      openRegisterDwollaAccount,
      intl
    } = this.props

    const { formatMessage } = intl

    return (
      <React.Fragment>
        <ProdexTable
          {...datagrid.tableProps}
          tableName='admin_companies'
          columns={columns}
          rows={rows}
          rowActions={[
            { text: 'Edit', callback: (row) => openEditCompany(row.id, row) },
            { text: 'Delete', callback: (row) => confirm(
                formatMessage({id: 'confirm.deleteCompany', defaultMessage: 'Delete Company?'}),
                formatMessage({id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.name}?` }, { item: row.name })
              ).then(() => {
                deleteCompany(row.id)
                datagrid.removeRow(row.id)
              })
            },
            { text: 'Register Dwolla Account', callback: (row) => openRegisterDwollaAccount(row.id), hidden: row => row.hasDwollaAccount === "Yes"}
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({admin}, {datagrid}) => {
  return {
    columns: admin.config[admin.currentTab].display.columns,
    companyListDataRequest: admin.companyListDataRequest,
    filterValue: admin.filterValue,
    currentTab: admin.currentTab,
    rows: datagrid.rows.map(c => ({
      ...c,
      hasDwollaAccount: c.hasDwollaAccount ? 'Yes' : 'No',
      primaryBranchAddress: c.primaryBranch && c.primaryBranch.address ?
        c.primaryBranch.address.streetAddress + ', ' +
        c.primaryBranch.address.city + ', ' +
        (c.primaryBranch.address.province ? c.primaryBranch.address.province.name + ', ' : '') +
        (c.primaryBranch.address.country ? c.primaryBranch.address.country.name : '')
        : '',
      primaryContact: c.primaryUser ?
        c.primaryUser.name
        : '',
      contactEmail: c.primaryUser ?
        c.primaryUser.email
        : '',
    })),
    confirmMessage: admin.confirmMessage,
    deleteRowById: admin.deleteRowById,
  }
}

export default withDatagrid(connect(mapStateToProps, Actions)(injectIntl(CompaniesTable)),{
  apiUrl: '/prodex/api/companies/datagrid'
})