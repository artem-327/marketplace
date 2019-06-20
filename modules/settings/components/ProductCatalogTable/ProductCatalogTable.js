import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'

import * as Actions from '../../actions'
import Router from "next/router"

import confirm from '~/src/components/Confirmable/confirm'
import { injectIntl } from 'react-intl'

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
    const { datagrid, productCatalogUnmappedValue: unmapped } = this.props

    datagrid.setFilter([], { unmappedOnly: unmapped })
  }

  componentWillReceiveProps({ productCatalogUnmappedValue: newUnmapped, filterValue: newFilterValue }) {
    const { datagrid, filterValue, productCatalogUnmappedValue } = this.props
    
    if (productCatalogUnmappedValue != newUnmapped) {
      datagrid.setFilter([], { unmappedOnly: newUnmapped })
    }

    if (filterValue !== newFilterValue) {
      datagrid.setFilter({
        filters: newFilterValue && newFilterValue.length >= 1 ? [{
          operator: "LIKE",
          path: "Product.productName",
          values: ['%'+newFilterValue+'%']
        }] : []
      }, { unmappedOnly: newUnmapped })
    }
  }

  componentDidUpdate() {
    const { action, actionId, currentTab, loaded, openPopup, rows } = this.props

    if (action === 'edit' && actionId && loaded) {
      if (currentTab.type === 'products') {
        const editRow = rows.find(function (product) {
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
      openPopup,
      deleteProduct,
      intl,
      datagrid
    } = this.props

    let { columns } = this.state
    const { formatMessage } = intl

    return (
      <React.Fragment>
        <ProdexTable
          tableName="settings_product_catalog"
          {...datagrid.tableProps}
          rows={rows}
          columns={columns}
          style={{ marginTop: '5px' }}
          filterValue={filterValue}
          rowActions={[
            { text: 'Edit', callback: row => openPopup(row) },
            {
              text: 'Delete',
              callback: row =>
                confirm(
                  formatMessage({ id: 'confirm.deleteProductCatalog', defaultMessage: 'Delete Product Catalog!' }),
                  formatMessage(
                    { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.productName}!?` },
                    { item: row.productName })
                ).then(() => deleteProduct(row.id))
            }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    rows: datagrid.rows.map(product => {
      return {
        id: product.id,
        description: product.description ? product.description : '',
        productName: product.productName,
        productNumber: product.productCode,
        casName: product.casProduct
          ? product.casProduct.casIndexName
            ? product.casProduct.casIndexName
            : null
          : null,
        casNumber: product.casProduct
          ? product.casProduct.casNumber
            ? product.casProduct.casNumber
            : null
          : null,
        casProduct: product.casProduct ? product.casProduct : null,
        packagingType: product.packagingType
          ? product.packagingType.name
          : null,
        packageID: product.packagingType ? product.packagingType.id : null,
        packagingSize: product.packagingSize,
        packagingGroup: product.packagingGroup ? product.packagingGroup.id : null,
        unit: product.packagingUnit
          ? product.packagingUnit.nameAbbreviation
          : null,
        unitID: product.packagingUnit ? product.packagingUnit.id : null,
        freightClass: product.freightClass ? product.freightClass : null,
        hazardous: product.hazardous,
        hazardClass: product.hazardClasses && product.hazardClasses.length ? product.hazardClasses.map(d => (
          d.id
        )) : null,
        nmfcNumber: product.nmfcNumber ? product.nmfcNumber : null,
        stackable: product.stackable,
        unNumber: product.unNumber ? product.unNumber : null
      }
    }),
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    deleteRowById: state.settings.deleteRowById,
    productsFilter: state.settings.productsFilter,
    loading: state.settings.loading,
    loaded: state.settings.loaded,
    action: Router && Router.router ? Router.router.query.action : false,
    actionId: Router && Router.router ? Router.router.query.id : false,
    currentTab: Router && Router.router && Router.router.query && Router.router.query.type
      ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type)
      : state.settings.tabsNames[0],
    productCatalogUnmappedValue: state.settings.productCatalogUnmappedValue,
  }
}

export default withDatagrid(connect(mapStateToProps, Actions)(injectIntl(ProductCatalogTable)), {
  apiUrl: '/prodex/api/products/datagrid'
})
