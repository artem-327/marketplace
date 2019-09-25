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
import EditWarehousePopup from './WarehouseTable/WarehousePopup'
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

import { addTab, tabChanged, resetSettings, loadLogo, openPopup } from '../actions'


import { updateCompany } from '~/modules/auth/actions'
import { postCompanyLogo, deleteCompanyLogo } from '~/modules/company-form/actions'
import { validationSchema } from '~/modules/company-form/constants'

import { DatagridProvider } from '~/modules/datagrid'

import { withToastManager } from 'react-toast-notifications'

const TopMargedGrid = styled(Grid)`
  margin-top: 1rem !important;
`

class Settings extends Component {

  state = {
    companyLogo: null
  }

  componentWillMount() {
    this.props.resetSettings()
  }

  componentDidMount() {
    let { isCompanyAdmin, addTab, tabsNames, tabChanged, currentTab } = this.props
    if (isCompanyAdmin) addTab(companyDetailsTab)
    let queryTab = (Router && Router.router ? tabsNames.find(tab => tab.type === Router.router.query.type) : false) || (isCompanyAdmin ? companyDetailsTab : tabsNames.find(tab => tab.type !== companyDetailsTab.type))

    if (!queryTab.type !== currentTab.type) tabChanged(queryTab)
  }

  companyUpdated = (name) => {
    let { toastManager } = this.props

    toastManager.add(
      <div>
        <strong><FormattedMessage id='notifications.companyUpdated' defaultMessage='Company updated' values={{ name }} /></strong>
      </div>, { appearance: 'success', pauseOnHover: true })
  }

  selectLogo = (logo) => {
    this.setState({ companyLogo: logo })
  }

  removeLogo = () => {
    this.setState({ companyLogo: null })
  }

  companyDetails = () => {
    let { toastManager, postCompanyLogo, deleteCompanyLogo } = this.props
    const { selectLogo, removeLogo, companyUpdated } = this
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

                await updateCompany(values.id, { ...values, businessType: values.businessType.id })
                if (companyLogo) {
                  await postCompanyLogo(values.id, companyLogo)
                } else {
                  if (values.hasLogo)
                    await deleteCompanyLogo(values.id)
                }
                companyUpdated(values.name)
              } catch (err) {
                console.error(err)
              }
              finally {
                setSubmitting(false)
              }
            }}
          >
            {({ values, errors, setFieldValue }) => {
              return (
                <Segment basic>
                  <CompanyForm selectLogo={selectLogo} removeLogo={removeLogo} companyLogo={this.state.companyLogo} values={values} setFieldValue={setFieldValue} />
                  <Grid>
                    <GridColumn floated='right' computer={4}>
                      <Button.Submit fluid data-test='company_details_submit_btn'><FormattedMessage id='global.save'>{(text) => text}</FormattedMessage></Button.Submit>
                    </GridColumn>
                  </Grid>
                </Segment>
              )
            }}
          </Form>
        </GridColumn>
      </TopMargedGrid >
    )
  }

  renderContent = () => {
    const { action, actionId, currentTab,
      isOpenPopup, isOpenPopup2, isOpenImportPopup, isOpenUploadDocumentsPopup,
      isDwollaOpenPopup } = this.props



    const tables = {
      'company-details': this.companyDetails(),
      'users': <UsersTable />,
      'branches': <WarehouseTable />,
      'warehouses': <WarehouseTable />,
      'products': <ProductCatalogTable />,
      'global-broadcast': <PriceBook />,
      'bank-accounts': <BankAccountsTable />,
      'credit-cards': <CreditCardsTable />,
      'delivery-addresses': <DeliveryAddressesTable />,
      'logistics': <LogisticsTable />,
      'system-settings': (
        <Segment basic padded='very'>
          <SystemSettings asModal={false} inputsInGroup={3} role='company' />
        </Segment>
      ),
      'documents': <DocumentsTable />
    }

    const popupForm = {
      'users': <EditUsersPopup />,
      'branches': <EditWarehousePopup />,
      'warehouses': <EditWarehousePopup />,
      'products': <EditProductPopup />,
      'global-broadcast': <PriceBook />,
      'bank-accounts': <BankAccountsPopup />,
      'credit-cards': <CreditCardsPopup />,
      'delivery-addresses': <DeliveryAddressesPopup />,
      'logistics': <LogisticsPopup />,
      'documents': <DocumentsPopup />

    }

    const popup2Form = {
      //'products': <EditAltNamesProductPopup />,
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
        {isOpenPopup && popupForm[currentTab.type]}
        {/*isOpenPopup2 && popup2Form[currentTab.type]*/}
        {isOpenImportPopup && importForm[currentTab.type]}
        {isOpenUploadDocumentsPopup && uploadDocForms[currentTab.type]}
        {isDwollaOpenPopup && addDwollaForms[currentTab.type] && Router.push('/dwolla-register')}
        {tables[currentTab.type] || <p>This page is still under construction</p>}
      </>
    )
  }

  getApiConfig = () => {
    const { currentTab } = this.props
    const datagridApiMap = {
      // 'company-details': this.companyDetails(),
      'users': {
        url: `/prodex/api/users/datagrid`,
        searchToFilter: v => v ?([
          { operator: 'LIKE', path: 'User.name', values: [`%${v}%`] },
          { operator: 'LIKE', path: 'User.homeBranch.name', values: [`%${v}%`] },
          // { operator: 'LIKE', path: '', values: [`%${v}%`] }, // TODO here should be User.jobTitle but BE doesn't seem to have it as filterable field...
        ]) : [],
        params: {
          orOperator: true
        }
      },
      'branches': {
        url: `/prodex/api/branches/datagrid`,
        searchToFilter: v => v ? ([
          { operator: 'LIKE', path: 'Branch.name', values: [`%${v}%`] },
          { operator: 'LIKE', path: 'Branch.address.streetAddress', values: [`%${v}%`] },
          { operator: 'LIKE', path: 'Branch.contactName', values: [`%${v}%`] },
        ]) : [],
        params: {
          orOperator: true
        }
      },
      'warehouses': {
        url: `/prodex/api/branches/warehouses/datagrid`,
        searchToFilter: v => v ? ([
          { operator: 'LIKE', path: 'Branch.name', values: [`%${v}%`] },
          { operator: 'LIKE', path: 'Branch.address.streetAddress', values: [`%${v}%`] },
          { operator: 'LIKE', path: 'Branch.contactName', values: [`%${v}%`] },
        ]) : [],
        params: {
          orOperator: true
        }
      },
      'products': {
        url: `/prodex/api/company-products/datagrid`,
        searchToFilter: v => v ? ([
          { operator: 'LIKE', path: 'CompanyProduct.intProductName', values: [`%${v}%`] },
          { operator: 'LIKE', path: 'CompanyProduct.intProductCode', values: [`%${v}%`] },
          { operator: 'LIKE', path: 'CompanyProduct.mfrProductName', values: [`%${v}%`] },
          { operator: 'LIKE', path: 'CompanyProduct.mfrProductCode', values: [`%${v}%`] },
          { operator: 'LIKE', path: 'CompanyProduct.echoProduct.name', values: [`%${v}%`] },
          { operator: 'LIKE', path: 'CompanyProduct.echoProduct.code', values: [`%${v}%`] },
        ]) : [],
        params: {
          orOperator: true
        }
      },
      // 'bank-accounts': null,
      // 'credit-cards': null,
      'delivery-addresses': {
        url: '/prodex/api/delivery-addresses/datagrid',
        searchToFilter: v => v ? ([
          { operator: 'LIKE', path: 'DeliveryAddress.address.streetAddress', values: [`%${v}%`] }
        ]) : []
      },

      'documents': {
        url: '/prodex/api/attachments/datagrid/',
        searchToFilter: v => v ? ([
          { operator: 'LIKE', path: 'Attachment.name', values: [`%${v}%`] },
          { operator: 'LIKE', path: 'Attachment.customName', values: [`%${v}%`] },
          { operator: 'LIKE', path: 'Attachment.documentType.name', values: [`%${v}%`] }
        ]) : [],
        params: {
          orOperator: true
        }
      }
    }

    return datagridApiMap[currentTab.type]
  }

  render() {
    const { currentTab } = this.props

    return (
      <DatagridProvider apiConfig={this.getApiConfig()}>
        <Container fluid className='flex stretched'>
          <Container fluid style={{ padding: '0 32px' }}>
            <TablesHandlers currentTab={currentTab} />
          </Container>
          <Grid columns='equal' className='flex stretched' style={{ padding: '0 32px' }}>
            <Grid.Row>
              <Grid.Column width={3}>
                <Tabs currentTab={currentTab} isCompanyAdmin={this.props.isCompanyAdmin} />
              </Grid.Column>
              <Grid.Column className='flex stretched' style={{ marginTop: '10px' }}>
                {this.renderContent()}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </DatagridProvider>
    )
  }
}

const mapStateToProps = ({ settings, auth }) => {

  return {
    ...settings,
    isCompanyAdmin: auth.identity ? auth.identity.isCompanyAdmin : false,
    company: auth.identity ? auth.identity.company : null,
  }
}

export default connect(
  mapStateToProps,
  { addTab, updateCompany, tabChanged, resetSettings, loadLogo, postCompanyLogo, deleteCompanyLogo }
)(withToastManager(Settings))
