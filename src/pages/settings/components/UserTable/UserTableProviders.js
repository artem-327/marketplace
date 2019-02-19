import React, {Component} from 'react';

import { DataTypeProvider } from '@devexpress/dx-react-grid';
import {
  checkboxFormatter,
  permissionCellFormatter,
  editDeleteCellFormatter
} from './UserTableFormatters';

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