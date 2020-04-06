import React, { Component } from 'react'
import { connect } from 'react-redux'
import TablesHandlers from './TablesHandlers'
import { Container, Grid, Segment } from 'semantic-ui-react'
import { withAuth } from '~/hocs'
import { FormattedMessage } from 'react-intl'
import Router from 'next/router'
import styled from 'styled-components'

import DataTable from './DataTable/DataTable'
import UnitOfMeasureTable from './UnitOfMeasureTable/UnitOfMeasureTable'
import UnitOfPackagingTable from './UnitOfPackagingTable/UnitOfPackagingTable'
import NmfcTable from './NmfcTable/Container'

import AddNewUnitOfMeasurePopup from './UnitOfMeasureTable/AddNewUnitOfMeasurePopup'
import AddNewUnitOfPackagingPopup from './UnitOfPackagingTable/AddNewUnitOfPackagingPopup'
import AddNewPopup1Parameter from './DataTable/AddNewPopup1Parameter'
import AddEditCasProductsPopup from './CasProductsTable/AddEditCasProductsPopup'
import EditAltNamesCasProductsPopup from './CasProductsTable/EditAltNamesCasProductsPopup'
import NmfcPopup from './NmfcTable/Popup'

import EditUnitOfMeasurePopup from './UnitOfMeasureTable/EditUnitOfMeasurePopup'
import EditUnitOfPackagingPopup from './UnitOfPackagingTable/EditUnitOfPackagingPopup'
import EditPopup1Parameter from './DataTable/EditPopup1Parameter'

import CasProductsTable from './CasProductsTable/CasProductsTable'
import CompaniesTable from './CompaniesTable/Table'
import CompaniesForm from './CompaniesTable/FormPopup'
import CompaniesDwollaForm from './CompaniesDwolla/FormPopup'
import AddEditEchoProduct from './ProductCatalogTable/AddEditEchoProductContainer'

import EditAltNamesEchoProductPopup from './ProductCatalogTable/EditAltNamesEchoProductPopup'

import ProductCatalogTable from './ProductCatalogTable/Table'

import { getSafe } from '~/utils/functions'

import { DatagridProvider } from '~/modules/datagrid'
import Settings from '~/components/settings'
import ProductImportPopup from '~/modules/settings/components/ProductCatalogTable/ProductImportPopup'

import UsersTable from './UsersTable/Table'
import UsersSidebar from './UsersTable/UsersSidebar'

const FixyWrapper = styled.div`
  position: relative;
  transform: translateY(0);
`

const ScrollableSegment = styled(Segment)`
  max-height: 90vh;
  overflow-y: auto;
`

const enableSideProductEdit = true

const tables = {
  'Units of Measure': <UnitOfMeasureTable />,
  'Units of Packaging': <UnitOfPackagingTable />,
  Manufacturers: <DataTable />,
  Grades: <DataTable />,
  Forms: <DataTable />,
  Conditions: <DataTable />,
  'NMFC Numbers': <NmfcTable />,
  'CAS Products': <CasProductsTable />,
  Companies: <CompaniesTable />,
  'Product Catalog': <ProductCatalogTable />,
  'Document Types': <DataTable />,
  Associations: <DataTable />,
  'Market Segments': <DataTable />,
  Users: <UsersTable />,
  'Admin Settings': (
    <FixyWrapper>
      <ScrollableSegment basic padded='very'>
        <Settings inputsInGroup={3} asModal={false} role='admin' />
      </ScrollableSegment>
    </FixyWrapper>
  )
}

const datagridConfig = {
  'CAS Products': {
    url: '/prodex/api/cas-products/datagrid',
    searchToFilter: v =>
      v
        ? [
            { operator: 'LIKE', path: 'CasProduct.casIndexName', values: [`%${v}%`] },
            { operator: 'LIKE', path: 'CasProduct.casNumber', values: [`%${v}%`] }
          ]
        : []
  },
  Companies: {
    url: '/prodex/api/companies/datagrid',
    searchToFilter: v =>
      v
        ? [
            { operator: 'LIKE', path: 'Company.name', values: [`%${v}%`] },
            { operator: 'LIKE', path: 'Company.cfDisplayName', values: [`%${v}%`] },
          ]
        : []
  },
  'Product Catalog': {
    url: '/prodex/api/echo-products/datagrid',
    searchToFilter: v =>
      v
        ? [
            { operator: 'LIKE', path: 'EchoProduct.name', values: [`%${v}%`] },
            { operator: 'LIKE', path: 'EchoProduct.code', values: [`%${v}%`] }
          ]
        : []
  },
  Conditions: {
    url: '/prodex/api/product-conditions/datagrid',
    searchToFilter: v => (v ? [{ operator: 'LIKE', path: 'ProductCondition.name', values: [`%${v}%`] }] : [])
  },
  'NMFC Numbers': {
    url: '/prodex/api/nmfc-numbers/datagrid',
    searchToFilter: v =>
      v
        ? [
            { operator: 'EQUALS', path: 'NmfcNumber.code', values: [v] },
            { operator: 'LIKE', path: 'NmfcNumber.description', values: [`%${v}%`] }
          ]
        : []
  },
  'Document Types': {
    url: 'prodex/api/document-types/datagrid',
    searchToFilter: v => (v ? [{ operator: 'LIKE', path: 'DocumentType.name', values: [`%${v}%`] }] : [])
  },
  Associations: {
    url: 'prodex/api/associations/datagrid',
    searchToFilter: v => (v ? [{ operator: 'LIKE', path: 'Association.name', values: [`%${v}%`] }] : [])
  },
  Forms: {
    url: '/prodex/api/product-forms/datagrid',
    searchToFilter: v => (v ? [{ operator: 'LIKE', path: 'ProductForm.name', values: [`%${v}%`] }] : [])
  },
  Grades: {
    url: '/prodex/api/product-grades/datagrid',
    searchToFilter: v => (v ? [{ operator: 'LIKE', path: 'ProductGrade.name', values: [`%${v}%`] }] : [])
  },
  Manufacturers: {
    url: '/prodex/api/manufacturers/datagrid',
    searchToFilter: v => (v ? [{ operator: 'LIKE', path: 'Manufacturer.name', values: [`%${v}%`] }] : [])
  },
  'Market Segments': {
    url: '/prodex/api/market-segments/datagrid',
    searchToFilter: v => (v ? [{ operator: 'LIKE', path: 'MarketSegment.name', values: [`%${v}%`] }] : [])
  },
  'Units of Packaging': {
    url: '/prodex/api/packaging-types/datagrid',
    searchToFilter: v => (v ? [{ operator: 'LIKE', path: 'PackagingType.name', values: [`%${v}%`] }] : [])
  },
  'Units of Measure': {
    url: '/prodex/api/units/datagrid',
    searchToFilter: v => (v ? [{ operator: 'LIKE', path: 'Unit.name', values: [`%${v}%`] }] : [])
  },
  Users: {
    url: `/prodex/api/users/datagrid/all`,
    searchToFilter: v =>
      v
        ? [
            { operator: 'LIKE', path: 'User.name', values: [`%${v}%`] },
            {
              operator: 'LIKE',
              path: 'User.homeBranch.deliveryAddress.contactName',
              values: [`%${v}%`]
            }
          ]
        : []
  }
}

const editForms = {
  'Units of Measure': <EditUnitOfMeasurePopup />,
  'Units of Packaging': <EditUnitOfPackagingPopup />,
  Manufacturers: <EditPopup1Parameter />,
  Grades: <EditPopup1Parameter />,
  Forms: <EditPopup1Parameter />,
  Conditions: <EditPopup1Parameter />,
  'NMFC Numbers': <NmfcPopup />,
  'CAS Products': <AddEditCasProductsPopup />,
  Companies: <CompaniesForm />,
  'Document Types': <EditPopup1Parameter />,
  Associations: <EditPopup1Parameter />,
  'Market Segments': <EditPopup1Parameter />
}

const edit2Forms = {
  'CAS Products': <EditAltNamesCasProductsPopup />,
  'Product Catalog': <EditAltNamesEchoProductPopup />
}

const addForms = {
  'Units of Measure': <AddNewUnitOfMeasurePopup />,
  'Units of Packaging': <AddNewUnitOfPackagingPopup />,
  Manufacturers: <AddNewPopup1Parameter />,
  Grades: <AddNewPopup1Parameter />,
  Forms: <AddNewPopup1Parameter />,
  Conditions: <AddNewPopup1Parameter />,
  'NMFC Numbers': <NmfcPopup />,
  'CAS Products': <AddEditCasProductsPopup />,
  Companies: <CompaniesForm />,
  'Document Types': <AddNewPopup1Parameter />,
  Associations: <AddNewPopup1Parameter />,
  'Market Segments': <AddNewPopup1Parameter />
}

const editSidebar = {
  Users: <UsersSidebar />
}

const importForm = {
  'Product Catalog': <ProductImportPopup echoProduct={true} />,
  Companies: <ProductImportPopup companies={true} />
}

const addDwollaForms = {
  Companies: <CompaniesDwollaForm />
}

class Admin extends Component {
  renderContent = () => {
    const {
      currentEditForm,
      currentEdit2Form,
      currentAddForm,
      currentTab,
      currentAddDwolla,
      isOpenImportPopup
    } = this.props

    return (
      <>
        {currentAddForm && addForms[currentTab.name]}
        {currentEditForm && editForms[currentTab.name]}
        {currentEdit2Form && edit2Forms[currentTab.name]}
        {isOpenImportPopup && importForm[currentTab.name]}
        {currentAddDwolla && addDwollaForms[currentTab.name] && Router.push('/dwolla-register/')}
        {tables[currentTab.name] || <p>This page is still under construction</p>}
      </>
    )
  }

  getApiConfig = () => {
    const { currentTab } = this.props

    return datagridConfig[currentTab.name]
  }

  render() {
    if (!getSafe(() => this.props.auth.identity.isAdmin, false))
      return <FormattedMessage id='global.accessDenied' defaultMessage='Access Denied!' />
    const {
      currentEditForm,
      currentEdit2Form,
      currentAddForm,
      currentTab,
      currentAddDwolla,
      isOpenImportPopup
    } = this.props

    return (
      <DatagridProvider apiConfig={this.getApiConfig()}>
        <Container fluid className='flex stretched'>
          {!currentTab.hideHandler && (
            <Container fluid style={{ padding: '0 32px' }}>
              <TablesHandlers />
            </Container>
          )}
          <Grid columns='equal' className='flex stretched' style={{ padding: '0 32px' }}>
            <Grid.Row>
              <Grid.Column key={this.props.currentTab} style={{ marginTop: '10px' }} className='flex stretched'>
                {this.renderContent()}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        {enableSideProductEdit && <AddEditEchoProduct tabName={'Product Catalog'} />}
        {(currentAddForm || currentEditForm) && editSidebar[currentTab.name]}
      </DatagridProvider>
    )
  }
}

const mapStateToProps = state => ({
  ...state.admin,
  auth: state.auth,
  isOpenImportPopup: state.settings.isOpenImportPopup
})

export default withAuth(connect(mapStateToProps, null)(Admin))
