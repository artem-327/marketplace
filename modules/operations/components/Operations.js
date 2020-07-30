import React, { Component } from 'react'
import { connect } from 'react-redux'
import TablesHandlers from './TablesHandlers'
import { Container, Grid, GridColumn } from 'semantic-ui-react'
import { withAuth } from '~/hocs'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import ShippingQuotesTable from './shipping-quotes/ShippingQuotesTable'
import ShippingQuotesPopup from './shipping-quotes/ShippingQuotesPopup'
import TagsTable from './tags/TagsTable'
import TagsPopup from './tags/TagsPopup'
import CompanyProductTable from './company-product-catalog/CompanyProductTable'
import CompanyInventoryTable from './company-inventory/CompanyInventoryTable'
import Orders from './orders/OrdersContainer'
import OrderDetail from './orders/DetailContainer'
import CompanyGenericProductsTable from './company-generic-products/CompanyGenericProductsTable'

import { getSafe } from '~/utils/functions'
import { DatagridProvider } from '~/modules/datagrid'
import * as Actions from '../actions'

const CustomGridColumn = styled(GridColumn)`
  padding: 0 30px !important;
`

class Operations extends Component {
  componentWillUnmount() {
    const { isOpenPopup, closePopup } = this.props
    if (isOpenPopup) closePopup()
  }

  renderContent = () => {
    const { currentTab, isOpenPopup, orderDetailData } = this.props

    const tables = {
      'shipping-quotes': <ShippingQuotesTable />,
      tags: <TagsTable />,
      'company-product-catalog': <CompanyProductTable />,
      'company-inventory': <CompanyInventoryTable />,
      orders: orderDetailData ? <OrderDetail /> : <Orders />,
      'company-generic-products': <CompanyGenericProductsTable />
    }

    const popupForm = {
      'shipping-quotes': <ShippingQuotesPopup />,
      tags: <TagsPopup />
    }

    return (
      <>
        {isOpenPopup && popupForm[currentTab.type]}
        {tables[currentTab.type] || <p>This page is still under construction</p>}
      </>
    )
  }

  getApiConfig = () => {
    const { currentTab, companyProductUnmappedOnly } = this.props
    const datagridApiMap = {
      'shipping-quotes': {
        url: '/prodex/api/shipment/manual-quotes/datagrid',
        searchToFilter: v =>
          v && v.searchInput
            ? [
                {
                  operator: 'LIKE',
                  path: 'ShippingQuote.carrierName',
                  values: [`%${v.searchInput}%`]
                }
              ]
            : []
      },
      tags: {
        url: 'prodex/api/tags/datagrid',
        searchToFilter: v =>
          v && v.searchInput ? [{ operator: 'LIKE', path: 'Tag.name', values: [`%${v.searchInput}%`] }] : []
      },
      'company-product-catalog': {
        url: `/prodex/api/company-products/admin/datagrid?type=${companyProductUnmappedOnly}`,
        searchToFilter: v => {
          let filter = { or: [], and: [] }
          if (v && v.searchInput)
            filter.or = [
              {
                operator: 'LIKE',
                path: 'CompanyProduct.intProductName',
                values: [`%${v.searchInput}%`]
              },
              {
                operator: 'LIKE',
                path: 'CompanyProduct.intProductCode',
                values: [`%${v.searchInput}%`]
              },
              {
                operator: 'LIKE',
                path: 'CompanyProduct.companyGenericProduct.name',
                values: [`%${v.searchInput}%`]
              },
              {
                operator: 'LIKE',
                path: 'CompanyProduct.companyGenericProduct.code',
                values: [`%${v.searchInput}%`]
              }
            ]

          if (v && v.company) {
            const company = JSON.parse(v.company)
            if (company.id) {
              filter.and = [
                {
                  operator: 'EQUALS',
                  path: 'CompanyProduct.companyGenericProduct.company.id',
                  values: [`${company.id}`]
                }
              ]
            }
          }
          return filter
        }
      },
      'company-inventory': {
        url: '/prodex/api/product-offers/admin/datagrid',
        searchToFilter: v =>
          v && v.searchInput
            ? [
                {
                  operator: 'LIKE',
                  path: 'ProductOffer.companyProduct.intProductName',
                  values: [`%${v.searchInput}%`]
                },
                {
                  operator: 'LIKE',
                  path: 'ProductOffer.companyProduct.intProductCode',
                  values: [`%${v.searchInput}%`]
                }
              ]
            : []
      },
      orders: {
        url: 'prodex/api/purchase-orders/datagrid',
        searchToFilter: v => {
          let filter = { or: [], and: [] }

          if (v && v.company) {
            const d = JSON.parse(v.company)
            const value = d.cfDisplayName ? d.cfDisplayName : d.name ? d.name : ''
            filter.and = [
              {
                operator: 'LIKE',
                path: 'Order.sellerCompanyName',
                values: [`%${value}%`]
              }
            ]
          }

          if (v && v.status) {
            filter.and = filter.and.concat(v.status)
          }

          if (v && v.orderId)
            filter.and = filter.and.concat([
              {
                operator: 'LIKE',
                path: 'Order.id',
                values: [`%${v.orderId}%`]
              }
            ])

          if (v && v.dateFrom)
            filter.and = filter.and.concat([
              {
                operator: 'GREATER_THAN_OR_EQUAL_TO',
                path: 'Order.orderDate',
                values: [`${v.dateFrom}`]
              }
            ])

          if (v && v.dateTo)
            filter.and = filter.and.concat([
              {
                operator: 'LESS_THAN_OR_EQUAL_TO',
                path: 'Order.orderDate',
                values: [`${v.dateTo}`]
              }
            ])
          return filter
        }
      },
      'company-generic-products': {
        url: '/prodex/api/company-generic-product-requests/datagrid',
        searchToFilter: v =>
          v && v.searchInput
            ? [
              {
                operator: 'LIKE',
                path: 'CompanyGenericProductRequest.productName',
                values: [`%${v.searchInput}%`]
              }
            ]
            : []
      }
    }

    return datagridApiMap[currentTab.type]
  }

  render() {
    const { currentTab, orderDetailData } = this.props

    if (
      !(
        getSafe(() => this.props.auth.identity.isAdmin, false) ||
        !getSafe(() => this.props.auth.identity.isEchoOperator, false)
      )
    )
      return <FormattedMessage id='global.accessDenied' defaultMessage='Access Denied!' />

    const displayPage = !!orderDetailData

    return (
      <DatagridProvider apiConfig={this.getApiConfig()} preserveFilters skipInitLoad>
        <Container fluid className='flex stretched'>
          {displayPage ? (
            this.renderContent()
          ) : (
            <>
              <Container fluid>
                <TablesHandlers currentTab={currentTab} />
              </Container>

              <Grid columns='equal' className='flex stretched' style={{ margin: '0', padding: '0' }}>
                <Grid.Row style={{ margin: '0', padding: '0 0 10px 0' }}>
                  <CustomGridColumn className='flex stretched'>{this.renderContent()}</CustomGridColumn>
                </Grid.Row>
              </Grid>
            </>
          )}
        </Container>
      </DatagridProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.operations,
    auth: state.auth
  }
}

export default withAuth(
  connect(mapStateToProps, Actions)(Operations)
)
