import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
	TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

import { 	EditDeleteFormatterProvider } from './BranchTableProviders';
import { getBranchesDataRequest } from '../../actions';

class BranchTable extends Component {
	state = {		
		columns: [
			{ name: 'warehouseName', title: 'Warehouse Name'},
			{ name: 'address', title: 'Adress' },
			{ name: 'contactName', title: 'Contact name' },
			{ name: 'phone', title: 'Phone' },
			{ name: 'email', title: 'E-mail' },
			{ name: 'editDeleteBtn', title: ' ' }
		]
	}	

	componentDidMount() {
		this.props.getBranchesDataRequest();
	}
	
	render() {
		const {
			rows,
			filterValue,
			editDeleteColumns,
			editWarehousePopup,
			addNewWarehousePopup
		} = this.props;

		const { columns } = this.state;

		const GridRoot = props => <Grid.Root {...props} className={ editWarehousePopup || addNewWarehousePopup ? 'hide' : 'col-xs-10 main-table' } />
		const HeaderCells = props => <TableHeaderRow.Cell {...props} className={ 'columns-title-cell' } />
		const TableCells = props => <Table.Cell {...props} className={ 'columns-rows-cell' } />


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
				<EditDeleteFormatterProvider
					for={ editDeleteColumns }
					rows={ rows }
				/>
			</Grid>		
		);		
	}
}

const mapDispatchToProps = {   
	getBranchesDataRequest
};

const mapStateToProps = state => {
  return {
		rows: state.settings.branchesRows,
		editDeleteColumns: state.settings.columnsForFormatter.editDeleteColumns,
		editWarehousePopup: state.settings.editWarehousePopup,
		addNewWarehousePopup: state.settings.addNewWarehousePopup
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BranchTable);