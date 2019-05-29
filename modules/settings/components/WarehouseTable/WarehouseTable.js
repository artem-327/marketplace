import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexGrid from '~/components/table'
import { Confirm } from 'semantic-ui-react'
import {
  getWarehousesDataRequest,
  getBranchesDataRequest,
  openPopup,
  closeConfirmPopup,
  deleteConfirmation,
  handleOpenConfirmPopup
} from '../../actions'
import Router from "next/router"

class WarehouseTable extends Component {
  state = {
    columns: [
      { name: 'name', title: 'Warehouse Name' },
      { name: 'streetAddress', title: 'Street Address' },
      { name: 'city', title: 'City' },
      { name: 'zip', title: 'State' }, //waiting state from api
      { name: 'countryName', title: 'Country' },
      { name: 'contactName', title: 'Contact Name' },
      { name: 'phone', title: 'Phone' },
      { name: 'email', title: 'E-mail' }
    ],
    tab: ''
  }

  componentDidMount() {
    this.handlerLoadPage()
  }

  handlerLoadPage() {
    const {
      currentTab,
      getWarehousesDataRequest,
      getBranchesDataRequest
    } = this.props

    if (currentTab.name === 'Warehouses') {
      getWarehousesDataRequest()
      this.setState({
        tab: 'Warehouses'
      })
    }
    else if (currentTab.name === 'Branches') {
      getBranchesDataRequest()
      this.setState({
        tab: 'Branches'
      })
    }
  }

  handlerChangeRows() {
    const { currentTab, rowsWarehouses, rowsBranches } = this.props
    if (currentTab.name === 'Warehouses') {
      return rowsWarehouses
    }
    else if (currentTab.name === 'Branches') {
      return rowsBranches.filter(branch => branch.warehouse == false)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.tab != nextProps.currentTab.name ? this.handlerLoadPage() : null
  }

  branchChecker() {
    if (this.state.tab === 'Branches') {
      let { columns } = this.state
      console.log({ columns })
      return columns.map(item => {
        let obj = {}
        if (item.title === 'Warehouse Name') {
          obj['name'] = 'name'
          obj['title'] = 'Branch Name'
          return obj
        }
        return item
      })
    }
    return this.state.columns
  }

  render() {
    const {
      filterValue,
      loading,
      openPopup,
      closeConfirmPopup,
      deleteConfirmation,
      confirmMessage,
      handleOpenConfirmPopup,
      deleteRowById,
      currentTab
    } = this.props

    return (
      <React.Fragment>
        <Confirm
          size="tiny"
          content="Do you really want to delete warehouse?"
          open={confirmMessage}
          onCancel={closeConfirmPopup}
          onConfirm={() => deleteConfirmation(deleteRowById, currentTab)}
        />
        <ProdexGrid
          filterValue={filterValue}
          columns={this.branchChecker()}
          loading={loading}
          rows={this.handlerChangeRows()}
          style={{ marginTop: '5px' }}
          rowActions={[
            { text: 'Edit', callback: row => openPopup(row) },
            { text: 'Delete', callback: row => handleOpenConfirmPopup(row.id) }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getWarehousesDataRequest,
  getBranchesDataRequest,
  openPopup,
  closeConfirmPopup,
  deleteConfirmation,
  handleOpenConfirmPopup
}

const mapStateToProps = state => {
  return {
    rowsWarehouses: state.settings.warehousesRows,
    rowsBranches: state.settings.branchesRows,
    editPopupBoolean: state.settings.editPopupBoolean,
    addNewWarehousePopup: state.settings.addNewWarehousePopup,
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    currentTab: Router && Router.router ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
      deleteRowById: state.settings.deleteRowById,
      loading: state.settings.loading
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WarehouseTable)
