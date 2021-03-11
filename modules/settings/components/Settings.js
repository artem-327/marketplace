import { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'formik-semantic-ui-fixed-validation'
import { Container, Grid, GridColumn, Segment } from 'semantic-ui-react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import Tabs from './Tabs'
import UsersTable from './UserTable/UsersTable'
import Locations from './Locations/Locations'

import BankAccountsTable from './BankAccountsTable/BankAccountsTable'
import CreditCardsTable from './CreditCardsTable/CreditCardsTable'
import UserEditSidebar from './UserTable/UserEditSidebar/UserEditSidebar'
import UserSettingsModal from './UserTable/UserSettingsModal/UserSettingsModal'
import CreditCardsPopup from './CreditCardsTable/CreditCardsPopup'
import BankAccountsSidebar from './BankAccountsTable/BankAccountsSidebar'
import SendLinkPopup from './BankAccountsTable/SendLinkPopup'
import BankAccountsUploadDocPopup from './BankAccountsTable/BankAccountsUploadDocPopup'
import TablesHandlers from './TablesHandlers'

import LogisticsTable from './LogisticsTable/LogisticsTable'
import LogisticsSidebar from './LogisticsTable/LogisticsSidebar/LogisticsSidebar'

import SystemSettings from '~/components/settings'

import DocumentsTable from './Documents/DocumentManagerTable'
import TradeCriteria from './TradeCriteria/TradeCriteria'
import DocumentManagerSidebar from './Documents/DocumentManagerSidebar'

import ClientCompanyTable from './ClientCompany/Table'
import ClientCompanyPopup from './ClientCompany/Popup'

import DwollaAccount from './DwollaAccountComponent'
import { CompanyForm } from '~/modules/company-form/'
import { companyDetailsTab } from '../contants'
import CompanyDetailsPage from './CompanyDetailsPage/CompanyDetailsPage'

import Router from 'next/router'

import {
  addTab,
  tabChanged,
  resetSettings,
  renderCopyright,
  closePopup,
  closeSidebar,
  inviteToAddBankAccounts
} from '../actions'

import { updateCompany } from '~/modules/auth/actions'
import { postCompanyLogo, deleteCompanyLogo } from '~/modules/company-form/actions'
import { validationSchema } from '~/modules/company-form/constants'

import { DatagridProvider } from '~/modules/datagrid'

import { withToastManager } from 'react-toast-notifications'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import Tutorial from '~/modules/tutorial/Tutorial'
import { getIdentity } from '~/modules/auth/actions'
import ErrorFocus from '~/components/error-focus'

const TopMargedGrid = styled(Grid)`
  margin-top: 1rem !important;
`

const FixyWrapper = styled.div`
  position: relative;
  transform: translateY(0);
`

const SettingsSegment = styled(Segment)`
  height: auto !important;
  margin-bottom: 42px !important;
  padding-bottom: 0 !important;
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

class Settings extends Component {
  state = {
    wrongUrl: true
  }

  // marked tab based on role of user or if tab changed.
  changeRoute = queryTab => {
    const {
      isCompanyAdmin,
      tabsNames,
      tabChanged,
      currentTab,
      isUserAdmin,
      isProductCatalogAdmin,
      isClientCompanyAdmin
    } = this.props
    // array of tabsNames converted to Map
    let tabsNamesMap = new Map()
    for (let i in tabsNames) {
      tabsNamesMap.set(tabsNames[i].type, tabsNames[i])
    }

    if (!(isCompanyAdmin || isClientCompanyAdmin)) {
      if (isUserAdmin) {
        if (
          isProductCatalogAdmin &&
          (getSafe(() => queryTab.type, '') === 'products' || getSafe(() => queryTab.type, '') === 'system-settings')
        ) {
          Router.push('/settings/products')
        } else {
          Router.push('/settings/users')
        }
      } else if (isProductCatalogAdmin) {
        Router.push('/settings/products')
      } else if (queryTab.type !== currentTab) {
        Router.push(`/settings/${currentTab}`)
      }
    }
  }

  messageRedirect = tab => {
    const { toastManager } = this.props
    toastManager.add(
      generateToastMarkup(
        <FormattedMessage id='settings.wrongUrl' defaultMessage='Wrong URL' />,
        <FormattedMessage
          id={`settings.rerenderTo${tab}`}
          defaultMessage={`You are not authorized to view this page. You will be automatically redirected to ${tab}.`}
        />
      ),
      { appearance: 'warning' }
    )
  }

  redirectPage = async queryTab => {
    const { isCompanyAdmin, isUserAdmin, isProductCatalogAdmin, isClientCompanyAdmin } = this.props
    const tab = getSafe(() => queryTab.type, '')
    if (!isCompanyAdmin && !isClientCompanyAdmin && tab !== 'system-settings') {
      if ((isUserAdmin && tab === 'users') || (isProductCatalogAdmin && tab === 'products')) {
        this.setState({ wrongUrl: false })
      } else if (!isProductCatalogAdmin && !isUserAdmin) {
        this.messageRedirect('Inventory')
        Router.push('/')
        return
      } else {
        if (isProductCatalogAdmin && tab !== 'products') {
          if (isUserAdmin && tab !== 'users') {
            this.messageRedirect('Users')
            this.setState({ wrongUrl: false })
          } else {
            this.messageRedirect('Products')
            this.setState({ wrongUrl: false })
          }
        }
      }
    } else {
      this.setState({ wrongUrl: false })
    }
  }

  async componentDidMount() {
    const {
      isCompanyAdmin,
      addTab,
      tabsNames,
      getIdentity,
      isClientCompanyAdmin,
      renderCopyright,
      currentTab
    } = this.props

    try {
      await getIdentity()
    } catch (error) {
      console.error(error)
    }

    if (isCompanyAdmin || isClientCompanyAdmin) addTab(companyDetailsTab)

    let queryTab =
      tabsNames.find(tab => tab.type === currentTab) ||
      (isCompanyAdmin || isClientCompanyAdmin
        ? companyDetailsTab
        : tabsNames.find(tab => tab.type !== companyDetailsTab.type))

    this.changeRoute(queryTab)
    this.redirectPage(queryTab)
    renderCopyright()
  }

  componentWillUnmount() {
    const { isOpenPopup, isOpenSidebar, closePopup, closeSidebar } = this.props
    if (isOpenPopup) closePopup()
    if (isOpenSidebar) closeSidebar()
  }

  renderContent = () => {
    const {
      action,
      actionId,
      currentTab,
      isOpenPopup,
      closePopup,
      isOpenUploadDocumentsPopup,
      isDwollaOpenPopup,
      isUserAdmin,
      isCompanyAdmin,
      isOpenSidebar,
      editedId,
      inviteToAddBankAccounts,
      companyId,
      companyName,
      isLoadingModal
    } = this.props

    const tables = {
      'company-details': <CompanyDetailsPage />,
      users: <UsersTable />,
      'bank-accounts': <BankAccountsTable />,
      'credit-cards': <CreditCardsTable />,
      'guest-companies': <ClientCompanyTable />,
      logistics: <LogisticsTable />,
      'system-settings': (
        <FixyWrapper>
          <SettingsSegment basic padded='very'>
            <SystemSettings asModal={false} inputsInGroup={3} role='company' />
          </SettingsSegment>
        </FixyWrapper>
      ),
      documents: <DocumentsTable />
    }

    const popupForm = {
      users: (
        <UserSettingsModal
          isOpenPopup={isOpenPopup}
          closePopup={closePopup}
          editedId={editedId}
          isUserAdmin={isUserAdmin}
          isCompanyAdmin={isCompanyAdmin}
        />
      ),
      'credit-cards': <CreditCardsPopup />,
      'guest-companies': <ClientCompanyPopup />,
      'bank-accounts': (
        <SendLinkPopup
          isOpenPopup={isOpenPopup}
          closePopup={closePopup}
          inviteToAddBankAccounts={inviteToAddBankAccounts}
          companyId={companyId}
          companyName={companyName}
        />
      )
    }

    const sidebarForm = {
      users: <UserEditSidebar />,
      'bank-accounts': <BankAccountsSidebar />,
      logistics: <LogisticsSidebar />,
      documents: <DocumentManagerSidebar />
    }

    const addDwollaForms = {
      'bank-accounts': <DwollaAccount />
    }

    const uploadDocForms = {
      'bank-accounts': <BankAccountsUploadDocPopup />
    }

    return (
      <>
        {isOpenPopup && popupForm[currentTab]}
        {isOpenSidebar && sidebarForm[currentTab]}
        {isOpenUploadDocumentsPopup && uploadDocForms[currentTab]}
        {/* {isDwollaOpenPopup && addDwollaForms[currentTab] && Router.push('/dwolla-register')} */}
        {tables[currentTab] || <p>This page is still under construction</p>}
      </>
    )
  }

  getApiConfig = () => {
    const { currentTab } = this.props
    const datagridApiMap = {
      // 'company-details': this.companyDetails(),
      users: {
        url: `/prodex/api/users/datagrid`,
        searchToFilter: v =>
          v && v.searchInput
            ? [
                { operator: 'LIKE', path: 'User.name', values: [`%${v.searchInput}%`] },
                {
                  operator: 'LIKE',
                  path: 'User.homeBranch.deliveryAddress.contactName',
                  values: [`%${v.searchInput}%`]
                }
                // { operator: 'LIKE', path: '', values: [`%${v}%`] }, // TODO here should be User.jobTitle but BE doesn't seem to have it as filterable field...
              ]
            : []
      },
      'guest-companies': {
        url: '/prodex/api/companies/client/datagrid',
        searchToFilter: v =>
          v && v.searchInput ? [{ operator: 'LIKE', path: 'ClientCompany.name', values: [`%${v.searchInput}%`] }] : []
      },
      // 'bank-accounts': null,
      // 'credit-cards': null,
      documents: {
        url: '/prodex/api/attachments/datagrid/',
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
                operator: 'LIKE',
                path: 'Attachment.documentType.name',
                values: [`%${v.documentType}%`]
              }
            ]
          return filter
        }
      }
    }

    return datagridApiMap[currentTab]
  }

  render() {
    const { currentTab, tutorialCompleted } = this.props

    if (currentTab === 'locations') {
      return <Locations />
    } else if (currentTab === 'trade-criteria') {
      return <TradeCriteria />
    } else {
      return (
        !this.state.wrongUrl && (
          <DatagridProvider apiConfig={this.getApiConfig()} preserveFilters skipInitLoad>
            <Container fluid className='flex stretched'>
              {
                <div style={{ margin: '5px -2px -15px -2px' }}>
                  <Tutorial isTutorial={false} isBusinessVerification={true} />
                </div>
              }
              <Container fluid style={{ padding: '20px 30px' }}>
                <TablesHandlers currentTab={currentTab} />
              </Container>
              <SettingsGrid columns='equal' className='flex stretched' style={{ padding: '0 30px' }}>
                <Grid.Row>
                  <CustomGridColumn className='flex stretched'>{this.renderContent()}</CustomGridColumn>
                </Grid.Row>
              </SettingsGrid>
            </Container>
          </DatagridProvider>
        )
      )
    }
  }
}

const mapStateToProps = ({ settings, auth }) => {
  return {
    ...settings,
    isCompanyAdmin: auth.identity ? auth.identity.isCompanyAdmin : false,
    company: auth.identity ? auth.identity.company : null,
    isProductCatalogAdmin: getSafe(() => auth.identity.isProductCatalogAdmin, false),
    isUserAdmin: getSafe(() => auth.identity.isUserAdmin, false),
    tutorialCompleted: getSafe(() => auth.identity.tutorialCompleted, false),
    documentsOwner: getSafe(() => settings.documentsOwner, []),
    isClientCompanyAdmin: getSafe(() => auth.identity.isClientCompanyAdmin, false),
    companyId: getSafe(() => auth.identity.company.id, false),
    companyName: getSafe(() => auth.identity.company.name, false),
    hasLogo: getSafe(() => auth.identity.company.hasLogo, false)
  }
}

export default connect(mapStateToProps, {
  addTab,
  updateCompany,
  tabChanged,
  resetSettings,
  postCompanyLogo,
  deleteCompanyLogo,
  getIdentity,
  renderCopyright,
  closePopup,
  closeSidebar,
  inviteToAddBankAccounts
})(withToastManager(Settings))
