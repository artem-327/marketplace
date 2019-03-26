import React, { Component } from 'react'
import { connect } from 'react-redux'

import PropTypes from "prop-types"
import { DataTypeProvider } from '@devexpress/dx-react-grid'

// import '../styles/settings.scss'

import Tabs from './Tabs'
import UsersTable from './UserTable/UsersTable'
import WarehouseTable from './WarehouseTable/WarehouseTable'
import BranchTable from './BranchTable/BranchTable'
import BankAccountsTable from './BankAccountsTable/BankAccountsTable'
import CreditCardsTable from './CreditCardsTable/CreditCardsTable'
import ProductCatalogTable from './ProductCatalogTable/ProductCatalogTable'
// import EditBranchPopup from './BranchTable/EditBranchPopup'
import EditWarehousePopup from './WarehouseTable/EditWarehousePopup'
import EditProductCatalogPopup from './ProductCatalogTable/EditProductCatalogPopup'
import AddNewBranchPopup from './BranchTable/AddNewBranchPopup'
import AddNewWarehousePopup from './WarehouseTable/AddNewWarehousePopup'
import AddNewCreditCardPopup from './CreditCardsTable/AddNewCreditCardPopup'
import AddNewBankAccountPopup from './BankAccountsTable/AddNewBankAccountPopup'
import AddNewProductCatalogPopup from './ProductCatalogTable/AddNewProductCatalogPopup'
import TablesHandlers from './TablesHandlers'

import { Container, Grid, Divider } from 'semantic-ui-react'

const tables = {
	'Users': <UsersTable />,
	'Warehouses': <WarehouseTable />,
	'Product catalog': <ProductCatalogTable />,
	'Branches': <BranchTable />,
	'Bank accounts': <BankAccountsTable />,
	'Credit cards': <CreditCardsTable />
}
const editForms = {
	'Warehouses': <EditWarehousePopup />,
	'Product catalog': <EditProductCatalogPopup />,
	'Branches': <EditWarehousePopup />,
}

const addForms = {
	'Warehouses': <AddNewWarehousePopup />,
	'Product catalog': <AddNewProductCatalogPopup />,
	'Branches': <AddNewBranchPopup /> ,
	'Bank accounts': <AddNewBankAccountPopup />,
}

class Settings extends Component {

	renderContent = () => {
		const {
			currentEditForm,
			currentAddForm,
			currentTab
		} = this.props
		
		console.log(currentAddForm, currentEditForm)

		if (currentAddForm) {
			return addForms[currentTab] || <p>Not implemented</p>
		} else if (currentEditForm) {
			return editForms[currentTab] || <p>Not implemented</p>
		} else {
			return tables[currentTab] || <p>This page is still under construction</p>
		}
	}

	render() {
		return (
			<Container fluid style={{ marginTop: 20 }}>
				<TablesHandlers />
				<Divider />
				<Grid columns='equal'>
					<Grid.Row>
						<Grid.Column width={3}>
							<Tabs />							
						</Grid.Column>
						<Grid.Column>
							{this.renderContent()}
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return state.settings
}

export default connect(mapStateToProps, null)(Settings) 
