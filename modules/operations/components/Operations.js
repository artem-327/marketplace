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

import { getSafe } from '~/utils/functions'
import { DatagridProvider } from '~/modules/datagrid'
import { tabChanged } from '../actions'

const CustomGridColumn = styled(GridColumn)`
  padding: 0 32px 0 32px !important;
`

class Operations extends Component {
  renderContent = () => {
    const { currentTab, isOpenPopup } = this.props

    const tables = {
      'shipping-quotes': <ShippingQuotesTable />,
      tags: <TagsTable />,
      'company-product-catalog': <CompanyProductTable />,
      'company-inventory': <CompanyInventoryTable />
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
    const { currentTab } = this.props

    const datagridApiMap = {
      'shipping-quotes': {
        url: '/prodex/api/shipment/manual-quotes/datagrid',
        //TODO add path when exist
        searchToFilter: v =>
          v
            ? [
                {
                  operator: 'LIKE',
                  path: '',
                  values: [`%${v}%`]
                }
              ]
            : []
      },
      tags: {
        url: 'prodex/api/tags/datagrid',
        searchToFilter: v => (v ? [{ operator: 'LIKE', path: 'Tag.name', values: [`%${v}%`] }] : [])
      },
      'company-product-catalog': {
        url: '/prodex/api/company-products/admin/datagrid',
        searchToFilter: v =>
          v
            ? [
              {
                operator: 'LIKE',
                path: 'CompanyProduct.intProductName',
                values: [`%${v}%`]
              },
              {
                operator: 'LIKE',
                path: 'CompanyProduct.intProductCode',
                values: [`%${v}%`]
              },
              {
                operator: 'LIKE',
                path: 'CompanyProduct.echoProduct.name',
                values: [`%${v}%`]
              },
              {
                operator: 'LIKE',
                path: 'CompanyProduct.echoProduct.code',
                values: [`%${v}%`]
              }
            ]
            : [],
        params: {
          orOperator: true
        }
      },
      'company-inventory': {
        url: '/prodex/api/product-offers/admin/datagrid',
        searchToFilter: v =>
          v
            ? [
              {
                operator: 'LIKE',
                path: 'ProductOffer.companyProduct.intProductName',
                values: [`%${v}%`]
              },
              {
                operator: 'LIKE',
                path: 'ProductOffer.companyProduct.intProductCode',
                values: [`%${v}%`]
              }
            ]
            : [],
        params: {
          orOperator: true
        }
      }
    }

    return datagridApiMap[currentTab.type]
  }

  render() {
    const { currentTab } = this.props

    //! ! Temporary commented
    //if (!(getSafe(() => this.props.auth.identity.isAdmin, false) || getSafe(() => this.props.auth.identity.isEchoOperator, false)))
    //      return <FormattedMessage id='global.accessDenied' defaultMessage='Access Denied!' />

    return (
      <DatagridProvider apiConfig={this.getApiConfig()}>
        <Container fluid className='flex stretched'>
          <Container fluid style={{ padding: '0 1.5vh' }}>
            {<TablesHandlers currentTab={currentTab} />}
          </Container>
          <Grid columns='equal' className='flex stretched' style={{ padding: '0 1.5vh' }}>
            <Grid.Row>
              <CustomGridColumn className='flex stretched'>{this.renderContent()}</CustomGridColumn>
            </Grid.Row>
          </Grid>
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
