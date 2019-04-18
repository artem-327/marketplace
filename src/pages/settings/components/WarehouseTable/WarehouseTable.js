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

class WarehouseTable extends Component {
  state = {
    columns: [
      { name: 'name', title: 'Warehouse Name' },
      { name: 'address', title: 'Address' },
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

    if (currentTab === 'Warehouses') {
      getWarehousesDataRequest()
      this.setState({
        tab: 'Warehouses'
      })
    }
    if (currentTab === 'Branches') {
      getBranchesDataRequest()
      this.setState({
        tab: 'Branches'
      })
    }
  }

  handlerChangeRows() {
    const { currentTab, rowsWarehouses, rowsBranches } = this.props
    if (currentTab === 'Warehouses') {
      return rowsWarehouses
    }
    if (currentTab === 'Branches') {
      return rowsBranches.filter(branch => branch.warehouse == false)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.tab != nextProps.currentTab ? this.handlerLoadPage() : null
  }

  render() {
    const {
      filterValue,
      loading,
      openPopup,
      closeConfirmPopup,
      deleteConfirmation,
      confirmMessage,
      handleOpenConfirmPopup
    } = this.props

    const { columns } = this.state

    return (
      <React.Fragment>
        <Confirm
          size="tiny"
          content="Do you really want to delete warehouse?"
          open={confirmMessage}
          onCancel={closeConfirmPopup}
          onConfirm={deleteConfirmation}
        />
        <ProdexGrid
          filterValue={filterValue}
          columns={columns}
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
    currentTab: state.settings.currentTab,
    loading: state.settings.loading
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WarehouseTable)
