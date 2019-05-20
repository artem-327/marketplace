import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Confirm } from 'semantic-ui-react'
import ProdexTable from '~/components/table'
import {
  getCompanies,
  openEditCompany,
  deleteCompany,
  handleOpenConfirmPopup,
  closeConfirmPopup,
} from '../../actions'

class CompaniesTable extends Component {

  componentDidMount() {
    this.props.getCompanies()
  }

  render() {
    const {
      columns,
      rows,
      filterValue,
      currentTab,
      loading,
      openEditCompany,
      confirmMessage,
      handleOpenConfirmPopup,
      closeConfirmPopup,
      deleteRowById,
      deleteCompany
    } = this.props

    return (
      <React.Fragment>
        <Confirm
            size="tiny"
            content="Do you really want to delete item?"
            open={confirmMessage}
            onCancel={closeConfirmPopup}
            onConfirm={() => deleteCompany(deleteRowById)}
        />
        <ProdexTable
          columns={columns}
          rows={rows}
          loading={loading}
          filterValue={filterValue}
          rowActions={[
            { text: 'Edit', callback: (row) => openEditCompany(row.id, row) },
            { text: 'Delete', callback: (row) => handleOpenConfirmPopup(row.id)}
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
  openEditCompany
}

const mapStateToProps = ({admin}) => {
  return {
    columns: admin.config[admin.currentTab].display.columns,
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

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesTable)