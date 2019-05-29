import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'
import { Confirm } from 'semantic-ui-react'
import {
  openPopup,
  getProductsCatalogRequest,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteConfirmation
} from '../../actions'
import Router from "next/router";

class ProductCatalogTable extends Component {
  state = {
    columns: [
      { name: 'productName', title: 'Product Name' },
      { name: 'productNumber', title: 'Product Number' },
      { name: 'casNumber', title: 'CAS Number' },
      { name: 'casName', title: 'CAS Name' },
      { name: 'packagingSize', title: 'Packaging Size' },
      { name: 'unit', title: 'Unit' },
      { name: 'packagingType', title: 'Packaging Type' }
    ]
  }

  componentDidMount() {
    this.props.getProductsCatalogRequest({body: this.props.productsFilter, unmapped: this.props.productCatalogUnmappedValue})
  }

  componentDidUpdate() {
    const {action, actionId, currentTab, loaded, openPopup, rows} = this.props

    if (action === 'edit' && actionId && loaded) {
      if (currentTab.type === 'products') {
        const editRow = rows.find(function(product) {
          return product.id === parseInt(actionId)
        })

        openPopup(editRow)
      }
    }
  }

  render() {
    const {
      rows,
      filterValue,
      confirmMessage,
      openPopup,
      handleOpenConfirmPopup,
      closeConfirmPopup,
      deleteConfirmation,
      loading,
      deleteRowById,
      currentTab,
      reloadFilter
    } = this.props

    const { columns } = this.state

    return (
      <React.Fragment>
        <Confirm
          size="tiny"
          content="Do you really want to delete this product?"
          open={confirmMessage}
          onCancel={closeConfirmPopup}
          onConfirm={() => deleteConfirmation(deleteRowById, currentTab, reloadFilter)}
        />
        <ProdexTable
          rows={rows}
          columns={columns}
          loading={loading}
          style={{ marginTop: '5px' }}
          filterValue={filterValue}
          rowActions={[
            { text: 'Edit', callback: row => openPopup(row) },
            {
              text: 'Delete',
              callback: row => handleOpenConfirmPopup(row.id)
            }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  openPopup,
  getProductsCatalogRequest,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteConfirmation
}

const mapStateToProps = state => {
  return {
    rows: state.settings.productsCatalogRows,
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    deleteRowById: state.settings.deleteRowById,
    productsFilter: state.settings.productsFilter,
    loading: state.settings.loading,
      loaded: state.settings.loaded,
      action: Router && Router.router ? Router.router.query.action : false,
      actionId: Router && Router.router ? Router.router.query.id : false,
      currentTab: Router && Router.router ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0]

      reloadFilter: {props: {
        currentTab: state.settings.currentTab,
        productCatalogUnmappedValue: state.settings.productCatalogUnmappedValue,
        productsFilter: state.settings.productsFilter},
      value: state.settings.filterValue},
    productCatalogUnmappedValue: state.settings.productCatalogUnmappedValue,



  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCatalogTable)
