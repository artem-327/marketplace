import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { DataTypeProvider } from '@devexpress/dx-react-grid';

import '../styles/settings.css';

import Tabs from './Tabs';
import UsersTable from './UserTable/UsersTable';
import WarehouseTable from './WarehouseTable/WarehouseTable';
import EditWarehousePopup from './WarehouseTable/EditWarehousePopup';
import AddNewWarehousePopup from './WarehouseTable/AddNewWarehousePopup';
import TablesHandlers from './TablesHandlers';

class Settings extends Component {

	state = {
		usersColumns: [
			{ name: 'checkbox', title: ' '},
			{ name: 'userName', title: 'User Name' },
			{ name: 'title', title: 'Title' },
			{ name: 'email', title: 'E-mail' },
			{ name: 'phone', title: 'Phone' },
			{ name: 'homeBranch', title: 'Home Branch'},
			{ name: 'permissions', title: 'Permissions' },
			{ name: 'editDeleteBtn', title: ' ' }
		],
		warehouseColumns: [
			{ name: 'warehouseName', title: 'Warehouse Name'},
			{ name: 'address', title: 'Adress' },
			{ name: 'contactName', title: 'Contact name' },
			{ name: 'phone', title: 'Phone' },
			{ name: 'email', title: 'E-mail' },
			{ name: 'editDeleteBtn', title: ' ' }
		],
		checkboxColumns: ['checkbox'],
		permissionsColumns: ['permissions'],
		editDeleteColumns: ['editDeleteBtn'],
		tabsNames: [
			{	name: 'Users' }, 
			{	name: 'Branches' }, 
			{	name: 'Warehouses' }, 
			{	name: 'Product catalog' }, 
			{	name: 'Price list' }, 
			{	name: 'Client list' }, 
			{	name: 'Payment methods' }, 
			{	name: 'Tax manager' }, 
			{	name: 'Terms' }, 
			{	name: 'Website Controls' }],
		filterFieldCurrentValue: 'None',
		currentTab: 'Warehouses',
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
			usersColumns, 
			usersRows, 
			permissionsColumns,
			editDeleteColumns,
			checkboxColumns,
			filterValue,
			warehouseColumns,
			warehousesRows			
		} = this.state;

		const { 
			editWarehousePopup,
			addNewWarehousePopup
		} = this.props;

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
					{ addNewWarehousePopup ?
						<AddNewWarehousePopup
							handleChangeFieldsCurrentValue={ this.handleChangeFieldsCurrentValue }
						/>
						: null
					}
					{ currentTab === 'Users' ?
					<UsersTable
						columns={ usersColumns }
						permissionsColumns={ permissionsColumns}
						editDeleteColumns={ editDeleteColumns }
						checkboxColumns={ checkboxColumns }
						filterValue={ filterValue }
					/>
					:
					<WarehouseTable 
						columns={ warehouseColumns }
						filterValue={ filterValue }
						editDeleteColumns={ editDeleteColumns }
						popupStatus={ editWarehousePopup || addNewWarehousePopup }
					/>
					}
				</div>
			</main>
		);
	}
}

const mapStateToProps = store => {
  return {
		editWarehousePopup: store.settings.editWarehousePopup,
		addNewWarehousePopup: store.settings.addNewWarehousePopup
  }
}

export default connect(mapStateToProps, null)(Settings);