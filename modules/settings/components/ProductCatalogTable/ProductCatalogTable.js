import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'

import * as Actions from '../../actions'
import Router from 'next/router'

import confirm from '~/src/components/Confirmable/confirm'
import { injectIntl, FormattedNumber, FormattedMessage } from 'react-intl'

import { UnitOfPackaging } from '~/components/formatted-messages'
import { getSafe } from '~/utils/functions'
import { FileText } from 'react-feather'
import styled from 'styled-components'
import { Popup } from 'semantic-ui-react'

const FileTextIcon = styled(FileText)`
  display: block;
  width: 20px;
  height: 20px;
  margin: 0 auto;
  vertical-align: top;
  font-size: 20px;
  color: #848893;
  line-height: 20px;
`

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #84c225;
  &.red {
    background-color: #f16844;
  }
`

class ProductCatalogTable extends Component {
  state = {
    columns: [
      {
        name: 'productStatus',
        title:
          <Popup
            size='small'
            header={
              <FormattedMessage
                id='global.productStatusIndicator'
                defaultMessage='Status indicator if Company Product will be shown on Marketplace' />
            }
            trigger={
              <div>
                <FileTextIcon />
              </div>
            } // <div> has to be there otherwise popup will be not shown
          />,
        width: 40,
        align: 'center'
      },
      {
        name: 'intProductName',
        title: (
          <FormattedMessage id='global.intProductName' defaultMessage='Internal Product Name'>
            {text => text}
          </FormattedMessage>
        ),
        width: 200,
        sortPath: 'CompanyProduct.intProductName'
      },
      {
        name: 'intProductCode',
        title: (
          <FormattedMessage id='global.intProductCode' defaultMessage='Internal Product Code'>
            {text => text}
          </FormattedMessage>
        ),
        width: 190,
        sortPath: 'CompanyProduct.intProductCode'
      },
      {
        name: 'genericProductName',
        title: (
          <FormattedMessage id='global.genericProductName' defaultMessage='Generic Product Name!'>
            {text => text}
          </FormattedMessage>
        ),
        width: 230,
        sortPath: 'CompanyProduct.companyGenericProduct.name'
      },
      {
        name: 'genericProductCode',
        title: (
          <FormattedMessage id='global.genericProductCode' defaultMessage='Generic Product Code!'>
            {text => text}
          </FormattedMessage>
        ),
        width: 200,
        sortPath: 'CompanyProduct.companyGenericProduct.code'
      },
      {
        name: 'packagingSizeFormatted',
        title: (
          <FormattedMessage id='global.packagingSize' defaultMessage='Packaging Size'>
            {text => text}
          </FormattedMessage>
        ),
        width: 140,
        sortPath: 'CompanyProduct.packagingSize'
      },
      {
        name: 'unit',
        title: (
          <FormattedMessage id='global.packagingUnit' defaultMessage='Packaging Unit'>
            {text => text}
          </FormattedMessage>
        ),
        width: 140,
        sortPath: 'CompanyProduct.packagingUnit.nameAbbreviation'
      },
      {
        name: 'packagingTypeName',
        title: (
          <FormattedMessage id='global.packagingType' defaultMessage='Packaging Type'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150,
        sortPath: 'CompanyProduct.packagingType.name'
      },
      {
        name: 'productGroup',
        title: (
          <FormattedMessage id='global.productGroup' defaultMessage='Product Group'>
            {text => text}
          </FormattedMessage>
        ),
        width: 200,
        sortPath: 'CompanyProduct.companyGenericProduct.name'
      }
    ],
    companyGenericProduct: []
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
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
      // filterValue,
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
          tableName='settings_product_catalog'
          {...datagrid.tableProps}
          loading={datagrid.loading || loading}
          rows={rows}
          columns={columns}
          style={{ marginTop: '5px' }}
          defaultSorting={{
            columnName: 'intProductName',
            sortPath: 'CompanyProduct.intProductName',
            direction: 'asc'
          }}
          rowActions={[
            {
              text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
              callback: row => openPopup(row.rawData)
            },
            {
              text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
              callback: row => {
                return confirm(
                  formatMessage({ id: 'confirm.deleteProductCatalog', defaultMessage: 'Delete Product Catalog' }),
                  formatMessage(
                    {
                      id: 'confirm.deleteItem',
                      defaultMessage: `Do you really want to delete ${row.rawData.intProductName}?`
                    },
                    { item: row.rawData.intProductName }
                  )
                ).then(() => deleteProduct(row.id, row.intProductName))
              }
            }
          ]}
        />
      </React.Fragment>
    )
  }
}

const getProductStatus = product => {
  let status = product.companyGenericProduct
    ? !product.companyGenericProduct.isPublished
      ? 'Unpublished'
      : ''
    : 'Unmapped'

  let popupText, dispIcon

  switch (status) {
    case 'Unpublished':
      popupText = (
        <FormattedMessage
          id='global.notPublished'
          defaultMessage='This Company Generic Product is not published and will not be shown on the Marketplace.'
        />
      )
      dispIcon = <Circle className='red' />
      break

    case 'Unmapped':
      popupText = (
        <FormattedMessage
          id='settings.product.unmapped'
          defaultMessage='This product is not mapped and will not show on the Marketplace.'
        />
      )
      dispIcon = <Circle className='red' />
      break

    default:
      popupText = (
        <FormattedMessage
          id='global.productOk'
          defaultMessage='This Company Generic Product is published and will be shown on the Marketplace'
        />
      )
      dispIcon = <Circle />
  }

  return (
    <Popup
      size='small'
      header={popupText}
      trigger={
        <div>
          {dispIcon}
        </div>
      } // <div> has to be there otherwise popup will be not shown
    />
  )
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    rows: datagrid.rows.map(product => {
      return {
        ...product,
        rawData: product,
        intProductName: (
          <div style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {product.intProductName}
          </div>
        ),
        packagingTypeName: getSafe(() => product.packagingType.name) ? (
          <UnitOfPackaging value={product.packagingType.name} />
        ) : (
          'N/A'
        ),
        packagingType: getSafe(() => product.packagingType.id),
        packagingSize: getSafe(() => product.packagingSize, 'N/A'),
        packagingSizeFormatted: product.packagingSize ? (
          <FormattedNumber value={product.packagingSize} minimumFractionDigits={0} />
        ) : (
          'N/A'
        ),
        //packagingGroup: getSafe(() => product.packagingGroup.id),
        genericProductCode: getSafe(() => product.companyGenericProduct.code, 'N/A'),
        genericProductName: getSafe(() => product.companyGenericProduct.name, 'N/A'),
        unit: getSafe(() => product.packagingUnit.nameAbbreviation, 'N/A'),
        packagingUnit: getSafe(() => product.packagingUnit.id),
        productStatus: getProductStatus(product),
        productStatusTmp:
          product.companyGenericProduct && !product.companyGenericProduct.isPublished ? (
            <Popup
              size='small'
              header={
                <FormattedMessage
                  id='global.notPublished'
                  defaultMessage='This echo product is not published and will not show on the Marketplace.'
                />
              }
              trigger={
                <div>
                  <FileTextIcon />
                </div>
              } // <div> has to be there otherwise popup will be not shown
            />
          ) : null,
        productGroup: getSafe(() => product.companyGenericProduct.productGroup.name, (<FormattedMessage id='global.unmapped.cptlz' defaultMessage='Unmapped'>{text => text}</FormattedMessage>))
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
    productCatalogUnmappedValue: state.settings.productCatalogUnmappedValue
  }
}

export default withDatagrid(connect(mapStateToProps, Actions)(injectIntl(ProductCatalogTable)))
