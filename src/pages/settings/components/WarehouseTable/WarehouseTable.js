import React, { Component } from 'react' 
import { connect } from 'react-redux' 

import { SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid' 
import {
  Grid,
  Table,
	TableHeaderRow,
	DragDropProvider,
	TableColumnReordering
} from '@devexpress/dx-react-grid-bootstrap4'
// } from '~/components/dx-grid-semantic-ui/plugins'

import { 	EditDeleteFormatterProvider } from './WarehouseTableProviders' 
import { getWarehousesDataRequest } from '../../actions' 

class WarehouseTable extends Component {
	
	state = {		
		columns: [
			{ name: 'editDeleteBtn', title: ' ', dropdown: true, width: 45 },
			{ name: 'warehouseName', title: 'Warehouse Name'},
			{ name: 'address', title: 'Address' },
			{ name: 'contactName', title: 'Contact Name' },
			{ name: 'phone', title: 'Phone' },
			{ name: 'email', title: 'E-mail' }
		]
	}

	componentDidMount() {
		this.props.getWarehousesDataRequest();
	}

	setTextInputRef = element => {
		this.textInput = element 
	} 
	
	render() {
		const {			 
			rows,
			filterValue,
			editDeleteColumns,
			editPopupBoolean,
			addNewWarehousePopup
		} = this.props 

		const { columns } = this.state 

		// const GridRoot = props => <Grid.Root {...props} className={ editWarehousePopup || addNewWarehousePopup ? 'hide' : 'col-xs-10 main-table' } />
		const HeaderCells = props => <TableHeaderRow.Cell {...props} className={ 'columns-title-cell' } />
		const TableCells = props => <Table.Cell {...props} className={ 'columns-rows-cell' } />

		return (	
			<div className="bootstrapiso">
				<Grid
					rows={ rows }
					columns={ columns }									
				>	
					<DragDropProvider />
					
					<SearchState 
						value={ filterValue } 
					/>
					<IntegratedFiltering />	
					<Table clssName="table-bordered"
						cellComponent={ TableCells }
					/>
					<TableHeaderRow 
						cellComponent={ HeaderCells }
					/>
					<EditDeleteFormatterProvider
						for={ editDeleteColumns }
						rows={ rows }
					/>
					<TableColumnReordering defaultOrder={columns.map(c => c.name)} />
				</Grid>		
			</div>				
		) 		
	}
}

const mapDispatchToProps = {   
	getWarehousesDataRequest
} 

const mapStateToProps = state => {
  return {
		rows: state.settings.warehousesRows,
		editDeleteColumns: state.settings.columnsForFormatter.editDeleteColumns,
		editPopupBoolean: state.settings.editPopupBoolean,
		addNewWarehousePopup: state.settings.addNewWarehousePopup,
		filterValue: state.settings.filterValue
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseTable) 