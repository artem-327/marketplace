import React, { Component } from 'react'
import { connect } from 'react-redux'

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

import Toast from '../../../../components/toast'

import { Container, Grid } from 'semantic-ui-react'

const tables = {
  Users: <UsersTable />,
  Branches: <WarehouseTable />,
  Warehouses: <WarehouseTable />,
  'Product catalog': <ProductCatalogTable />,
  'Bank accounts': <BankAccountsTable />,
  'Credit cards': <CreditCardsTable />,
  'Delivery addresses': <DeliveryAddressesTable />
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

class Settings extends Component {
  renderContent = () => {
    const { currentTab, isOpenPopup, isOpenImportPopup } = this.props

    return (
      <>
        {isOpenPopup && popupForm[currentTab]}
        {isOpenImportPopup && importForm[currentTab]}
        {tables[currentTab] || <p>This page is still under construction</p>}
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
              <Tabs />
            </Grid.Column>
            <Grid.Column className="flex stretched" style={{marginTop: '7px'}}>
              {this.renderContent()}
            </Grid.Column>
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
