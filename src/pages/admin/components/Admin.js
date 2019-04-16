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
import AddNewPopupCasProducts from './CasProductsTable/AddNewPopupCasProducts'

import EditUnitOfMeasurePopup from './UnitOfMeasureTable/EditUnitOfMeasurePopup'
import EditUnitOfPackagingPopup from './UnitOfPackagingTable/EditUnitOfPackagingPopup'
import EditPopup1Parameter from './DataTable/EditPopup1Parameter'

import CasProductsTable from './CasProductsTable/CasProductsTable'
import CompaniesTable from './CompaniesTable/Table'
import CompaniesForm from './CompaniesTable/FormPopup'

const tables = {
  'Units of Measure': <UnitOfMeasureTable />,
  'Units of Packaging': <UnitOfPackagingTable />,
  'Manufacturers': <DataTable />,
  'Grades': <DataTable />,
  'Forms': <DataTable />,
  'Conditions': <DataTable />,
  'CAS Products': <CasProductsTable />,
  'Companies': <CompaniesTable />
}

const editForms = {
  'Units of Measure': <EditUnitOfMeasurePopup />,
  'Units of Packaging': <EditUnitOfPackagingPopup />,
  'Manufacturers': <EditPopup1Parameter />,
  'Grades': <EditPopup1Parameter />,
  'Forms': <EditPopup1Parameter />,
  'Conditions': <EditPopup1Parameter />,
  'Companies': <CompaniesForm />
}

const addForms = {
  'Units of Measure': <AddNewUnitOfMeasurePopup />,
  'Units of Packaging': <AddNewUnitOfPackagingPopup />,
  'Manufacturers': <AddNewPopup1Parameter />,
  'Grades': <AddNewPopup1Parameter />,
  'Forms': <AddNewPopup1Parameter />,
  'Conditions': <AddNewPopup1Parameter />,
  'CAS Products': <AddNewPopupCasProducts />,
  'Companies': <CompaniesForm />
}

class Admin extends Component {

  renderContent = () => {
    const {
      currentEditForm,
      currentAddForm,
      currentTab,
    } = this.props

    return (
      <>
        {currentAddForm && addForms[currentTab]}
        {currentEditForm && editForms[currentTab]}
        {<div style={{marginTop: '5px'}}>{tables[currentTab]}</div> || <p>This page is still under construction</p>}
      </>
    )
  }

  render() {
    if (!!this.props.auth.identity && !this.props.auth.identity.isAdmin) return "Access denied!"

    return (
      <Container fluid>
        <TablesHandlers />
        <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column width={3}>
              <Tabs />
            </Grid.Column>
            <Grid.Column key={this.props.currentTab}>
              {this.renderContent()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return { ...state.admin, auth: state.auth }
}

export default connect(mapStateToProps, null)(Admin)