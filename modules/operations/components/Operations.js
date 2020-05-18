import React, { Component } from 'react'
import { connect } from 'react-redux'
import TablesHandlers from './TablesHandlers'
import { Container, Grid, GridColumn, Segment } from 'semantic-ui-react'
import Tabs from './Tabs'
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
import OrdersMenu from './orders/OrdersMenu'
import OrderDetail from './orders/DetailContainer'

import { getSafe } from '~/utils/functions'
import { DatagridProvider } from '~/modules/datagrid'
import { tabChanged } from '../actions'

const CustomGridColumn = styled(GridColumn)`
  padding: 0 32px 0 32px !important;
`

class Operations extends Component {
  renderContent = () => {
    const { currentTab, isOpenPopup, orderDetailData } = this.props

    const tables = {
      'shipping-quotes': <ShippingQuotesTable />,
      tags: <TagsTable />,
      'company-product-catalog': <CompanyProductTable />,
      'company-inventory': <CompanyInventoryTable />,
      orders: orderDetailData ? <OrderDetail /> : <Orders />,
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
          v && v.filterValue
            ? [
                {
                  operator: 'LIKE',
                  path: 'ShippingQuote.carrierName',
                  values: [`%${v.filterValue}%`]
                }
              ]
            : []
      },
      tags: {
        url: 'prodex/api/tags/datagrid',
        searchToFilter: v =>
          v && v.filterValue ? [{ operator: 'LIKE', path: 'Tag.name', values: [`%${v.filterValue}%`] }] : []
      },
      'company-product-catalog': {
        url: `/prodex/api/company-products/admin/datagrid?unmappedOnly=${companyProductUnmappedOnly}`,
        searchToFilter: v => {
          let filter = { or: [], and: [] }

          if (v && v.filterValue)
            filter.or = [
              {
                operator: 'LIKE',
                path: 'CompanyProduct.intProductName',
                values: [`%${v.filterValue}%`]
              },
              {
                operator: 'LIKE',
                path: 'CompanyProduct.intProductCode',
                values: [`%${v.filterValue}%`]
              },
              {
                operator: 'LIKE',
                path: 'CompanyProduct.echoProduct.name',
                values: [`%${v.filterValue}%`]
              },
              {
                operator: 'LIKE',
                path: 'CompanyProduct.echoProduct.code',
                values: [`%${v.filterValue}%`]
              }
            ]

          if (v && v.company)
            filter.and = [
              {
                operator: 'EQUALS',
                path: 'CompanyProduct.owner.id',
                values: [`${v.company}`]
              }
            ]
          return filter
        }
      },
      'company-inventory': {
        url: '/prodex/api/product-offers/admin/datagrid',
        searchToFilter: v =>
          v && v.filterValue
            ? [
                {
                  operator: 'LIKE',
                  path: 'ProductOffer.companyProduct.intProductName',
                  values: [`%${v.filterValue}%`]
                },
                {
                  operator: 'LIKE',
                  path: 'ProductOffer.companyProduct.intProductCode',
                  values: [`%${v.filterValue}%`]
                }
              ]
            : []
      },
      orders: {
        url: 'prodex/api/purchase-orders/datagrid',
        searchToFilter: v => {
          let filter = { or: [], and: [] }
          if (v && v.company)
            filter.and = [
              {
                operator: 'LIKE',
                path: 'Order.sellerCompanyName',
                values: [`%${v.company}%`]
              }
            ]
          return filter
        }
      }
    }

    return datagridApiMap[currentTab.type]
  }

  render() {
    const { currentTab, orderDetailData } = this.props

    //! ! Temporary commented
    //if (!(getSafe(() => this.props.auth.identity.isAdmin, false) || getSafe(() => this.props.auth.identity.isEchoOperator, false)))
    //      return <FormattedMessage id='global.accessDenied' defaultMessage='Access Denied!' />

    const preserveFilters =
      currentTab.type === 'company-product-catalog'
    || currentTab.type === 'orders'

    const displayPage = !!orderDetailData

    return (
      <DatagridProvider apiConfig={this.getApiConfig()} preserveFilters={preserveFilters}>
        <Container fluid className='flex stretched'>
          {currentTab.type === 'orders' && !orderDetailData && <OrdersMenu/>}
          {displayPage
            ? (this.renderContent())
            : (


            <>
            <Container fluid style={{ padding: '0 1.5vh' }}>
              <TablesHandlers currentTab={currentTab} />
            </Container>

          <Grid columns='equal' className='flex stretched' style={{ padding: '0 1.5vh' }}>
            <Grid.Row>
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
    currentTab: state.operations.currentTab,
    auth: state.auth
  }
}

export default withAuth(
  connect(mapStateToProps, {
    tabChanged
  })(Operations)
)
