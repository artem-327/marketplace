import React from 'react';

import { SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
	TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

import { 
	CheckboxFormatterProvider, 
	PermissionsTypeProvider, 
	EditDeleteTypeProvider 
} from './UsersTableProviders';

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

const GridRoot = props => <Grid.Root {...props} className={cn(props.className,'col-xs-10 main-table')} />
const HeaderCells = props => <TableHeaderRow.Cell {...props} className={cn(props.className,'columns-title-cell')} />
const TableCells = props => <Table.Cell {...props} className={cn(props.className,'columns-rows-cell')} />

function UsersTable(props) {
	
	const { 
		columns, 
		rows, 
		checkboxColumns, 
		permissionsColumns, 
		editDeleteColumns, 
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
			<CheckboxFormatterProvider 
				for={ checkboxColumns }
				rows={ rows }
			/>
			<PermissionsTypeProvider
				for={ permissionsColumns }
				rows={ rows }
			/>
			<EditDeleteTypeProvider
				for={ editDeleteColumns }
				rows={ rows }
			/>
		</Grid>		
	);
}

export default UsersTable;