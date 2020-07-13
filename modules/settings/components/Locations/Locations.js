import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid } from 'semantic-ui-react'
import styled from 'styled-components'

import Router from 'next/router'

import { tabChanged } from '../../actions'
import { getIdentity } from '~/modules/auth/actions'
import { DatagridProvider } from '~/modules/datagrid'

import { withToastManager } from 'react-toast-notifications'
import { getSafe, generateToastMarkup } from '~/utils/functions'

import TopMenu from './TopMenu'
import TablesHandlers from './TablesHandlers'
import Tutorial from '~/modules/tutorial/Tutorial'

import PickUpLocationsTable from './PickUpLocationsTable/PickUpLocationsTable'
import BranchesTable from './BranchesTable/BranchesTable'
import PickUpLocationsSidebar from './PickUpLocationsTable/PickUpLocationsSidebar'
import BranchesSidebar from './BranchesTable/BranchesSidebar'
import DeliveryLocationsTable from './DeliveryLocationsTable/DeliveryLocationsTable'
import DeliveryLocationsSidebar from './DeliveryLocationsTable/DeliveryLocationsSidebar'

const SettingsGrid = styled(Grid)`
  flex-direction: column !important;
  margin-top: 0;
  margin-bottom: 0 !important;
  padding-bottom: 1em !important;

  > .row {
    flex-direction: column !important;
    flex-grow: 1 !important;
    flex-shrink: 1 !important;
    height: calc(100% + 1px) !important;
    padding-bottom: 0 !important;

    > .column {
      flex-grow: 1 !important;
      flex-shrink: 1 !important;
      height: 100%;
      padding-bottom: 0 !important;

      > [class*='FixyWrapper'] {
        height: 100%;

        > .segment {
          height: 100%;
        }
      }
    }
  }
`

const CustomGridColumn = styled(Grid.Column)`
  > form + .ui.segment {
    margin-top: 0;
  }
  padding-top: '10px';
  padding-bottom: '10px';
`

class Locations extends Component {

  componentDidMount = async () => {
    const { getIdentity } = this.props
    try {
      await getIdentity()
    } catch (error) {
      console.error(error)
    }
  }

  renderContent = () => {
    const {
      activeTab,
      isOpenPopup,
      isUserAdmin,
      isOpenSidebar
    } = this.props

    const tables = {
      'delivery-locations': <DeliveryLocationsTable />,
      'pick-up-locations': <PickUpLocationsTable />,
      branches: <BranchesTable />
    }

    const popupForm = {
      'delivery-locations': <DeliveryLocationsSidebar />,
      'pick-up-locations': <PickUpLocationsSidebar />,
      branches: <BranchesSidebar />
    }

    return (
      <>
        {(isOpenPopup || isOpenSidebar) && popupForm[activeTab]}
        {tables[activeTab] || <p>This page is still under construction</p>}
      </>
    )
  }

  getApiConfig = () => {
    const { activeTab } = this.props

    const datagridApiMap = {
      'delivery-locations': {
        url: '/prodex/api/delivery-addresses/datagrid',
        searchToFilter: v =>
          v && v.searchInput
            ? [
              {
                operator: 'LIKE',
                path: 'DeliveryAddress.address.streetAddress',
                values: [`%${v.searchInput}%`]
              }
            ]
            : []
      },
      'pick-up-locations': {
        url: `/prodex/api/branches/warehouses/datagrid`,
        searchToFilter: v =>
          v && v.searchInput
            ? [
              {
                operator: 'LIKE',
                path: 'Branch.deliveryAddress.addressName',
                values: [`%${v.searchInput}%`]
              },
              {
                operator: 'LIKE',
                path: 'Branch.deliveryAddress.address.streetAddress',
                values: [`%${v.searchInput}%`]
              },
              {
                operator: 'LIKE',
                path: 'Branch.deliveryAddress.contactName',
                values: [`%${v.searchInput}%`]
              }
            ]
            : [],
        params: {
          orOperator: true
        }
      },
      branches: {
        url: `/prodex/api/branches/datagrid`,
        searchToFilter: v =>
          v && v.searchInput
            ? [
              {
                operator: 'LIKE',
                path: 'Branch.deliveryAddress.addressName',
                values: [`%${v.searchInput}%`]
              },
              {
                operator: 'LIKE',
                path: 'Branch.deliveryAddress.address.streetAddress',
                values: [`%${v.searchInput}%`]
              },
              {
                operator: 'LIKE',
                path: 'Branch.deliveryAddress.contactName',
                values: [`%${v.searchInput}%`]
              }
            ]
            : [],
        params: {
          orOperator: true
        }
      }
    }
    return datagridApiMap[activeTab]
  }

  render() {
    const { activeTab, tutorialCompleted } = this.props

    /*
    {isCompanyAdmin || isClientCompanyAdmin ? ('Branches', 'Warehouses')
    {(isCompanyAdmin && !isClientCompany) || isClientCompanyAdmin ? ('Delivery Addresses')
     */

    return (
      <DatagridProvider apiConfig={this.getApiConfig()} preserveFilters skipInitLoad>
        <Container fluid className='flex stretched'>
          <TopMenu />
          {!tutorialCompleted && <div style={{margin: '5px -2px -15px -2px'}}><Tutorial/></div>}
          <Container fluid style={{padding: '20px 30px'}}>
            <TablesHandlers />
          </Container>
          <SettingsGrid columns='equal' className='flex stretched' style={{padding: '0 30px'}}>
            <Grid.Row>
              <CustomGridColumn className='flex stretched'>{this.renderContent()}</CustomGridColumn>
            </Grid.Row>
          </SettingsGrid>
        </Container>
      </DatagridProvider>
    )
  }
}

const mapStateToProps = ({ settings, auth }) => {
  return {
    ...settings,
    activeTab: settings.locationsTab,
    isCompanyAdmin: auth.identity ? auth.identity.isCompanyAdmin : false,
    isUserAdmin: getSafe(() => auth.identity.isUserAdmin, false),
    tutorialCompleted: getSafe(() => auth.identity.tutorialCompleted, false),
    isClientCompanyAdmin: getSafe(() => auth.identity.isClientCompanyAdmin, false)
  }
}

export default connect(mapStateToProps, {
  tabChanged,
  getIdentity
})(withToastManager(Locations))