import React from 'react';

import { DataTypeProvider } from '@devexpress/dx-react-grid';
import {
  checkboxFormatter,
  permissionCellFormatter,
  editDeleteCellFormatter
} from './UsersTableFormatters';

export const CheckboxFormatterProvider = props => {
	return (
		<DataTypeProvider
			formatterComponent={ checkboxFormatter }			
    	{...props}	
		/>
	)
}

export const PermissionsTypeProvider = props => {
  return (
		<DataTypeProvider
			formatterComponent={ permissionCellFormatter }			
    	{...props}	
		/>
	)
}

export const EditDeleteTypeProvider = props => {
	return (
		<DataTypeProvider
			formatterComponent={ editDeleteCellFormatter }			
    	{...props}	
		/>
	)
}

// const makeFormatterComponent = formatterComponent => props => (
// 	<DataTypeProvider
// 			formatterComponent={ checkboxFormatter }			
//     	{...props}	
// 		/>
// )

// export const CheckboxFormatterProvider = makeFormatterComponent( checkboxFormatter );