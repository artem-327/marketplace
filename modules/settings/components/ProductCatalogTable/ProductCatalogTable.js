import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'
import { Popup, List } from 'semantic-ui-react'

import * as Actions from '../../actions'
import Router from "next/router"

import confirm from '~/src/components/Confirmable/confirm'
import { injectIntl } from 'react-intl'

class ProductCatalogTable extends Component {

  state = {
    columns: [
      { name: 'productName', title: 'Product Name', sortPath: "Product.productName" },
      { name: 'productNumber', title: 'Product Number', sortPath: "Product.productCode" },
      { name: 'casNumber', title: 'CAS Number' },
      { name: 'casName', title: 'CAS Name' },
      { name: 'packagingSize', title: 'Packaging Size' },
      { name: 'unit', title: 'Unit' },
      { name: 'packagingType', title: 'Packaging Type' }
    ]
  }

  // componentDidMount() {
  //   const { datagrid, productCatalogUnmappedValue: unmapped } = this.props

  //   datagrid.setFilter([], { unmappedOnly: unmapped })
  // }

  componentWillReceiveProps({ productCatalogUnmappedValue: newUnmapped, filterValue: newFilterValue }) {
    const { datagrid, filterValue } = this.props

    // if (filterValue !== newFilterValue) {
    //   datagrid.setFilter({
    //     filters: newFilterValue && newFilterValue.length >= 1 ? [{
    //       operator: "LIKE",
    //       path: "Product.productName",
    //       values: ['%'+newFilterValue+'%']
    //     }] : []
    //   })
    // }
  }

  componentDidUpdate(oldProps) {
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

  getEditedProduct = (r) => {
    return this.props.editedItem
  }

  getRows = (rows) => {
    return rows.map(row => {
      return {
        ...row,
        casName: row.casNames ? (<Popup content={<List items={row.casNames.map(n => { return n })} />} trigger={<span>{row.casName}</span>} />) : row.casName,
        casNumber: row.casNumbers ? (<Popup content={<List items={row.casNumbers.map(n => { return n })} />} trigger={<span>{row.casNumber}</span>} />) : row.casNumber
      }
    })
  }

  render() {
    const {
      rows,
      filterValue,
      openPopup,
      deleteProduct,
      intl,
      datagrid,
      loading
    } = this.props

    let { columns } = this.state
    const { formatMessage } = intl

    return (
      <React.Fragment>
        <ProdexTable
          tableName="settings_product_catalog"
          {...datagrid.tableProps}
          loading={datagrid.loading || loading}
          rows={this.getRows(rows)}
          columns={columns}
          style={{ marginTop: '5px' }}
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
                ).then(() => deleteProduct(row.id, row.productName))
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
        attachments: product.attachments ? product.attachments.map(att => {
          return {
            id: att.id,
            name: att.name,
            linked: true
          }
        }) : [],
        description: product.description ? product.description : '',
        productName: product.productName,
        productNumber: product.productCode,
        casName: product.casProducts && product.casProducts.length
          ? product.casProducts.length > 1
            ? 'Blend'
            : product.casProducts[0].casProduct.casIndexName
          : null,
        casNames: product.casProducts && product.casProducts.length
          ? product.casProducts.length > 1
            ? product.casProducts.map(cp => {
              return cp.casProduct.casIndexName
            })
            : null
          : null,
        casNumber: product.casProducts && product.casProducts.length
          ? product.casProducts.length > 1
            ? 'Blend'
            : product.casProducts[0].casProduct.casNumber
          : null,
        casNumbers: product.casProducts && product.casProducts.length
          ? product.casProducts.length > 1
            ? product.casProducts.map(cp => {
              return cp.casProduct.casNumber
            })
            : null
          : null,
        casProducts: product.casProducts ? product.casProducts.map((casProduct, cpIndex) => {
          return {
            casProduct: casProduct.casProduct.id,
            minimumConcentration: casProduct.minimumConcentration ? casProduct.minimumConcentration : (product.casProducts.length === 1 ? 100 : 0),
            maximumConcentration: casProduct.maximumConcentration ? casProduct.maximumConcentration : 100,
            item: casProduct
          }
        }) : [],
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
        )) : [],
        nmfcNumber: product.nmfcNumber ? product.nmfcNumber : undefined,
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

export default withDatagrid(connect(mapStateToProps, Actions)(injectIntl(ProductCatalogTable)))
