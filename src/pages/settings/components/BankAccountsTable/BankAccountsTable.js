import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
	TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

import { 	EditDeleteFormatterProvider } from './BankAccountsProviders';
import { getBankAccountsDataRequest } from '../../actions';

class BankAccountsTable extends Component {
	state = {		
		columns: [
			{ name: 'accountHolderName', title: 'Account Holder Name'},
			{ name: 'accountNumber', title: 'Account Number' },
			{ name: 'currency', title: 'Currency' },			
			{ name: 'editDeleteBtn', title: ' ' },
			{ name: 'accountHolderType', title: ' ' },			
			{ name: 'country', title: ' ' },
			{ name: 'routingNumber', title: ' ' }
		]
	}	

	componentDidMount() {
		this.props.getBankAccountsDataRequest();
	}
	
	render() {
		const {			 
			rows,
			filterValue,
			editDeleteColumns,
			popupStatus
		} = this.props;

		const { columns } = this.state;

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
	getBankAccountsDataRequest
};

const mapStateToProps = state => {
  return {
		rows: state.settings.branchesRows
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountsTable);