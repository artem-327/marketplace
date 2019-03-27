import React from 'react' 

import { DataTypeProvider } from '@devexpress/dx-react-grid' 
import {
  dropdownEditDeleteFormatter,
  permissionCellFormatter
} from './UsersTableFormatters' 

const makeFormatterComponent = component => props => (
	<DataTypeProvider
			formatterComponent={ component }			
    	{...props}	
		/>
)

export const DropdownEditDeliteProvider = makeFormatterComponent( dropdownEditDeleteFormatter ) 
export const PermissionFormatterProvider = makeFormatterComponent( permissionCellFormatter ) 
