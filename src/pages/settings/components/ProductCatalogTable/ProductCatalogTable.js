import React, { Component } from 'react' 
import { connect } from 'react-redux' 

import { SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid' 
import {
  Grid,
  Table,
	TableHeaderRow
} from '~/components/dx-grid-semantic-ui/plugins'

import { 	EditDeleteFormatterProvider } from './ProductCatalogProviders' 
import { getProductsCatalogRequest } from '../../actions' 

class ProductCatalogTable extends Component {
	state = {		
		columns: [
			{ name: 'editDeleteBtn', title: ' ' },
			{ name: 'productName', title: 'Product Name'},
			{ name: 'productNumber', title: 'Product Number' },
			{ name: 'productId', title: 'Product ID' },
			{ name: 'packagingType', title: 'Packaging Type' },
			{ name: 'packagingSize', title: 'Packaging Size' }
		]
	}	

	componentDidMount() {
		// this.props.getProductsCatalogRequest() 
	}
	
	render() {
		const {			 
			rows,
			filterValue,
			editDeleteColumns,
			editWarehousePopup,
			addNewWarehousePopup
		} = this.props 

		const { columns } = this.state 

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
		) 		
	}
}

const mapDispatchToProps = {   
	getProductsCatalogRequest
} 

const mapStateToProps = state => {
  return {
		rows: state.settings.productsCatalogRows,
		editDeleteColumns: state.settings.columnsForFormatter.editDeleteColumns,
		editWarehousePopup: state.settings.editWarehousePopup,
		addNewWarehousePopup: state.settings.addNewWarehousePopup,
		filterValue: state.settings.filterValue
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCatalogTable) 