import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid } from 'semantic-ui-react'
import styled from 'styled-components'

import { withToastManager } from 'react-toast-notifications'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import { getIdentity } from '~/modules/auth/actions'
import { DatagridProvider } from '~/modules/datagrid'
import { withRouter } from 'next/router'

import TablesHandlers from './TablesHandlers'

import GuestCompaniesTable from './Guests/GuestCompaniesTable'
import AddEditGuestCompanySidebar from './Guests/AddEditGuestCompanySidebar'

import CompanyEdit from './Guests/CompanyEdit'
import { closePopup } from '../actions'

import { StyledContainer } from '../constants'
import Tutorial from '~/modules/tutorial/Tutorial'

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

class ManageGuests extends Component {
  state = {
    companyLogo: null,
    wrongUrl: true
  }

  componentWillUnmount() {
    const { isOpenPopup, closePopup } = this.props
    if (isOpenPopup) closePopup()
  }

  renderContent = () => {
    const { currentTab, isOpenPopup } = this.props

    const tables = {
      guests: <GuestCompaniesTable />
    }

    const popupForm = {
      guests: <AddEditGuestCompanySidebar />
    }

    return (
      <>
        {isOpenPopup && popupForm[currentTab]}
        {tables[currentTab] || <p>This page is still under construction</p>}
      </>
    )
  }

  getApiConfig = () => {
    const { currentTab } = this.props
    const datagridApiMap = {
      guests: {
        url: '/prodex/api/companies/client/datagrid',
        searchToFilter: v => {
          let filter = { or: [], and: [] }

          if (v && v.searchInput)
            filter.or = [
              {
                operator: 'LIKE',
                path: 'ClientCompany.name',
                values: [`%${v.searchInput}%`]
              }
            ]
          return filter
        }
      }
    }
    return datagridApiMap[currentTab]
  }

  render() {
    const { currentTab, isOpenCompanyEdit, tutorialCompleted } = this.props

    if (currentTab === 'chat') {
      return <>Chat</>
    } else if (isOpenCompanyEdit) {
      return <CompanyEdit />
    } else {
      return (
        <>
          {!tutorialCompleted && <Tutorial />}
          <DatagridProvider apiConfig={this.getApiConfig()} preserveFilters skipInitLoad>
            <StyledContainer fluid className='flex stretched scrolling'>
              <Container fluid style={{ padding: '20px 30px' }}>
                <TablesHandlers currentTab={currentTab} />
              </Container>
              <SettingsGrid columns='equal' style={{ padding: '0 30px' }} className='flex stretched'>
                <Grid.Row>
                  <CustomGridColumn className='flex stretched'>{this.renderContent()}</CustomGridColumn>
                </Grid.Row>
              </SettingsGrid>
            </StyledContainer>
          </DatagridProvider>
        </>
      )
    }
  }
}

const mapStateToProps = ({ manageGuests, auth }, { router }) => {
  return {
    ...manageGuests,
    tutorialCompleted: getSafe(() => auth.identity.tutorialCompleted, false)
  }
}

export default withRouter(connect(mapStateToProps, { closePopup })(withToastManager(ManageGuests)))
