import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
	TableHeaderRow
} from '~/components/dx-grid-semantic-ui/plugins'
// } from '@devexpress/dx-react-grid-material-ui';



import { 	EditDeleteFormatterProvider } from './WarehouseTableProviders';
import { getWarehousesDataRequest } from '../../actions';

class WarehouseTable extends Component {
	
	state = {		
		columns: [
			{ name: 'warehouseName', title: 'Warehouse Name'},
			{ name: 'address', title: 'Address' },
			{ name: 'contactName', title: 'Contact name' },
			{ name: 'phone', title: 'Phone' },
			{ name: 'email', title: 'E-mail' },
			{ name: 'editDeleteBtn', title: ' ' }
		]
	}

	componentDidMount() {
		console.log('did mount werehouses')
		this.props.getWarehousesDataRequest();
	}

	setTextInputRef = element => {
		this.textInput = element;
	};
	
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
	getWarehousesDataRequest
};

const mapStateToProps = state => {
  return {
		rows: state.settings.warehousesRows,
		editDeleteColumns: state.settings.columnsForFormatter.editDeleteColumns,
		editWarehousePopup: state.settings.editWarehousePopup,
		addNewWarehousePopup: state.settings.addNewWarehousePopup,
		filterValue: state.settings.filterValue
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseTable);