import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'
import { getCompanies } from '../../actions'

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
      openEditCasPopup,
      casDeleteItem,
    } = this.props

    return (
      <React.Fragment>
        <ProdexTable
          columns={columns}
          rows={rows}
          loading={loading}
          filterValue={filterValue}
          rowActions={[
            { text: 'Edit', callback: (row) => {} },
            { text: 'Delete', callback: (row) => {} }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getCompanies
}

const mapStateToProps = ({admin}) => {
  return {
    columns: admin.config[admin.currentTab].display.columns,
    filterValue: admin.filterValue,
    currentTab: admin.currentTab,
    loading: admin.loading,
    rows: admin.companiesRows
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesTable)