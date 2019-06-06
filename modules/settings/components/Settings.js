import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'formik-semantic-ui'
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
import TablesHandlers from './TablesHandlers'
import ProductImportPopup from './ProductCatalogTable/ProductImportPopup'
import DeliveryAddressesTable from './DeliveryAddressesTable/DeliveryAddressesTable'
import DeliveryAddressesPopup from './DeliveryAddressesTable/DeliveryAddressesPopup'
import DwollaAccount from './DwollaAccountComponent'
import { CompanyForm } from '~/modules/company-form/'
import { companyDetailsTab } from '../contants'
import Router from 'next/router'

import { addTab, tabChanged } from '../actions'
import { updateCompany } from '~/modules/admin/actions'
import { validationSchema } from '~/modules/company-form/constants'

// import Toast from '../../../../components/toast'

const TopMargedGrid = styled(Grid)`
  margin-top: 1rem !important;
`

class Settings extends Component {
  componentDidMount() {
    let { isCompanyAdmin, addTab, tabsNames, tabChanged, currentTab } = this.props
    if (isCompanyAdmin) addTab(companyDetailsTab)
    let queryTab = Router && Router.router ? tabsNames.find(tab => tab.type === Router.router.query.type) || companyDetailsTab || tabsNames[0] : tabsNames[0]

    if (!queryTab.type !== currentTab.type) tabChanged(queryTab)
  }

  companyDetails = () => {
    return (
      <TopMargedGrid relaxed='very' centered>
        <GridColumn computer={12}>
          <Form
            initialValues={this.props.company}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await this.props.updateCompany(values.id, { ...values, businessType: values.businessType.id })
              } catch (ignored) { }

              setSubmitting(false)
            }}
          >
            {({ values, errors, setFieldValue }) => {
              return (
                <Segment basic>
                  <CompanyForm />
                  <Grid>
                    <GridColumn floated='right' computer={4}>
                      <Button.Submit fluid><FormattedMessage id='global.save' /></Button.Submit>
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
    let { action, actionId, currentTab, isOpenPopup, isOpenImportPopup, isDwollaOpenPopup } = this.props

    const tables = {
      'company-details': this.companyDetails(),
      'users': <UsersTable />,
      'branches': <WarehouseTable />,
      'warehouses': <WarehouseTable />,
      'products': <ProductCatalogTable />,
      'bank-accounts': <BankAccountsTable />,
      'credit-cards': <CreditCardsTable />,
      'delivery-addresses': <DeliveryAddressesTable />,
    }

    const popupForm = {
      'users': <EditUsersPopup />,
      'branches': <EditWarehousePopup />,
      'warehouses': <EditWarehousePopup />,
      'products': <EditProductPopup />,
      'bank-accounts': <BankAccountsPopup />,
      'credit-cards': <CreditCardsPopup />,
      'delivery-addresses': <DeliveryAddressesPopup />
    }

    const importForm = {
      products: <ProductImportPopup />
    }

    const addDwollaForms = {
      'bank-accounts': <DwollaAccount />
    }

    return (
      <>
        {isOpenPopup && popupForm[currentTab.type]}
        {isOpenImportPopup && importForm[currentTab.type]}
        {isDwollaOpenPopup && addDwollaForms[currentTab.type]}
        {tables[currentTab.type] || <p>This page is still under construction</p>}
      </>
    )
  }

  render() {
    const { currentTab } = this.props

    return (
      <Container fluid className="flex stretched">
        <Container fluid style={{ padding: '0 32px' }}>
          <TablesHandlers currentTab={currentTab} />
        </Container>
        <Grid columns="equal" className="flex stretched" style={{ padding: '0 32px' }}>
          <Grid.Row>
            <Grid.Column width={3}>
              <Tabs currentTab={currentTab} isCompanyAdmin={this.props.isCompanyAdmin} />
            </Grid.Column>
            <Grid.Column className="flex stretched" style={{ marginTop: '10px' }}>
              {this.renderContent()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
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
  { addTab, updateCompany, tabChanged }
)(Settings)
