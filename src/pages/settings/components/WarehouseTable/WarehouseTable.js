import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
	TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

import { 	EditDeleteFormatterProvider } from './WarehouseTableProviders';
import { getWarehousesDataRequest } from '../../actions';

class WarehouseTable extends Component {	

	componentDidMount() {
		this.props.getWarehousesDataRequest();
	}
	
	render() {
		const { 
			columns, 
			rows,
			filterValue,
			editDeleteColumns,
			popupStatus
		} = this.props;

		const GridRoot = props => <Grid.Root {...props} className={ popupStatus ? 'hide' : 'col-xs-10 main-table' } />
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

const mapStateToProps = store => {
  return {
		rows: store.settings.warehousesRows
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseTable);