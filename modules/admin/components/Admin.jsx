import { useEffect } from 'react'
import { connect } from 'react-redux'
import TablesHandlers from './TablesHandlers'
import { Container, Grid, Segment } from 'semantic-ui-react'
import { withAuth } from '../../../hocs'
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

import { getSafe } from '../../../utils/functions'

import { DatagridProvider } from '../../datagrid'
import Settings from '../../../components/settings'
import * as Actions from '../actions'

import LogisticsTable from './LogisticsTable/LogisticsTable'
import AddEditLogisticProvider from './LogisticsTable/AddEditLogisticProvider'
import Carriers from './Carriers/Carriers'
import AddEditCarrier from './Carriers/AddEditCarrier'

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
  'units-of-measure': <UnitOfMeasureTable />,
  'packaging-types': <UnitOfPackagingTable />,
  manufacturers: <DataTable currentTab={'manufacturers'} />,
  grades: <DataTable currentTab={'grades'} />,
  forms: <DataTable currentTab={'forms'} />,
  conditions: <DataTable currentTab={'conditions'} />,
  'nmfc-numbers': <NmfcTable />,
  associations: <DataTable currentTab={'associations'} />,
  logistics: <LogisticsTable />,
  carriers: <Carriers />,
  'admin-settings': (
    <FixyWrapper>
      <AdminSegment basic padded='very'>
        <Settings inputsInGroup={3} asModal={false} role='admin' />
      </AdminSegment>
    </FixyWrapper>
  )
}

const datagridConfig = {
  conditions: {
    url: '/prodex/api/product-conditions/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'ProductCondition.name', values: [`%${v.searchInput}%`] }] : []
  },
  'nmfc-numbers': {
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
  associations: {
    url: '/prodex/api/associations/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'Association.name', values: [`%${v.searchInput}%`] }] : []
  },
  forms: {
    url: '/prodex/api/product-forms/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'ProductForm.name', values: [`%${v.searchInput}%`] }] : []
  },
  grades: {
    url: '/prodex/api/product-grades/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'ProductGrade.name', values: [`%${v.searchInput}%`] }] : []
  },
  manufacturers: {
    url: '/prodex/api/manufacturers/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'Manufacturer.name', values: [`%${v.searchInput}%`] }] : []
  },
  'packaging-types': {
    url: '/prodex/api/packaging-types/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'PackagingType.name', values: [`%${v.searchInput}%`] }] : []
  },
  'units-of-measure': {
    url: '/prodex/api/units/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'Unit.name', values: [`%${v.searchInput}%`] }] : []
  },
  logistics: {
    url: '/prodex/api/logistics-providers/stored/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'LogisticsProvider.name', values: [`%${v.searchInput}%`] }] : []
  },
  carriers: {
    url: '/prodex/api/logistics-carriers/stored/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'LogisticsCarrier.code', values: [`%${v.searchInput}%`] }] : []
  }
}

const editForms = {
  'units-of-measure': <EditUnitOfMeasurePopup />,
  'packaging-types': <EditUnitOfPackagingPopup />,
  manufacturers: <EditPopup1Parameter currentTab={'manufacturers'} />,
  grades: <EditPopup1Parameter currentTab={'grades'} />,
  forms: <EditPopup1Parameter currentTab={'forms'} />,
  conditions: <EditPopup1Parameter currentTab={'conditions'} />,
  'nmfc-numbers': <NmfcPopup />,
  associations: <EditPopup1Parameter currentTab={'associations'} />,
  logistics: <AddEditLogisticProvider />,
  carriers: <AddEditCarrier />
}

const addForms = {
  'units-of-measure': <AddNewUnitOfMeasurePopup />,
  'packaging-types': <AddNewUnitOfPackagingPopup />,
  manufacturers: <AddNewPopup1Parameter currentTab={'manufacturers'} />,
  grades: <AddNewPopup1Parameter currentTab={'grades'} />,
  forms: <AddNewPopup1Parameter currentTab={'forms'} />,
  conditions: <AddNewPopup1Parameter currentTab={'conditions'} />,
  'nmfc-numbers': <NmfcPopup />,
  associations: <AddNewPopup1Parameter currentTab={'associations'} />,
  logistics: <AddEditLogisticProvider />,
  carriers: <AddEditCarrier />
}

const addDwollaForms = {
  Companies: <CompaniesDwollaForm />
}

const Admin = props => {
  useEffect(() => {
    return () => {
      const { currentEditForm, currentAddForm, currentAddDwolla, closePopup } = props
      if (currentEditForm || currentAddForm || currentAddDwolla) closePopup()
    }
  }, [])

  const renderContent = () => {
    const { currentEditForm, currentAddForm, currentTab, currentAddDwolla } = props
    return (
      <>
        {currentAddForm && addForms[currentTab]}
        {currentEditForm && editForms[currentTab]}
        {currentAddDwolla && addDwollaForms[currentTab] && Router.push('/dwolla-register/')}
        {tables[currentTab] || <p>This page is still under construction</p>}
      </>
    )
  }

  const getApiConfig = () => {
    const { currentTab } = props

    return datagridConfig[currentTab]
  }

  if (!getSafe(() => props.auth.identity.isAdmin, false))
    return <FormattedMessage id='global.accessDenied' defaultMessage='Access Denied!' />
  const { currentEditForm, currentAddForm, currentTab, currentAddDwolla } = props

  return (
    <DatagridProvider apiConfig={getApiConfig()} preserveFilters skipInitLoad>
      <Container fluid className='flex stretched'>
        <>
          {currentTab !== 'admin-settings' && (
            <div style={{ padding: '20px 30px' }}>
              <TablesHandlers currentTab={currentTab} />
            </div>
          )}
          <div style={{ padding: '0 30px 20px 30px' }} className='flex stretched'>
            {renderContent()}
          </div>
        </>
      </Container>
    </DatagridProvider>
  )
}

const mapStateToProps = state => ({
  ...state.admin,
  auth: state.auth
})

export default withAuth(connect(mapStateToProps, Actions)(Admin))
