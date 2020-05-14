import React, { Component } from 'react'
import { connect } from 'react-redux'
import TablesHandlers from './TablesHandlers'
import { Container, Grid, GridColumn, Segment } from 'semantic-ui-react'
import { withAuth } from '~/hocs'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import CasProductsTable from './CasProductsTable/CasProductsTable'
import ProductCatalogTable from './ProductCatalogTable/Table'
import EditAltNamesCasProductsPopup from './CasProductsTable/EditAltNamesCasProductsPopup'
import EditAltNamesEchoProductPopup from './ProductCatalogTable/EditAltNamesEchoProductPopup'

import { getSafe } from '~/utils/functions'
import { DatagridProvider } from '~/modules/datagrid'

const CustomGridColumn = styled(GridColumn)`
  padding: 0 32px 0 32px !important;
`

class Products extends Component {
  renderContent = () => {
    const { currentTab, isOpenPopup, orderDetailData } = this.props

    const tables = {
      'cas-products': <CasProductsTable />,
      'product-catalog': <ProductCatalogTable />
    }

    const popupForm = {
      'cas-products': <EditAltNamesCasProductsPopup />,
      'product-catalog': <EditAltNamesEchoProductPopup />
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
      'cas-products': {
        url: '/prodex/api/cas-products/datagrid',
        searchToFilter: v =>
          v
            ? [
                { operator: 'LIKE', path: 'CasProduct.casIndexName', values: [`%${v}%`] },
                { operator: 'LIKE', path: 'CasProduct.casNumber', values: [`%${v}%`] }
              ]
            : []
      },
      'product-catalog': {
        url: '/prodex/api/echo-products/datagrid',
        searchToFilter: v =>
          v
            ? [
                { operator: 'LIKE', path: 'EchoProduct.name', values: [`%${v}%`] },
                { operator: 'LIKE', path: 'EchoProduct.code', values: [`%${v}%`] }
              ]
            : []
      }
    }

    return datagridApiMap[currentTab.type]
  }

  render() {
    const { currentTab, orderDetailData } = this.props

    //! ! Temporary commented
    //if (!(getSafe(() => this.props.auth.identity.isAdmin, false) || getSafe(() => this.props.auth.identity.isEchoOperator, false)))
    //      return <FormattedMessage id='global.accessDenied' defaultMessage='Access Denied!' />

    const preserveFilters = currentTab.type === 'product-catalog'

    return (
      <DatagridProvider apiConfig={this.getApiConfig()} preserveFilters={preserveFilters}>
        <Container fluid className='flex stretched'>
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
        </Container>
      </DatagridProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.productsAdmin,
    currentTab: state.productsAdmin.currentTab,
    auth: state.auth
  }
}

export default withAuth(connect(mapStateToProps)(Products))
