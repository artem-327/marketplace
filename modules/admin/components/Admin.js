import React, { Component } from 'react'
import { connect } from 'react-redux'
import TablesHandlers from './TablesHandlers'
import { Container, Grid, Divider } from 'semantic-ui-react'
import Tabs from './Tabs'

import DataTable from './DataTable/DataTable'
import UnitOfMeasureTable from './UnitOfMeasureTable/UnitOfMeasureTable'
import UnitOfPackagingTable from './UnitOfPackagingTable/UnitOfPackagingTable'

import AddNewUnitOfMeasurePopup from './UnitOfMeasureTable/AddNewUnitOfMeasurePopup'
import AddNewUnitOfPackagingPopup from './UnitOfPackagingTable/AddNewUnitOfPackagingPopup'
import AddNewPopup1Parameter from './DataTable/AddNewPopup1Parameter'
import AddEditCasProductsPopup from './CasProductsTable/AddEditCasProductsPopup'
import EditAltNamesCasProductsPopup from './CasProductsTable/EditAltNamesCasProductsPopup'

import EditUnitOfMeasurePopup from './UnitOfMeasureTable/EditUnitOfMeasurePopup'
import EditUnitOfPackagingPopup from './UnitOfPackagingTable/EditUnitOfPackagingPopup'
import EditPopup1Parameter from './DataTable/EditPopup1Parameter'

import CasProductsTable from './CasProductsTable/CasProductsTable'
import CompaniesTable from './CompaniesTable/Table'
import CompaniesForm from './CompaniesTable/FormPopup'
import CompaniesDwollaForm from './CompaniesDwolla/FormPopup'

import { DatagridProvider } from '~/modules/datagrid'

const tables = {
  'Units of Measure': <UnitOfMeasureTable />,
  'Units of Packaging': <UnitOfPackagingTable />,
  'Manufacturers': <DataTable />,
  'Grades': <DataTable />,
  'Forms': <DataTable />,
  'Conditions': <DataTable />,
  'CAS Products': <CasProductsTable />,
  'Companies': <CompaniesTable />,
  'Document Types': <DataTable />,
}

const datagridConfig = {
  'CAS Products': {
    url: '/prodex/api/cas-products/datagrid',
    searchToFilter: v => ([
      { operator: 'LIKE', path: 'CasProduct.chemicalName', values: [`%${v}%`] },
      { operator: 'LIKE', path: 'CasProduct.casNumber', values: [`%${v}%`] }
    ]),
    params: {
      orOperator: true
    }
  },
  'Companies': {
    url: '/prodex/api/companies/datagrid',
    searchToFilter: v => ([
      { operator: 'LIKE', path: 'Company.name', values: [`%${v}%`] }
    ])
  },
}

const editForms = {
  'Units of Measure': <EditUnitOfMeasurePopup />,
  'Units of Packaging': <EditUnitOfPackagingPopup />,
  'Manufacturers': <EditPopup1Parameter />,
  'Grades': <EditPopup1Parameter />,
  'Forms': <EditPopup1Parameter />,
  'Conditions': <EditPopup1Parameter />,
  'CAS Products': <AddEditCasProductsPopup />,
  'Companies': <CompaniesForm />,
  'Document Types': <EditPopup1Parameter />,
}

const edit2Forms = {
  'CAS Products': <EditAltNamesCasProductsPopup />,
}

const addForms = {
  'Units of Measure': <AddNewUnitOfMeasurePopup />,
  'Units of Packaging': <AddNewUnitOfPackagingPopup />,
  'Manufacturers': <AddNewPopup1Parameter />,
  'Grades': <AddNewPopup1Parameter />,
  'Forms': <AddNewPopup1Parameter />,
  'Conditions': <AddNewPopup1Parameter />,
  'CAS Products': <AddEditCasProductsPopup />,
  'Companies': <CompaniesForm />,
  'Document Types': <AddNewPopup1Parameter />,
}

const addDwollaForms = {
  'Companies': <CompaniesDwollaForm />
}

class Admin extends Component {

  renderContent = () => {
    const {
      currentEditForm,
      currentEdit2Form,
      currentAddForm,
      currentTab,
      currentAddDwolla
    } = this.props

    return (
      <>
        {currentAddForm && addForms[currentTab]}
        {currentEditForm && editForms[currentTab]}
        {currentEdit2Form && edit2Forms[currentTab]}
        {currentAddDwolla && addDwollaForms[currentTab]}
        {tables[currentTab] || <p>This page is still under construction</p>}
      </>
    )
  }

  getApiConfig = () => {
    const { currentTab } = this.props

    return datagridConfig[currentTab]
  }

  render() {
    if (!!this.props.auth.identity && !this.props.auth.identity.isAdmin) return "Access denied!"

    return (
      <DatagridProvider apiConfig={this.getApiConfig()}>
        <Container fluid className="flex stretched">
          <Container fluid style={{ padding: '0 32px' }}>
            <TablesHandlers />
          </Container>
          <Grid columns='equal' className="flex stretched" style={{ padding: '0 32px' }}>
            <Grid.Row>
              <Grid.Column width={3}>
                <Tabs />
              </Grid.Column>
              <Grid.Column key={this.props.currentTab} style={{ marginTop: '10px' }} className="flex stretched">
                {this.renderContent()}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </DatagridProvider>
    )
  }
}

const mapStateToProps = state => ({ ...state.admin, auth: state.auth })

export default connect(mapStateToProps, null)(Admin)