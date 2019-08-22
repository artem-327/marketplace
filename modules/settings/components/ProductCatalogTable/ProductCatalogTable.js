import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'
import { Popup, List } from 'semantic-ui-react'

import * as Actions from '../../actions'
import Router from 'next/router'

import confirm from '~/src/components/Confirmable/confirm'
import { injectIntl, FormattedNumber, FormattedMessage } from 'react-intl'

import { UnitOfPackaging } from '~/components/formatted-messages'
import { getSafe } from '~/utils/functions'


class ProductCatalogTable extends Component {

  state = {
    columns: [
      { name: 'productName', title: <FormattedMessage id='global.productName' defaultMessage='Product Name'>{(text) => text}</FormattedMessage>, sortPath: 'Product.productName' },
      { name: 'productCode', title: <FormattedMessage id='global.productNumber' defaultMessage='Product Number'>{(text) => text}</FormattedMessage>, sortPath: 'Product.productCode' },
      { name: 'casNumber', title: <FormattedMessage id='global.casNumber' defaultMessage='CAS Number'>{(text) => text}</FormattedMessage> },
      { name: 'casName', title: <FormattedMessage id='global.casName' defaultMessage='CAS Name'>{(text) => text}</FormattedMessage> },
      { name: 'packagingSizeFormatted', title: <FormattedMessage id='global.packagingSize' defaultMessage='Packaging Size'>{(text) => text}</FormattedMessage> },
      { name: 'unit', title: <FormattedMessage id='global.unit' defaultMessage='Unit' /> },
      { name: 'packagingTypeName', title: <FormattedMessage id='global.packagingType' defaultMessage='Packaging Type'>{(text) => text}</FormattedMessage> }
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
    //       operator: 'LIKE',
    //       path: 'Product.productName',
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
        casName: getSafe(() => row.casNames.map) ? (<Popup content={<List items={row.casNames.map(n => { return n })} />} trigger={<span>{row.casName}</span>} />) : row.casName,
        casNumber: getSafe(() => row.casNumbers.map) ? (<Popup content={<List items={row.casNumbers.map(n => { return n })} />} trigger={<span>{row.casNumber}</span>} />) : row.casNumber
      }
    })
  }

  render() {
    const {
      rows,
      filterValue,
      openPopup,
      openPopup2,
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
          tableName='settings_product_catalog'
          {...datagrid.tableProps}
          loading={datagrid.loading || loading}
          rows={this.getRows(rows)}
          columns={columns}
          style={{ marginTop: '5px' }}
          rowActions={[
            { text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }), callback: row => openPopup(row) },
            { text: formatMessage({ id: 'settings.editAlternativeNames', defaultMessage: 'Edit Alternative Names' }), callback: (row) => openPopup2(row) },
            {
              text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
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
      let hasCasProducts = product.casProducts && product.casProducts.length

      return {
        ...product,
        id: product.id,
        attachments: product.attachments ? product.attachments.map(att => {
          return {
            id: att.id,
            name: att.name,
            linked: true
          }
        }) : [],
        description: getSafe(() => product.description),
        productName: product.productName,
        casName: hasCasProducts
          ? product.casProducts.length > 1
            ? 'Blend'
            : product.casProducts[0].casProduct.casIndexName
          : 'N/A',
        casNames: hasCasProducts
          ? product.casProducts.length > 1
            ? product.casProducts.map(cp => {
              return cp.casProduct.casIndexName
            })
            : null
          : 'N/A',
        casNumber: hasCasProducts
          ? product.casProducts.length > 1
            ? 'Blend'
            : product.casProducts[0].casProduct.casNumber
          : 'N/A',
        casNumbers: hasCasProducts
          ? product.casProducts.length > 1
            ? product.casProducts.map(cp => {
              return cp.casProduct.casNumber
            })
            : null
          : 'N/A',
        casProducts: hasCasProducts ? product.casProducts.map((casProduct, cpIndex) => {
          return {
            casProduct: casProduct.casProduct.id,
            minimumConcentration: getSafe(() => casProduct.minimumConcentration, product.casProducts.length === 1 ? 100 : 0),
            maximumConcentration: getSafe(() => casProduct.maximumConcentration, 100),
            // minimumConcentration: casProduct.minimumConcentration ? casProduct.minimumConcentration : (product.casProducts.length === 1 ? 100 : 0),
            // maximumConcentration: casProduct.maximumConcentration ? casProduct.maximumConcentration : 100,
            item: casProduct
          }
        }) : [],
        packagingTypeName: getSafe(() => product.packagingType.name) ? <UnitOfPackaging value={product.packagingType.name} /> : 'N/A',
        packagingType: getSafe(() => product.packagingType.id),
        packagingSize: getSafe(() => product.packagingSize, 'N/A'),
        packagingSizeFormatted: product.packagingSize ? <FormattedNumber value={product.packagingSize} minimumFractionDigits={0} /> : 'N/A',
        packagingGroup: getSafe(() => product.packagingGroup.id),
        unit: getSafe(() => product.packagingUnit.nameAbbreviation, 'N/A'),
        packagingUnit: getSafe(() => product.packagingUnit.id),
        freightClass: getSafe(() => product.freightClass),
        hazardous: product.hazardous,
        hazardClass: product.hazardClasses && product.hazardClasses.length ? product.hazardClasses.map(d => (
          d.id
        )) : [],
        nmfcNumber: getSafe(() => product.nmfcNumber),
        stackable: product.stackable,
        unNumber: getSafe(() => product.unNumber)
      }
    }),
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    deleteRowById: state.settings.deleteRowById,
    productsFilter: state.settings.productsFilter,
    loading: state.settings.loading,
    loaded: state.settings.loaded,
    action: getSafe(() => Router.router.query.action),
    actionId: getSafe(() => Router.router.query.id),
    currentTab: getSafe(() => Router.router.query.type)
      ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type)
      : state.settings.tabsNames[0],
    productCatalogUnmappedValue: state.settings.productCatalogUnmappedValue,
  }
}

export default withDatagrid(connect(mapStateToProps, Actions)(injectIntl(ProductCatalogTable)))
