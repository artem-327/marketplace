import React, { Component } from 'react' 
import { connect } from 'react-redux' 

import PropTypes from "prop-types" 
import { DataTypeProvider } from '@devexpress/dx-react-grid' 

import '../styles/settings.css' 

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

class Settings extends Component {
	
	render() {
		const {
			editWarehousePopup,
			addNewWarehousePopup,
			currentTab
		} = this.props 

		return (
			<main className="b-settings-content">
				<div className="b-for-shadow">
					<div className="b-wrapper row between-xs container-fluid">
						<span className="uppercase page-title col-xs-3">User settings</span>
						<TablesHandlers />
					</div>
				</div>
				<div className="main-content-wrapper row between-xs container-fluid">
					<Tabs />
					{ editWarehousePopup && currentTab === 'Product catalog' ?
						<EditProductCatalogPopup /> :
						editWarehousePopup && currentTab === 'Warehouses' ? 
						<EditWarehousePopup	/> :
						editWarehousePopup && currentTab === 'Branches' ?
						<EditWarehousePopup /> 
						: null
					}
					{ 
						addNewWarehousePopup && currentTab === 'Branches' ?
						<AddNewBranchPopup /> :
						addNewWarehousePopup && currentTab === 'Warehouses' ?
						<AddNewWarehousePopup /> :
						addNewWarehousePopup && currentTab === 'Bank accounts' ?
						<AddNewBankAccountPopup /> :
						addNewWarehousePopup && currentTab === 'Credit cards' ?
						<AddNewCreditCardPopup /> :
						addNewWarehousePopup && currentTab === 'Product catalog' ?
						<AddNewProductCatalogPopup />
						: null
					}
					{ currentTab === 'Users' ?
					<UsersTable /> :
					currentTab === 'Warehouses' ?
					<WarehouseTable /> :
					currentTab === 'Product catalog' ?
					<ProductCatalogTable /> :
					currentTab === 'Branches' ?
					<BranchTable /> :
					currentTab === 'Bank accounts' ?
					<BankAccountsTable /> : 
					currentTab === 'Credit cards' ?
					<CreditCardsTable /> : <div className="conMess col-xs-10" style={{textAlign: 'center'}}>This page is still under construction</div>
					}
				</div>
			</main>
		) 
	}
}

const mapStateToProps = state => {
  return {
		editWarehousePopup: state.settings.editWarehousePopup,
		addNewWarehousePopup: state.settings.addNewWarehousePopup,
		currentTab: state.settings.currentTab
  }
}

export default connect(mapStateToProps, null)(Settings) 