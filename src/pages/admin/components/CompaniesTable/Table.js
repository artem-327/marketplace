import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Label } from 'semantic-ui-react'
import ProdexTable from '~/components/table'
import { getCasProductByFilter, openEditCasPopup, casDeleteItem } from '../../actions'


class CasProductsTable extends Component {

  state = {
    columns: {

    }
  }

  componentDidMount() {
    this.props.getCasProductByFilter(this.props.casListDataRequest)
  }

  render() {
    const {
      rows,
      filterValue,
      currentTab,
      openEditPopup,
      openEditCasPopup,
      casDeleteItem,
      deleteItem,
    } = this.props

    const { columns } = this.state

    return (
      <React.Fragment>
        <ProdexTable
          columns={columns}
          rows={rows}
          rowActions={[
            { text: 'Edit', callback: (row) => openEditCasPopup(row) },
            { text: 'Delete', callback: (row) => casDeleteItem(row.id) }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getCasProductByFilter,
  openEditCasPopup,
  casDeleteItem
}

const mapStateToProps = state => {
  let cfg = state.admin.config[state.admin.currentTab]
  return {
    config: cfg,
    filterValue: state.admin.filterValue,
    currentTab: state.admin.currentTab,
    casListDataRequest: state.admin.casListDataRequest,
    //rows: state.admin.casProductsRows,
    rows: state.admin.casProductsRows.map(d => {
      return {
        id: d.id,
        casIndexName: d.casIndexName,
        casNumber: d.casNumber,
        chemicalName: d.chemicalName,
        packagingGroup: d.packagingGroup,
        unNumber: d.unNumber,
        hazardClasses: d.hazardClasses
      }
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CasProductsTable)