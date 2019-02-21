import React from 'react';

import { SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
	TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

function UsersTable(props) {
	const GridRoot = props => <Grid.Root {...props} className={ 'col-xs-10 main-table' } />
	const HeaderCells = props => <TableHeaderRow.Cell {...props} className={ 'columns-title-cell' } />
	const TableCells = props => <Table.Cell {...props} className={ 'columns-rows-cell' } />
	const { 
		columns, 
		rows,
		filterValue
	} = props;	

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
		</Grid>		
	);
}

export default UsersTable;