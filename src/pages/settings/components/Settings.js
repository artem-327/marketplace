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
import CreditCardsTable from './CreditCardsTable/CreditCardsTable'
import EditWarehousePopup from './WarehouseTable/EditWarehousePopup';
import AddNewBranchPopup from './BranchTable/AddNewBranchPopup';
import AddNewWarehousePopup from './WarehouseTable/AddNewWarehousePopup';
import AddNewCreditCardPopup from './CreditCardsTable/AddNewCreditCardPopup';
import AddNewBankAccountPopup from './BankAccountsTable/AddNewBankAccountPopup';
import TablesHandlers from './TablesHandlers';

class Settings extends Component {

	state = {
		checkboxColumns: ['checkbox'],
		permissionsColumns: ['permissions'],
		editDeleteColumns: ['editDeleteBtn'],
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
		filterFieldCurrentValue: 'None',
		currentTab: 'Credit cards',
		filterValue: ''
	}

	filtersHandler = value => {		
		this.setState({ 
			filterValue: value 
		});
	}

	handleChangeSelectField = (event, value) => {
		this.setState({ 
			filterFieldCurrentValue: value 
		});
	};

	handleActiveTab = event => {
		
		const target = event.target
		this.setState({
			currentTab: target.getAttribute('data-tab-name')
		});
	}

	handleChangeFieldsCurrentValue = fieldStateName => event => {
		this.setState({ 
			[fieldStateName]: event.target.value 
		});
	};
	
	render() {
		const { 
			filterFieldCurrentValue,
			currentTab, 
			tabsNames,			 
			permissionsColumns,
			editDeleteColumns,
			checkboxColumns,
			filterValue			
		} = this.state;

		const { 
			editWarehousePopup,
			addNewWarehousePopup
		} = this.props;

		console.log(currentTab, 'currentTab')
		return (			
			<main>
				<div className="b-for-shadow">
					<div className="b-wrapper row between-xs container-fluid">
						<span className="uppercase page-title col-xs-3">User settings</span>
						<TablesHandlers
							filterFieldCurrentValue={ filterFieldCurrentValue }
							handleChangeFieldsCurrentValue={ this.handleChangeFieldsCurrentValue }
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
						<AddNewBranchPopup
							handleChangeFieldsCurrentValue={ this.handleChangeFieldsCurrentValue }
						/> :
						addNewWarehousePopup && currentTab === 'Warehouses' ?
						<AddNewWarehousePopup
							handleChangeFieldsCurrentValue={ this.handleChangeFieldsCurrentValue }
						/> :
						addNewWarehousePopup && currentTab === 'Bank accounts' ?
						<AddNewBankAccountPopup
							handleChangeFieldsCurrentValue={ this.handleChangeFieldsCurrentValue }
						/> :
						addNewWarehousePopup && currentTab === 'Credit cards' ?
						<AddNewCreditCardPopup
							handleChangeFieldsCurrentValue={ this.handleChangeFieldsCurrentValue }
						/>
						: null						
					}
					{ currentTab === 'Users' ?
					<UsersTable
						permissionsColumns={ permissionsColumns}
						editDeleteColumns={ editDeleteColumns }
						checkboxColumns={ checkboxColumns }
						filterValue={ filterValue }
					/> :
					currentTab === 'Warehouses' ?
					<WarehouseTable 
						filterValue={ filterValue }
						editDeleteColumns={ editDeleteColumns }
						popupStatus={ editWarehousePopup || addNewWarehousePopup }
					/> :
					currentTab === 'Branches' ?
					<BranchTable 
						filterValue={ filterValue }
						editDeleteColumns={ editDeleteColumns }
						popupStatus={ editWarehousePopup || addNewWarehousePopup }
					/> :
					currentTab === 'Bank accounts' ?
					<BankAccountsTable
						filterValue={ filterValue }
						editDeleteColumns={ editDeleteColumns }
						popupStatus={ editWarehousePopup || addNewWarehousePopup }
					/> : 
					currentTab === 'Credit cards' ?
					<CreditCardsTable
						filterValue={ filterValue }
						editDeleteColumns={ editDeleteColumns }
						popupStatus={ editWarehousePopup || addNewWarehousePopup }
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