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
import {debounce} from "lodash";

const CustomGridColumn = styled(GridColumn)`
  padding: 0 32px 0 32px !important;
`
class Products extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filterValue: ''
    }
    this.handleFiltersValue = debounce(this.handleFiltersValue, 300)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentTab !== this.props.currentTab) {
      this.setState({ filterValue: '' })
      this.handleFiltersValue('')
    }
  }

  handleFilterChange = (e, { value }) => {
    this.setState({ filterValue: value })

    this.handleFiltersValue(value)
  }

  handleFiltersValue = value => {
    // this condition must be ready evrytimes if you inicializate datagridProvider
    if (Datagrid.isReady()) Datagrid.setSearch(value, true, 'pageFilters')
  }

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
          v
            ? [
                { operator: 'LIKE', path: 'CasProduct.casIndexName', values: [`%${v}%`] },
                { operator: 'LIKE', path: 'CasProduct.casNumber', values: [`%${v}%`] }
              ]
            : []
      },
      'product-catalog': {
        url: '/prodex/api/company-generic-products/datagrid',
        searchToFilter: v =>
          v
            ? [
                { operator: 'LIKE', path: 'CompanyGenericProduct.name', values: [`%${v}%`] },
                { operator: 'LIKE', path: 'CompanyGenericProduct.code', values: [`%${v}%`] }
              ]
            : []
      },
      'product-groups': {
        url: '/prodex/api/product-groups/datagrid',
        searchToFilter: v =>
          v
            ? [
                { operator: 'LIKE', path: 'ProductGroup.name', values: [`%${v}%`] },
                { operator: 'LIKE', path: 'ProductGroup.tags.name', values: [`%${v}%`] }
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
      <DatagridProvider apiConfig={this.getApiConfig()}>
        <Container fluid className='flex stretched'>
          <>
            <Container fluid style={{ padding: '0 1.5vh' }}>
              <TablesHandlers currentTab={currentTab} handleFilterChange={this.handleFilterChange} filterValue={this.state.filterValue} />
            </Container>

            <Grid columns='equal' className='flex stretched' style={{ padding: '0 1.5vh' }}>
              <Grid.Row>
                <CustomGridColumn className='flex stretched'>{this.renderContent()}</CustomGridColumn>
              </Grid.Row>
            </Grid>
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
