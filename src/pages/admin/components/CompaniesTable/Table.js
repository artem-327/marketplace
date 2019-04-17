import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'
import { getCompanies, openEditCompany, deleteCompany } from '../../actions'

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
      deleteCompany,
    } = this.props

    return (
      <React.Fragment>
        <ProdexTable
          columns={columns}
          rows={rows}
          loading={loading}
          filterValue={filterValue}
          rowActions={[
            { text: 'Edit', callback: (row) => openEditCompany(row.id, row) },
            { text: 'Delete', callback: (row) => confirm('Do you really want to delete?') && deleteCompany(row.id)}
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getCompanies,
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
      nacdMemberText: c.nacdMember ? 'Yes' : 'No'
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesTable)