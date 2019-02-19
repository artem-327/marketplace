import React, {Component} from 'react';

import { DataTypeProvider, FilteringState, IntegratedFiltering } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
	TableHeaderRow,
	TableFilterRow
} from '@devexpress/dx-react-grid-material-ui';

import { 
	CheckboxFormatterProvider, 
	PermissionsTypeProvider, 
	EditDeleteTypeProvider 
} from './UserTableProviders';

function UsersTable(props) {
	const { columns, rows, checkboxColumns, permissionsColumns, editDeleteColumns } = props;
	const GridRoot = props => <Grid.Root {...props} className={ "col-xs-10 main-table" } />

	return (					
		<Grid
			rootComponent={ GridRoot }
			rows={ rows }
			columns={ columns }						
		>	
			<FilteringState
				defaultFilters={[{ columnName: 'homeBranch', value: 'Arizona' }]}
			/>			
			<IntegratedFiltering />
			<TableFilterRow showFilterSelector={ true } />

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
			<IntegratedFiltering />
			<Table />
			<TableHeaderRow />
		</Grid>		
	);
}

export default UsersTable;