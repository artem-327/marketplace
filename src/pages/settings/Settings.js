import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from "prop-types";

import './settings.css';

import { DataTypeProvider } from '@devexpress/dx-react-grid';
import Paper from '@material-ui/core/Paper';

import Tabs from './components/Tabs';
import UsersTable from './components/UserTable/UsersTable';
import WarehouseTable from './components/WarehouseTable/WarehouseTable';
import EditWarehousePopup from './components/WarehouseTable/EditWarehousePopup';
import AddNewWarehousePopup from './components/WarehouseTable/AddNewWarehousePopup';
import TablesHandlers from './components/TablesHandlers';
import Users from '../administration/users/Users';
import { withAuth } from '../../utils/auth';
import usersReq from '../../api/users';
import warehousesReq from '../../api/branches';
import api from '../../api/users';

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
		usersRows: [],
		warehouseColumns: [
			{ name: 'warehouseName', title: 'Warehouse Name'},
			{ name: 'address', title: 'Adress' },
			{ name: 'contactName', title: 'Contact name' },
			{ name: 'phone', title: 'Phone' },
			{ name: 'email', title: 'E-mail' },
			{ name: 'editDeleteBtn', title: ' ' }
		],
		warehousesRows: [],
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


	componentDidMount() {		
		this.setStateWarehouses();
		this.setUsersToState();
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

	//temporarily
	setStateWarehouses = () => {
		warehousesReq.getWarehouses().then(res => {
			let warehousesRows = res.map(warehouse => {	
				return (
					{
						warehouseName: warehouse.company.name,
						address: warehouse.address.streetAddress + ', ' + warehouse.address.city,
						contactName: warehouse.contact.name,
						phone: warehouse.contact.phone,
						email: warehouse.contact.email,
						branchId: warehouse.id
					}
				)			
			});
			this.setState({
				warehousesRows
			})
		})
	}

	//temporarily
	setUsersToState = () => {
		usersReq.getUsers().then(res => {
			let usersRows = res.map(user => {				
				return (
					{
						checkbox: ' ',
						userName: user.firstname + ' ' + user.lastname,
						title: 'title' ,
						email: user.email,
						phone: 'phone',
						homeBranch: user.branch.address.province.name,
						permissions: user.roles.name
					}
				)			
			});

			this.setState({
				usersRows
			})
		})
	}
	
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
						rows={ usersRows }
						permissionsColumns={ permissionsColumns}
						editDeleteColumns={ editDeleteColumns }
						checkboxColumns={ checkboxColumns }
						filterValue={ filterValue }
					/>
					:
					<WarehouseTable 
						columns={ warehouseColumns }
						rows={ warehousesRows }
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