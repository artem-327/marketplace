import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from "prop-types";
import { DataTypeProvider } from '@devexpress/dx-react-grid';

import '../styles/settings.css';

import Tabs from './Tabs';
import UsersTable from './UserTable/UsersTable';
import WarehouseTable from './WarehouseTable/WarehouseTable';
import BranchTable from './BranchTable/BranchTable';
import BankAccountsTable from './BankAccountsTable/BankAccountsTable';
import CreditCardsTable from './CreditCardsTable/CreditCardsTable';
import ProductCatalogTable from './ProductCatalogTable/ProductCatalogTable';
import EditWarehousePopup from './WarehouseTable/EditWarehousePopup';
import AddNewBranchPopup from './BranchTable/AddNewBranchPopup';
import AddNewWarehousePopup from './WarehouseTable/AddNewWarehousePopup';
import AddNewCreditCardPopup from './CreditCardsTable/AddNewCreditCardPopup';
import AddNewBankAccountPopup from './BankAccountsTable/AddNewBankAccountPopup';
import TablesHandlers from './TablesHandlers';

class Settings extends Component {

	state = {
		tabsNames: [
			{	name: 'Users', id: 1 }, 
			{	name: 'Branches', id: 2 }, 
			{	name: 'Warehouses', id: 3 }, 
			{	name: 'Product catalog', id: 4 }, 
			{	name: 'Price list', id: 5 }, 
			{	name: 'Client list', id: 6 }, 
			{	name: 'Credit cards', id: 7 },
			{	name: 'Bank accounts', id: 8 },
			{	name: 'Tax manager', id: 9 }, 
			{	name: 'Terms', id: 10 }, 
			{	name: 'Website Controls', id: 11 }],
		currentTab: 'Product catalog',
		filterValue: ''
	}

	filtersHandler = value => {		
		this.setState({ 
			filterValue: value 
		});
	}

	handleActiveTab = event => {		
		const target = event.target
		
		this.setState({
			currentTab: target.getAttribute('data-tab-name')
		});
	}
	
	render() {
		const {
			currentTab, 
			tabsNames,
			filterValue	
		} = this.state;

		const {
			editWarehousePopup,
			addNewWarehousePopup
		} = this.props;

		return (
			<main className="b-settings-content">
				<div className="b-for-shadow">
					<div className="b-wrapper row between-xs container-fluid">
						<span className="uppercase page-title col-xs-3">User settings</span>
						<TablesHandlers
							filtersHandler={ this.filtersHandler }
							currentTab={ currentTab }
						/>
					</div>
				</div>
				<div className="main-content-wrapper row between-xs container-fluid">
					<Tabs
						currentTab={ currentTab }
						tabsNames={ tabsNames } 
						handleActiveTab={ this.handleActiveTab }
					/>
					{ editWarehousePopup ? 
						<EditWarehousePopup	/>
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
						<AddNewCreditCardPopup />
						: null						
					}
					{ currentTab === 'Users' ?
					<UsersTable
						filterValue={ filterValue }
					/> :
					currentTab === 'Warehouses' ?
					<WarehouseTable 
						filterValue={ filterValue }
					/> :
					currentTab === 'Product catalog' ?
					<ProductCatalogTable 
						filterValue={ filterValue }
					/> :
					currentTab === 'Branches' ?
					<BranchTable 
						filterValue={ filterValue }
					/> :
					currentTab === 'Bank accounts' ?
					<BankAccountsTable
						filterValue={ filterValue }
					/> : 
					currentTab === 'Credit cards' ?
					<CreditCardsTable
						filterValue={ filterValue }
					/> : null			
					}
				</div>
			</main>
		);
	}
}

const mapStateToProps = state => {
  return {
		editWarehousePopup: state.settings.editWarehousePopup,
		addNewWarehousePopup: state.settings.addNewWarehousePopup
  }
}

export default connect(mapStateToProps, null)(Settings);