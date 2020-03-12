import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'formik-semantic-ui-fixed-validation'
import { Container, Grid, GridColumn, Segment } from 'semantic-ui-react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import Tabs from './Tabs'
import UsersTable from './UserTable/UsersTable'
import WarehouseTable from './WarehouseTable/WarehouseTable'
import BankAccountsTable from './BankAccountsTable/BankAccountsTable'
import CreditCardsTable from './CreditCardsTable/CreditCardsTable'
import ProductCatalogTable from './ProductCatalogTable/ProductCatalogTable'
import EditWarehouseSidebar from './WarehouseTable/WarehouseSidebar'
import EditUsersPopup from './UserTable/UsersPopup'
import EditProductPopup from './ProductCatalogTable/ProductPopup'
import CreditCardsPopup from './CreditCardsTable/CreditCardsPopup'
import BankAccountsPopup from './BankAccountsTable/BankAccountsPopup'
import BankAccountsUploadDocPopup from './BankAccountsTable/BankAccountsUploadDocPopup'
import TablesHandlers from './TablesHandlers'
import ProductImportPopup from './ProductCatalogTable/ProductImportPopup'

import DeliveryAddressesTable from './DeliveryAddressesTable/DeliveryAddressesTable'
import DeliveryAddressesPopup from './DeliveryAddressesTable/DeliveryAddressesPopup'

import LogisticsTable from './LogisticsTable/LogisticsTable'
import LogisticsPopup from './LogisticsTable/LogisticsPopup'

import SystemSettings from '~/components/settings'

import DocumentsTable from './Documents/DocumentManagerTable'
import DocumentsPopup from './Documents/DocumentManagerPopup'

import DwollaAccount from './DwollaAccountComponent'
import { CompanyForm } from '~/modules/company-form/'
import { companyDetailsTab } from '../contants'
import PriceBook from './PriceBook'

import Router from 'next/router'

import { addTab, tabChanged, resetSettings, loadLogo } from '../actions'

import { updateCompany } from '~/modules/auth/actions'
import { postCompanyLogo, deleteCompanyLogo } from '~/modules/company-form/actions'
import { validationSchema } from '~/modules/company-form/constants'

import { DatagridProvider } from '~/modules/datagrid'

import { withToastManager } from 'react-toast-notifications'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import Tutorial from '~/modules/tutorial/Tutorial'

const TopMargedGrid = styled(Grid)`
  margin-top: 1rem !important;
`

const FixyWrapper = styled.div`
  position: relative;
  transform: translateY(0);
`

const ScrollableSegment = styled(Segment)`
  max-height: 90vh;
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

class Settings extends Component {
  state = {
    companyLogo: null,
    wrongUrl: true
  }

  componentWillMount() {
    this.props.resetSettings()
  }
  // marked tab based on role of user or if tab changed.
  changeRoute = queryTab => {
    const { isCompanyAdmin, tabsNames, tabChanged, currentTab, isUserAdmin, isProductCatalogAdmin } = this.props
    // array of tabsNames converted to Map
    let tabsNamesMap = new Map()
    for (let i in tabsNames) {
      tabsNamesMap.set(tabsNames[i].type, tabsNames[i])
    }

    if (isCompanyAdmin) {
      tabChanged(queryTab)
    } else {
      if (isUserAdmin) {
        if (
          isProductCatalogAdmin &&
          (getSafe(() => queryTab.type, '') === 'products' || getSafe(() => queryTab.type, '') === 'system-settings')
        ) {
          Router.push('/settings?type=products')
          tabChanged(tabsNamesMap.get('products'))
        } else {
          Router.push('/settings?type=users')
          tabChanged(tabsNamesMap.get('users'))
        }
      } else if (isProductCatalogAdmin) {
        Router.push('/settings?type=products')
        tabChanged(tabsNamesMap.get('products'))
      } else if (queryTab.type !== currentTab.type) {
        Router.push(`/settings?type=${currentTab.type}`)
        tabChanged(queryTab)
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

  redirectPage = queryTab => {
    const { isCompanyAdmin, isUserAdmin, isProductCatalogAdmin } = this.props
    const tab = getSafe(() => queryTab.type, '')

    if (!isCompanyAdmin && tab !== 'system-settings') {
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

  componentDidMount() {
    const { isCompanyAdmin, addTab, tabsNames } = this.props

    if (isCompanyAdmin) addTab(companyDetailsTab)
    let queryTab =
      (Router && Router.router ? tabsNames.find(tab => tab.type === Router.router.query.type) : false) ||
      (isCompanyAdmin ? companyDetailsTab : tabsNames.find(tab => tab.type !== companyDetailsTab.type))

    this.changeRoute(queryTab)
    this.redirectPage(queryTab)
  }

  selectLogo = logo => {
    this.setState({ companyLogo: logo })
  }

  removeLogo = () => {
    this.setState({ companyLogo: null })
  }

  companyDetails = () => {
    let { postCompanyLogo, deleteCompanyLogo } = this.props
    const { selectLogo, removeLogo } = this
    const { companyLogo } = this.state
    return (
      <TopMargedGrid relaxed='very' centered>
        <GridColumn computer={12}>
          <Form
            initialValues={this.props.company}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const { updateCompany } = this.props

                await updateCompany(values.id, {
                  ...values,
                  businessType: values.businessType ? values.businessType.id : null
                })
                if (companyLogo) {
                  await postCompanyLogo(values.id, companyLogo)
                } else {
                  if (values.hasLogo) await deleteCompanyLogo(values.id)
                }
              } catch (err) {
                console.error(err)
              } finally {
                setSubmitting(false)
              }
            }}>
            {({ values, errors, setFieldValue, setFieldTouched, touched, isSubmitting }) => {
              return (
                <Segment basic>
                  <CompanyForm
                    selectLogo={selectLogo}
                    removeLogo={removeLogo}
                    companyLogo={this.state.companyLogo}
                    values={values}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    errors={errors}
                    touched={touched}
                    isSubmitting={isSubmitting}
                  />
                  <Grid>
                    <GridColumn floated='right' computer={4}>
                      <Button.Submit fluid data-test='company_details_submit_btn'>
                        <FormattedMessage id='global.save'>{text => text}</FormattedMessage>
                      </Button.Submit>
                    </GridColumn>
                  </Grid>
                </Segment>
              )
            }}
          </Form>
        </GridColumn>
      </TopMargedGrid>
    )
  }

  renderContent = () => {
    const {
      action,
      actionId,
      currentTab,
      isOpenPopup,
      isOpenImportPopup,
      isOpenUploadDocumentsPopup,
      isDwollaOpenPopup,
      isUserAdmin,
      isProductCatalogAdmin,
      isOpenSidebar
    } = this.props

    const tables = {
      'company-details': this.companyDetails(),
      users: <UsersTable />,
      branches: <WarehouseTable />,
      warehouses: <WarehouseTable />,
      products: <ProductCatalogTable />,
      'global-broadcast': <PriceBook />,
      'bank-accounts': <BankAccountsTable />,
      'credit-cards': <CreditCardsTable />,
      'delivery-addresses': <DeliveryAddressesTable />,
      logistics: <LogisticsTable />,
      'system-settings': (
        <FixyWrapper>
          <ScrollableSegment basic padded='very'>
            <SystemSettings asModal={false} inputsInGroup={3} role='company' />
          </ScrollableSegment>
        </FixyWrapper>
      ),
      documents: <DocumentsTable />
    }

    const popupForm = {
      users: <EditUsersPopup />,
      branches: <EditWarehouseSidebar />,
      warehouses: <EditWarehouseSidebar />,
      products: <EditProductPopup />,
      'global-broadcast': <PriceBook />,
      'bank-accounts': <BankAccountsPopup />,
      'credit-cards': <CreditCardsPopup />,
      'delivery-addresses': <DeliveryAddressesPopup />,
      logistics: <LogisticsPopup />,
      documents: <DocumentsPopup />
    }

    const importForm = {
      products: <ProductImportPopup />
    }

    const addDwollaForms = {
      'bank-accounts': <DwollaAccount />
    }

    const uploadDocForms = {
      'bank-accounts': <BankAccountsUploadDocPopup />
    }

    return (
      <>
        {(isOpenPopup || isOpenSidebar) && popupForm[currentTab.type]}
        {isOpenImportPopup && importForm[currentTab.type]}
        {isOpenUploadDocumentsPopup && uploadDocForms[currentTab.type]}
        {/* {isDwollaOpenPopup && addDwollaForms[currentTab.type] && Router.push('/dwolla-register')} */}
        {tables[currentTab.type] || <p>This page is still under construction</p>}
      </>
    )
  }

  getApiConfig = () => {
    const { currentTab, isProductCatalogAdmin, isUserAdmin } = this.props
    const datagridApiMap = {
      // 'company-details': this.companyDetails(),
      users: {
        url: `/prodex/api/users/datagrid`,
        searchToFilter: v =>
          v
            ? [
                { operator: 'LIKE', path: 'User.name', values: [`%${v}%`] },
                {
                  operator: 'LIKE',
                  path: 'User.homeBranch.deliveryAddress.contactName',
                  values: [`%${v}%`]
                }
                // { operator: 'LIKE', path: '', values: [`%${v}%`] }, // TODO here should be User.jobTitle but BE doesn't seem to have it as filterable field...
              ]
            : [],
        params: {
          orOperator: true
        }
      },
      branches: {
        url: `/prodex/api/branches/datagrid`,
        searchToFilter: v =>
          v
            ? [
                {
                  operator: 'LIKE',
                  path: 'Branch.deliveryAddress.addressName',
                  values: [`%${v}%`]
                },
                {
                  operator: 'LIKE',
                  path: 'Branch.deliveryAddress.address.streetAddress',
                  values: [`%${v}%`]
                },
                {
                  operator: 'LIKE',
                  path: 'Branch.deliveryAddress.contactName',
                  values: [`%${v}%`]
                }
              ]
            : [],
        params: {
          orOperator: true
        }
      },
      warehouses: {
        url: `/prodex/api/branches/warehouses/datagrid`,
        searchToFilter: v =>
          v
            ? [
                {
                  operator: 'LIKE',
                  path: 'Branch.deliveryAddress.addressName',
                  values: [`%${v}%`]
                },
                {
                  operator: 'LIKE',
                  path: 'Branch.deliveryAddress.address.streetAddress',
                  values: [`%${v}%`]
                },
                {
                  operator: 'LIKE',
                  path: 'Branch.deliveryAddress.contactName',
                  values: [`%${v}%`]
                }
              ]
            : [],
        params: {
          orOperator: true
        }
      },
      products: {
        url: `/prodex/api/company-products/datagrid`,
        searchToFilter: v =>
          v
            ? [
                {
                  operator: 'LIKE',
                  path: 'CompanyProduct.intProductName',
                  values: [`%${v}%`]
                },
                {
                  operator: 'LIKE',
                  path: 'CompanyProduct.intProductCode',
                  values: [`%${v}%`]
                },
                {
                  operator: 'LIKE',
                  path: 'CompanyProduct.echoProduct.name',
                  values: [`%${v}%`]
                },
                {
                  operator: 'LIKE',
                  path: 'CompanyProduct.echoProduct.code',
                  values: [`%${v}%`]
                }
              ]
            : [],
        params: {
          orOperator: true
        }
      },
      // 'bank-accounts': null,
      // 'credit-cards': null,
      'delivery-addresses': {
        url: '/prodex/api/delivery-addresses/datagrid',
        searchToFilter: v =>
          v
            ? [
                {
                  operator: 'LIKE',
                  path: 'DeliveryAddress.address.streetAddress',
                  values: [`%${v}%`]
                }
              ]
            : []
      },

      documents: {
        url: '/prodex/api/attachments/datagrid/',
        searchToFilter: v =>
          v
            ? [
                {
                  operator: 'LIKE',
                  path: 'Attachment.name',
                  values: [`%${v}%`]
                },
                {
                  operator: 'LIKE',
                  path: 'Attachment.customName',
                  values: [`%${v}%`]
                },
                {
                  operator: 'LIKE',
                  path: 'Attachment.documentType.name',
                  values: [`%${v}%`]
                }
              ]
            : [],
        params: {
          orOperator: true
        }
      }
    }

    return datagridApiMap[currentTab.type]
  }

  render() {
    const { currentTab, tutorialCompleted } = this.props

    return (
      !this.state.wrongUrl && (
        <DatagridProvider apiConfig={this.getApiConfig()}>
          <Container fluid className='flex stretched'>
            {!tutorialCompleted && <Tutorial />}
            <Container fluid style={{ padding: '0 1.5vh' }}>
              <TablesHandlers currentTab={currentTab} />
            </Container>
            <SettingsGrid columns='equal' className='flex stretched' style={{ padding: '0 32px' }}>
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

const mapStateToProps = ({ settings, auth }) => {
  return {
    ...settings,
    isCompanyAdmin: auth.identity ? auth.identity.isCompanyAdmin : false,
    company: auth.identity ? auth.identity.company : null,
    currentTab: settings.currentTab,
    isProductCatalogAdmin: getSafe(() => auth.identity.isProductCatalogAdmin, false),
    isUserAdmin: getSafe(() => auth.identity.isUserAdmin, false),
    tutorialCompleted: getSafe(() => auth.identity.tutorialCompleted, false)
  }
}

export default connect(mapStateToProps, {
  addTab,
  updateCompany,
  tabChanged,
  resetSettings,
  loadLogo,
  postCompanyLogo,
  deleteCompanyLogo
})(withToastManager(Settings))
