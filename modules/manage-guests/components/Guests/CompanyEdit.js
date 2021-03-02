import { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'formik-semantic-ui-fixed-validation'
import { Container, Grid, GridColumn, Segment } from 'semantic-ui-react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import { withToastManager } from 'react-toast-notifications'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import { getIdentity } from '~/modules/auth/actions'
import { DatagridProvider } from '~/modules/datagrid'
import { withRouter } from 'next/router'

import TablesHandlers from './TablesHandlers'

import { StyledContainer } from '../../constants'

import GuestCompanyInfo from './GuestCompanyInfo/GuestCompanyInfo'
import UsersTable from './Users/UsersTable'
import UsersAddEdit from './Users/UsersAddEdit'
//import AddEditGuestCompanySidebar from './Guests/AddEditGuestCompanySidebar'
import DocumentManagerTable from './DocumentManager/DocumentManagerTable'
import DocumentManagerSidebar from './DocumentManager/DocumentManagerSidebar'

import {} from '../../actions'
import { closePopup } from '../../actions'

const TopMargedGrid = styled(Grid)`
  margin-top: 1rem !important;
`

const FixyWrapper = styled.div`
  position: relative;
  transform: translateY(0);
`

const ScrollableSegment = styled(Segment)`
  max-height: 95vh;
  overflow-y: auto;
`

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

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isOpenPopup, closePopup, guestsTab } = this.props
    if (guestsTab !== prevProps.guestsTab && isOpenPopup) closePopup()
  }

  renderContent = () => {
    const { guestsTab, isOpenPopup } = this.props

    const tables = {
      'company-info': <GuestCompanyInfo />,
      users: <UsersTable />,
      'document-manager': <DocumentManagerTable />
    }

    const popupForm = {
      //guests: <AddEditGuestCompanySidebar />,
      users: <UsersAddEdit />,
      'document-manager': <DocumentManagerSidebar />
    }

    return (
      <>
        {isOpenPopup && popupForm[guestsTab]}
        {tables[guestsTab] || <p>This page is still under construction</p>}
      </>
    )
  }

  renderPage = () => {
    const { guestsTab } = this.props
    return (
      <StyledContainer fluid className='flex stretched scrolling'>
        <Container fluid>
          <TablesHandlers guestsTab={guestsTab} />
        </Container>
        <SettingsGrid columns='equal' style={{ padding: '0 30px' }} className='flex stretched'>
          <Grid.Row>
            <CustomGridColumn className='flex stretched'>{this.renderContent()}</CustomGridColumn>
          </Grid.Row>
        </SettingsGrid>
      </StyledContainer>
    )
  }

  getApiConfig = () => {
    const { guestsTab, companyEditValues } = this.props
    const datagridApiMap = {
      users: {
        url: `/prodex/api/users/datagrid?clientCompanyId=${companyEditValues.id}`,
        searchToFilter: v => {
          let filter = { or: [], and: [] }

          if (v && v.searchInput)
            filter.or = [
              { operator: 'LIKE', path: 'User.name', values: [`%${v.searchInput}%`] },
              {
                operator: 'LIKE',
                path: 'User.homeBranch.deliveryAddress.contactName',
                values: [`%${v.searchInput}%`]
              }
            ]
          return filter
        }
      },
      'document-manager': {
        url: `/prodex/api/attachments/datagrid?clientCompanyId=${companyEditValues.id}`,
        searchToFilter: v => {
          let filter = { or: [], and: [] }

          if (v && v.searchInput)
            filter.or = [
              {
                operator: 'LIKE',
                path: 'Attachment.name',
                values: [`%${v.searchInput}%`]
              },
              {
                operator: 'LIKE',
                path: 'Attachment.customName',
                values: [`%${v.searchInput}%`]
              }
            ]
          if (v && v.documentType)
            filter.and = [
              {
                operator: 'EQUALS',
                path: 'Attachment.documentType.id',
                values: [`${v.documentType}`]
              }
            ]
          if (v && v.documentManagerDocumentFilter) {
            filter.url = '/prodex/api/attachments/datagrid-foreign'
          } else {
            filter.url = `/prodex/api/attachments/datagrid?clientCompanyId=${companyEditValues.id}`
          }
          return filter
        }
      }
    }
    return datagridApiMap[guestsTab]
  }

  render() {
    const { guestsTab } = this.props

    if (guestsTab === 'company-info') {
      return this.renderPage()
    } else {
      return (
        <DatagridProvider apiConfig={this.getApiConfig()} preserveFilters={true} skipInitLoad>
          {this.renderPage()}
        </DatagridProvider>
      )
    }
  }
}

const mapStateToProps = ({ manageGuests }, { router }) => {
  return {
    ...manageGuests
  }
}

export default withRouter(connect(mapStateToProps, { closePopup })(withToastManager(ManageGuests)))
