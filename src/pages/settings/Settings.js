import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from "prop-types";

import { DataTypeProvider } from '@devexpress/dx-react-grid';
import Paper from '@material-ui/core/Paper';

import './settings.css'

import Api from '../../api/users';
import unitedStates from '../../../src/components/unitedStates';
import Tabs from './components/Tabs';
import UsersTable from './components/UserTable/UsersTable';
import UsersTableHandlers from './components/UserTable/UsersTableHandlers';

class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			columns: [
				{ name: 'checkbox', title: ' '},
				{ name: 'userName', title: 'User Name' },
				{ name: 'title', title: 'Title' },
				{ name: 'email', title: 'E-mail' },
				{ name: 'phone', title: 'Phone' },
				{ name: 'homeBranch', title: 'Home Branch'},
				{ name: 'permissions', title: 'Permissions' },
				{ name: 'editDeleteBtn', title: ' ' },
			],
			rows: [
				{ checkbox: ' ', userName: "Female", title: "V.P Operations", email: "email@gmail.com", phone: "+123456", homeBranch: 'Arizona', permissions: 'Admin' },
				{ checkbox: ' ', userName: "Male", title: "Sales Executive", email: "email@gmail.com", phone: "+123456", homeBranch: 'Arizona', permissions: 'Super Admin' }
			],
			checkboxColumns: ['checkbox'],
			permissionsColumns: ['permissions'],
			editDeleteColumns: ['editDeleteBtn'],
			tabsNames: ['Users', 'Branches', 'Warehouses', 'Product catalog', 'Price list', 'Client list', 'Payment methods', 'Tax manager', 'Terms', 'Website Controls'],
			tabsValue: 0,
			filterFieldSelectValues: unitedStates,
			filterFieldCurrentValue: unitedStates[0].name,
			currentTab: 'Users'
		}
	};

	handleChangeSelectField = (event, value) => {
		this.setState({ 
			filterFieldCurrentValue: value 
		});
	};

	handleActiveTab = event => {
		const target = event.target;
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
			filterFieldSelectValues, 
			filterFieldCurrentValue,
			currentTab, 
			tabsNames, 			
			columns, 
			rows, 
			permissionsColumns,
			editDeleteColumns,
			checkboxColumns
		} = this.state;
		
		return (
			<main>
				<div className="b-for-shadow">
					<div className="b-wrapper row between-xs container-fluid">
						<span className="uppercase page-title col-xs-3">User settings</span>
						<UsersTableHandlers 
							filterFieldSelectValues={ filterFieldSelectValues }
							filterFieldCurrentValue={ filterFieldCurrentValue }
							handleChangeFieldsCurrentValue={ this.handleChangeFieldsCurrentValue }
						/>
					</div>
				</div>
				<div className="main-content-wrapper row between-xs container-fluid">					
					<Tabs
						currentTab={ currentTab }
						tabsNames={ tabsNames } 
						handleActiveTab={ this.handleActiveTab }
					/>
					<UsersTable
						columns={ columns }
						rows={ rows }
						permissionsColumns={ permissionsColumns}
						editDeleteColumns={ editDeleteColumns }
						checkboxColumns={ checkboxColumns }
					/>		
				</div>
			</main>
		);
	}
}

export default connect()(Settings);