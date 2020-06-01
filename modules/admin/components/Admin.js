import React, { Component } from 'react'
import { connect } from 'react-redux'
import TablesHandlers from './TablesHandlers'
import { Container, Grid, Segment } from 'semantic-ui-react'
import { withAuth } from '~/hocs'
import { FormattedMessage } from 'react-intl'
import Router from 'next/router'

import DataTable from './DataTable/DataTable'
import UnitOfMeasureTable from './UnitOfMeasureTable/UnitOfMeasureTable'
import UnitOfPackagingTable from './UnitOfPackagingTable/UnitOfPackagingTable'
import NmfcTable from './NmfcTable/Container'

import AddNewUnitOfMeasurePopup from './UnitOfMeasureTable/AddNewUnitOfMeasurePopup'
import AddNewUnitOfPackagingPopup from './UnitOfPackagingTable/AddNewUnitOfPackagingPopup'
import AddNewPopup1Parameter from './DataTable/AddNewPopup1Parameter'
import NmfcPopup from './NmfcTable/Popup'

import EditUnitOfMeasurePopup from './UnitOfMeasureTable/EditUnitOfMeasurePopup'
import EditUnitOfPackagingPopup from './UnitOfPackagingTable/EditUnitOfPackagingPopup'
import EditPopup1Parameter from './DataTable/EditPopup1Parameter'

import CompaniesDwollaForm from './CompaniesDwolla/FormPopup'

import { getSafe } from '~/utils/functions'

import { DatagridProvider } from '~/modules/datagrid'
import Settings from '~/components/settings'

import styled from 'styled-components'

const FixyWrapper = styled.div`
  position: relative;
  transform: translateY(0);
`

const ScrollableSegment = styled(Segment)`
  max-height: 90vh;
  overflow-y: auto;
`

const tables = {
  'Units of Measure': <UnitOfMeasureTable />,
  'Packaging Types': <UnitOfPackagingTable />,
  Manufacturers: <DataTable />,
  Grades: <DataTable />,
  Forms: <DataTable />,
  Conditions: <DataTable />,
  'NMFC Numbers': <NmfcTable />,
  Associations: <DataTable />,
  'Admin Settings': (
    <FixyWrapper>
      <ScrollableSegment basic padded='very'>
        <Settings inputsInGroup={3} asModal={false} role='admin' />
      </ScrollableSegment>
    </FixyWrapper>
  )
}

const datagridConfig = {
  Conditions: {
    url: '/prodex/api/product-conditions/datagrid',
    searchToFilter: v => (v ? [{ operator: 'LIKE', path: 'ProductCondition.name', values: [`%${v}%`] }] : [])
  },
  'NMFC Numbers': {
    url: '/prodex/api/nmfc-numbers/datagrid',
    searchToFilter: v => {
      let filters = []
      if (v) {
        filters.push({ operator: 'LIKE', path: 'NmfcNumber.description', values: [`%${v}%`] })
        if (Number.isInteger(parseInt(v)))
          filters.push({ operator: 'LIKE', path: 'NmfcNumber.prefix', values: [`${parseInt(v)}%`] })
      }
      return filters
    }
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
  'Packaging Types': {
    url: '/prodex/api/packaging-types/datagrid',
    searchToFilter: v => (v ? [{ operator: 'LIKE', path: 'PackagingType.name', values: [`%${v}%`] }] : [])
  },
  'Units of Measure': {
    url: '/prodex/api/units/datagrid',
    searchToFilter: v => (v ? [{ operator: 'LIKE', path: 'Unit.name', values: [`%${v}%`] }] : [])
  }
}

const editForms = {
  'Units of Measure': <EditUnitOfMeasurePopup />,
  'Packaging Types': <EditUnitOfPackagingPopup />,
  Manufacturers: <EditPopup1Parameter />,
  Grades: <EditPopup1Parameter />,
  Forms: <EditPopup1Parameter />,
  Conditions: <EditPopup1Parameter />,
  'NMFC Numbers': <NmfcPopup />,
  Associations: <EditPopup1Parameter />
}

const addForms = {
  'Units of Measure': <AddNewUnitOfMeasurePopup />,
  'Packaging Types': <AddNewUnitOfPackagingPopup />,
  Manufacturers: <AddNewPopup1Parameter />,
  Grades: <AddNewPopup1Parameter />,
  Forms: <AddNewPopup1Parameter />,
  Conditions: <AddNewPopup1Parameter />,
  'NMFC Numbers': <NmfcPopup />,
  Associations: <AddNewPopup1Parameter />
}

const addDwollaForms = {
  Companies: <CompaniesDwollaForm />
}

class Admin extends Component {
  renderContent = () => {
    const { currentEditForm, currentAddForm, currentTab, currentAddDwolla } = this.props
    return (
      <>
        {currentAddForm && addForms[currentTab.name]}
        {currentEditForm && editForms[currentTab.name]}
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
    const { currentEditForm, currentAddForm, currentTab, currentAddDwolla } = this.props

    return (
      <DatagridProvider apiConfig={this.getApiConfig()}>
        <Container fluid className='flex stretched'>
          {!currentTab.hideHandler && (
            <Container fluid style={{ padding: '0 32px' }}>
              <TablesHandlers />
            </Container>
          )}
          <Grid
            columns='equal'
            className='flex stretched'
            style={{ marginTop: '0', marginBottom: '0', padding: '0 32px' }}>
            <Grid.Row>
              <Grid.Column key={this.props.currentTab} style={{ marginTop: '10px' }} className='flex stretched'>
                {this.renderContent()}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </DatagridProvider>
    )
  }
}

const mapStateToProps = state => ({
  ...state.admin,
  auth: state.auth
})

export default withAuth(connect(mapStateToProps, null)(Admin))
