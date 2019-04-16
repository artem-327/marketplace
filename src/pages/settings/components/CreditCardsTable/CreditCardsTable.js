import React, { Component } from 'react' 
import { connect } from 'react-redux' 

import { SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid' 
import {
  Grid,
  Table,
	TableHeaderRow
} from '~/components/dx-grid-semantic-ui/plugins'

import { 	EditDeleteFormatterProvider } from './CreditCardsTableProviders' 
import { getCreditCardsDataRequest } from '../../actions' 

class CreditCardsTable extends Component {
	state = {		
		columns: [
			{ name: 'editDeleteBtn', title: ' ' },
			{ name: 'last4', title: 'last4'},
			{ name: 'expirationMonthYear', title: 'ExpirationMonth / ExpirationYear' }
		]
	}	

	componentDidMount() {
		this.props.getCreditCardsDataRequest() 
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

		const GridRoot = props => <Grid.Root {...props} className={ editPopupBoolean || addNewWarehousePopup ? 'hide' : 'col-xs-10 main-table' } />
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
	getCreditCardsDataRequest
} 

const mapStateToProps = state => {
  return {
		rows: state.settings.creditCardsRows,
		editPopupBoolean: state.settings.editPopupBoolean,
		addNewWarehousePopup: state.settings.addNewWarehousePopup,
		filterValue: state.settings.filterValue
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardsTable) 