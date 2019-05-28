import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'formik-semantic-ui'
import { Container, Grid, GridColumn, FormGroup, Segment } from 'semantic-ui-react'
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
import { CompanyForm } from '~/modules/company-form/'
import { companyDetailsTab } from '../contants'
import Router from 'next/router'

import { addTab } from '../actions'
import { updateCompany } from '~/src/pages/admin/actions'
import { validationSchema } from '~/modules/company-form/constants'


// import Toast from '../../../../components/toast'


const TopMargedGrid = styled(Grid)`
  margin-top: 1rem !important;
`



class Settings extends Component {
  componentDidMount() {
    let { isCompanyAdmin, addTab } = this.props
    if (isCompanyAdmin) addTab(companyDetailsTab)
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
                await this.props.updateCompany(values.id, values)
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
    let { currentTab, isOpenPopup, isOpenImportPopup, type } = this.props
    const tables = {
      Users: <UsersTable />,
      Branches: <WarehouseTable />,
      Warehouses: <WarehouseTable />,
      'Product catalog': <ProductCatalogTable />,
      'Bank accounts': <BankAccountsTable />,
      'Credit cards': <CreditCardsTable />,
      'Delivery addresses': <DeliveryAddressesTable />,
      'Company Details': this.companyDetails()
    }

    const popupForm = {
      Users: <EditUsersPopup />,
      Branches: <EditWarehousePopup />,
      Warehouses: <EditWarehousePopup />,
      'Product catalog': <EditProductPopup />,
      'Bank accounts': <BankAccountsPopup />,
      'Credit cards': <CreditCardsPopup />,
      'Delivery addresses': <DeliveryAddressesPopup />
    }

    const importForm = {
      'Product catalog': <ProductImportPopup />
    }

    return (
      <>
        {isOpenPopup && popupForm[currentTab.name]}
        {isOpenImportPopup && importForm[currentTab.name]}
        {tables[type ? 'Product catalog' : currentTab.name] || <p>This page is still under construction</p>}
      </>
    )
  }

  render() {
    return (
      <Container fluid className="flex stretched">
        <TablesHandlers />
        <Grid columns="equal" className="flex stretched">
          <Grid.Row>
            <Grid.Column width={3}>
              <Tabs isCompanyAdmin={this.props.isCompanyAdmin} type='products' />
            </Grid.Column>
            <Grid.Column className="flex stretched" style={{ marginTop: '7px' }}>
              {this.renderContent()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = ({ settings, auth }) => ({
  ...settings,
  isCompanyAdmin: auth.identity ? auth.identity.isCompanyAdmin : false,
  company: auth.identity ? auth.identity.company : null,
  type: Router && Router.router ? Router.router.query.type : false
})

export default connect(
  mapStateToProps,
  { addTab, updateCompany }
)(Settings)
