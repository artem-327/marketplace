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
import * as Actions from '../actions'

import styled from 'styled-components'

const FixyWrapper = styled.div`
  position: relative;
  transform: translateY(0);
  height: 100%;
`

const AdminSegment = styled(Segment)`
  height: auto !important;
  margin-bottom: 42px !important;
  padding-bottom: 0 !important;
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
      <AdminSegment basic padded='very'>
        <Settings inputsInGroup={3} asModal={false} role='admin' />
      </AdminSegment>
    </FixyWrapper>
  )
}

const datagridConfig = {
  Conditions: {
    url: '/prodex/api/product-conditions/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'ProductCondition.name', values: [`%${v.searchInput}%`] }] : []
  },
  'NMFC Numbers': {
    url: '/prodex/api/nmfc-numbers/datagrid',
    searchToFilter: v => {
      let filters = []
      if (v && v.searchInput) {
        filters.push({ operator: 'LIKE', path: 'NmfcNumber.description', values: [`%${v.searchInput}%`] })
        if (Number.isInteger(parseInt(v.searchInput)))
          filters.push({ operator: 'LIKE', path: 'NmfcNumber.prefix', values: [`${parseInt(v.searchInput)}%`] })
      }
      return filters
    }
  },
  Associations: {
    url: 'prodex/api/associations/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'Association.name', values: [`%${v.searchInput}%`] }] : []
  },
  Forms: {
    url: '/prodex/api/product-forms/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'ProductForm.name', values: [`%${v.searchInput}%`] }] : []
  },
  Grades: {
    url: '/prodex/api/product-grades/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'ProductGrade.name', values: [`%${v.searchInput}%`] }] : []
  },
  Manufacturers: {
    url: '/prodex/api/manufacturers/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'Manufacturer.name', values: [`%${v.searchInput}%`] }] : []
  },
  'Packaging Types': {
    url: '/prodex/api/packaging-types/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'PackagingType.name', values: [`%${v.searchInput}%`] }] : []
  },
  'Units of Measure': {
    url: '/prodex/api/units/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'Unit.name', values: [`%${v.searchInput}%`] }] : []
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
  componentWillUnmount() {
    const { currentEditForm, currentAddForm, currentAddDwolla, closePopup } = this.props
    if (currentEditForm || currentAddForm || currentAddDwolla) closePopup()
  }

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
      <DatagridProvider apiConfig={this.getApiConfig()} preserveFilters skipInitLoad>
        <Container fluid className='flex stretched'>
          <>
            {!currentTab.hideHandler && (
              <div style={{ padding: '20px 30px' }}>
                <TablesHandlers />
              </div>
            )}
            <div style={{ padding: '0 30px 20px 30px' }} className='flex stretched'>
              {this.renderContent()}
            </div>
          </>
        </Container>
      </DatagridProvider>
    )
  }
}

const mapStateToProps = state => ({
  ...state.admin,
  auth: state.auth
})

export default withAuth(connect(mapStateToProps, Actions)(Admin))
