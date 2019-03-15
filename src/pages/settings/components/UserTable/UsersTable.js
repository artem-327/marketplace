import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
	TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

import { 
	CheckboxFormatterProvider,
	EditDeleteFormatterProvider,
	PermissionFormatterProvider
} from './UsersTableProviders';
import { getUsersDataRequest } from '../../actions';

function cn(){
		let res = "";
		for( let j = 0, len = arguments.length, v; j < len; j++ ){
			v = arguments[ j ];	
			if( v ){
				res += " " + v;
			}
		}
		return res.trim();
}

class UsersTable extends Component {
	state = {
		columns: [
			{ name: 'checkbox', title: ' '},
			{ name: 'userName', title: 'User Name' },
			{ name: 'title', title: 'Title' },
			{ name: 'email', title: 'E-mail' },
			{ name: 'phone', title: 'Phone' },
			{ name: 'homeBranch', title: 'Home Branch'},
			{ name: 'permissions', title: 'Permissions' },
			{ name: 'editDeleteBtn', title: ' ' }
		]
	}

	componentDidMount() {
		this.props.getUsersDataRequest();
	}
	
	render() {
		const {
			rows, 
			checkboxColumns, 
			permissionsColumns, 
			editDeleteColumns, 
			filterValue,
			// editWarehousePopup,
			// addNewWarehousePopup
		} = this.props;

		const { columns } = this.state;

		const GridRoot = props => <Grid.Root {...props} className={cn(props.className,'col-xs-10 main-table')} />
		const HeaderCells = props => <TableHeaderRow.Cell {...props} className={cn(props.className,'columns-title-cell')} />
		const TableCells = props => <Table.Cell {...props} className={cn(props.className,'columns-rows-cell')} />

		return (			
			<Grid
				rootComponent={ GridRoot }
				rows={ rows }
				columns={ columns }
			>	
				<SearchState 
					value={ filterValue } 
				/>
				<IntegratedFiltering />	
				<Table 
					cellComponent={ TableCells }
				/>
				<TableHeaderRow 
					cellComponent={ HeaderCells }
				/>
				<CheckboxFormatterProvider 
					for={ checkboxColumns }
					rows={ rows }
				/>
				<PermissionFormatterProvider
					for={ permissionsColumns }
					rows={ rows }
				/>
				<EditDeleteFormatterProvider
					for={ editDeleteColumns }
					rows={ rows }
				/>
			</Grid>		
		)		
	}
}

const mapDispatchToProps = {   
	getUsersDataRequest
};

const mapStateToProps = state => {
  return {
		rows: state.settings.usersRows,
		editDeleteColumns: state.settings.columnsForFormatter.editDeleteColumns,
		permissionsColumns: state.settings.columnsForFormatter.permissionsColumns,
		checkboxColumns: state.settings.columnsForFormatter.checkboxColumns,
		filterValue: state.settings.filterValue
		// editWarehousePopup: state.settings.editWarehousePopup,
		// addNewWarehousePopup: state.settings.addNewWarehousePopup
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);