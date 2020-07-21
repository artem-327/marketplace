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
import ProductImportPopup from '~/modules/settings/components/ProductCatalogTable/ProductImportPopup'
import AddEditCasProductsPopup from './CasProductsTable/AddEditCasProductsPopup'
import AddEditEchoProduct from './ProductCatalogTable/AddEditEchoProductContainer'
import ProductGroupsTable from './ProductGroups/ProductGroupsTable'
import ProductGroupsPopup from './ProductGroups/ProductGroupsPopup'

import { getSafe } from '~/utils/functions'
import { DatagridProvider, withDatagrid, Datagrid } from '~/modules/datagrid'

const CustomGridColumn = styled(GridColumn)`
  padding: 0 32px 0 32px !important;
`
class Products extends Component {
  renderContent = () => {
    const { currentTab, currentEdit2Form, currentAddForm, currentEditForm, isOpenImportPopup } = this.props

    const tables = {
      'cas-products': <CasProductsTable />,
      'product-catalog': <ProductCatalogTable />,
      'product-groups': <ProductGroupsTable handleFilterChange={this.handleFilterChange} />
    }

    const addForms = {
      'cas-products': <AddEditCasProductsPopup />,
      'product-groups': <ProductGroupsPopup />
    }

    const editForms = {
      'cas-products': <AddEditCasProductsPopup />,
      'product-groups': <ProductGroupsPopup />
    }

    const edit2Forms = {
      'cas-products': <EditAltNamesCasProductsPopup />,
      'product-catalog': <EditAltNamesEchoProductPopup />
    }

    const importForm = {
      'product-catalog': <ProductImportPopup companyGenericProduct={true} />
    }

    return (
      <>
        {currentAddForm && addForms[currentTab.type]}
        {currentEditForm && editForms[currentTab.type]}
        {isOpenImportPopup && importForm[currentTab.type]}
        {currentEdit2Form && edit2Forms[currentTab.type]}
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
          v && v.searchInput
            ? [
                { operator: 'LIKE', path: 'CasProduct.casIndexName', values: [`%${v.searchInput}%`] },
                { operator: 'LIKE', path: 'CasProduct.casNumber', values: [`%${v.searchInput}%`] }
              ]
            : []
      },
      'product-catalog': {
        url: '/prodex/api/company-generic-products/datagrid',
        searchToFilter: v =>
          v && v.searchInput
            ? [
                { operator: 'LIKE', path: 'CompanyGenericProduct.name', values: [`%${v.searchInput}%`] },
                { operator: 'LIKE', path: 'CompanyGenericProduct.code', values: [`%${v.searchInput}%`] },
                {
                  operator: 'LIKE',
                  path: 'CompanyGenericProduct.company.cfDisplayName',
                  values: [`%${v.searchInput}%`]
                }
              ]
            : []
      },
      'product-groups': {
        url: '/prodex/api/product-groups/datagrid',
        searchToFilter: v =>
          v && v.searchInput
            ? [
                { operator: 'LIKE', path: 'ProductGroup.name', values: [`%${v.searchInput}%`] },
                { operator: 'LIKE', path: 'ProductGroup.tags.name', values: [`%${v.searchInput}%`] }
              ]
            : []
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
      <DatagridProvider apiConfig={this.getApiConfig()} preserveFilters skipInitLoad>
        <Container fluid className='flex stretched'>
          <>
            <div style={{ padding: '20px 30px' }}>
              <TablesHandlers currentTab={currentTab} />
            </div>
            <div style={{ padding: '0 30px 20px 30px' }} className='flex stretched'>
              {this.renderContent()}
            </div>
          </>
        </Container>
        <AddEditEchoProduct tabName={'Product Catalog'} />
      </DatagridProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.productsAdmin,
    currentTab: state.productsAdmin.currentTab,
    auth: state.auth,
    isOpenImportPopup: state.settings.isOpenImportPopup,
    currentEdit2Form: state.productsAdmin.currentEdit2Form,
    currentEditForm: state.productsAdmin.currentEditForm,
    currentAddForm: state.productsAdmin.currentAddForm
  }
}

export default withDatagrid(withAuth(connect(mapStateToProps)(Products)))
