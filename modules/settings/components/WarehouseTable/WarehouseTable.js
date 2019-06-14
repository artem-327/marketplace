import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexGrid from '~/components/table'
import { injectIntl } from 'react-intl'
import {
  getWarehousesDataRequest,
  getBranchesDataRequest,
  openPopup,
  closeConfirmPopup,
  deleteConfirmation,
  handleOpenConfirmPopup,
  deleteBranch
} from '../../actions'
import Router from "next/router"

import confirm from '~/src/components/Confirmable/confirm'

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

    if (currentTab.type === 'warehouses') {
      getWarehousesDataRequest()
      this.setState({
        tab: 'warehouses'
      })
    }
    else if (currentTab.type === 'branches') {
      getBranchesDataRequest()
      this.setState({
        tab: 'branches'
      })
    }
  }

  handlerChangeRows() {
    const { currentTab, rowsWarehouses, rowsBranches } = this.props
    if (currentTab.type === 'warehouses') {
      return rowsWarehouses
    }
    else if (currentTab.type === 'branches') {
      return rowsBranches
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.tab != nextProps.currentTab.type ? this.handlerLoadPage() : null
  }

  branchChecker() {
    if (this.state.tab === 'branches') {
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
      deleteBranch,
      intl,
      currentTab,
      // closeConfirmPopup,
      // deleteConfirmation,
      // confirmMessage,
      // handleOpenConfirmPopup,
      // deleteRowById,
      // currentTab
    } = this.props

    let message = currentTab.type === 'branches'
      ? { id: 'confirm.deleteBranch', defaultMessage: 'Delete Branch' }
      : { id: 'confirm.deleteWarehouse', defaultMessage: 'Delete Warehouse' }

    const { formatMessage } = intl

    return (
      <React.Fragment>
        <ProdexGrid
          filterValue={filterValue}
          columns={this.branchChecker()}
          loading={loading}
          rows={this.handlerChangeRows()}
          style={{ marginTop: '5px' }}
          rowActions={[
            { text: 'Edit', callback: row => openPopup(row) },
            {
              text: 'Delete', callback: row =>
                confirm(
                  formatMessage({ ...message }),
                  formatMessage(
                    { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.name}! ? ` },
                    { item: row.name })
                ).then(() => deleteBranch(row.id))
            }
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
  handleOpenConfirmPopup,
  deleteBranch
}

const mapStateToProps = state => {
  return {
    rowsWarehouses: state.settings.warehousesRows,
    rowsBranches: state.settings.branchesRows,
    editPopupBoolean: state.settings.editPopupBoolean,
    addNewWarehousePopup: state.settings.addNewWarehousePopup,
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    currentTab: Router && Router.router && Router.router.query && Router.router.query.type ?
        state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
    deleteRowById: state.settings.deleteRowById,
    loading: state.settings.loading
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(WarehouseTable))
