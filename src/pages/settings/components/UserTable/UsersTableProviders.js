import React from 'react';

import { DataTypeProvider } from '@devexpress/dx-react-grid';
import {
  checkboxFormatter,
  permissionCellFormatter,
  editDeleteCellFormatter
} from './UsersTableFormatters';

const makeFormatterComponent = component => props => (
	<DataTypeProvider
			formatterComponent={ component }			
    	{...props}	
		/>
)

export const CheckboxFormatterProvider = makeFormatterComponent( checkboxFormatter );
export const EditDeleteFormatterProvider = makeFormatterComponent( editDeleteCellFormatter );
export const PermissionFormatterProvider = makeFormatterComponent( permissionCellFormatter );
