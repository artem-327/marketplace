import React, { Component } from 'react'
import { connect } from 'react-redux'
import {injectIntl} from 'react-intl'

import ProdexTable from '~/components/table'
import confirm from '~/src/components/Confirmable/confirm'


import {
  getCompanies,
  openEditCompany,
  deleteCompany,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  openRegisterDwollaAccount,
} from '../../actions'

const PAGE_SIZE = 50

class CompaniesTable extends Component {

  getNextPage = (pageNumber) => {
    const {companyListDataRequest, filterValue} = this.props

    this.props.getCompanies({
      ...companyListDataRequest,
      filters: filterValue && filterValue.length >= 3 ? [{
        operator: "LIKE",
        path: "Company.name",
        values: ['%'+filterValue+'%']
      }] : [],
      pageNumber
    })
  }

  componentDidMount() {
    this.getNextPage(0)
  }

  render() {
    const {
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
          columns={columns}
          rows={rows}
          pageSize={PAGE_SIZE}
          getNextPage={this.getNextPage}
          loading={loading}
          rowActions={[
            { text: 'Edit', callback: (row) => openEditCompany(row.id, row) },
            { text: 'Delete', callback: (row) => confirm(
                formatMessage({id: 'confirm.deleteCompany', defaultMessage: 'Delete Company?'}),
                formatMessage({id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.name}?` }, { item: row.name })
              ).then(() => deleteCompany(row.id))
            },
            { text: 'Register Dwolla Account', callback: (row) => openRegisterDwollaAccount(row.id)}
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getCompanies,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteCompany,
  openEditCompany,
  openRegisterDwollaAccount
}

const mapStateToProps = ({admin}) => {
  return {
    columns: admin.config[admin.currentTab].display.columns,
    companyListDataRequest: admin.companyListDataRequest,
    filterValue: admin.filterValue,
    currentTab: admin.currentTab,
    loading: admin.loading,
    rows: admin.companiesRows.map(c => ({
      ...c,
      primaryBranchAddress: c.primaryBranch && c.primaryBranch.address ?
        c.primaryBranch.address.streetAddress + ', ' +
        c.primaryBranch.address.city + ', ' +
        (c.primaryBranch.address.province ? c.primaryBranch.address.province.name + ', ' : '') +
        c.primaryBranch.address.country.name
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CompaniesTable))