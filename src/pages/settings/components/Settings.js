import React, { Component } from 'react'
import { connect } from 'react-redux'

import Tabs from './Tabs'
import UsersTable from './UserTable/UsersTable'
import WarehouseTable from './WarehouseTable/WarehouseTable'
// import BranchTable from './BranchTable/BranchTable'
import BankAccountsTable from './BankAccountsTable/BankAccountsTable'
import CreditCardsTable from './CreditCardsTable/CreditCardsTable'
import ProductCatalogTable from './ProductCatalogTable/ProductCatalogTable'
import EditWarehousePopup from './WarehouseTable/WarehousePopup'
import EditUsersPopup from './UserTable/UsersPopup'
import EditProductPopup from './ProductCatalogTable/ProductPopup'
// import AddNewBranchPopup from './BranchTable/AddNewBranchPopup'
// import AddNewCreditCardPopup from './CreditCardsTable/AddNewCreditCardPopup'
import AddNewBankAccountPopup from './BankAccountsTable/AddNewBankAccountPopup'
import TablesHandlers from './TablesHandlers'
import Toast from '../../../../components/toast'

import { Container, Grid, Divider } from 'semantic-ui-react'

const tables = {
  Users: <UsersTable />,
  Branches: <WarehouseTable />,
  Warehouses: <WarehouseTable />,
  'Product catalog': <ProductCatalogTable />,
  'Bank accounts': <BankAccountsTable />,
  'Credit cards': <CreditCardsTable />
}

const popupForm = {
  Users: <EditUsersPopup />,
  Branches: <EditWarehousePopup />,
  Warehouses: <EditWarehousePopup />,
  'Product catalog': <EditProductPopup />
}

const addForms = {
  'Bank accounts': <AddNewBankAccountPopup />
}

class Settings extends Component {
  renderContent = () => {
    const {
      currentEditForm,
      currentAddForm,
      currentTab,
      isOpenPopup
    } = this.props

    return (
      <>
        {isOpenPopup && popupForm[currentTab]}
        {currentAddForm && addForms[currentTab]}
        {currentEditForm && editForms[currentTab]}
        {tables[currentTab] || <p>This page is still under construction</p>}
      </>
    )
  }

  render() {
    return (
      <Container fluid>
        <Toast />
        <TablesHandlers />
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column width={3}>
              <Tabs />
            </Grid.Column>
            <Grid.Column>{this.renderContent()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = ({ settings }) => settings

export default connect(
  mapStateToProps,
  null
)(Settings)
