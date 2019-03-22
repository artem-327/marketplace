import React from 'react' 

import { DataTypeProvider } from '@devexpress/dx-react-grid' 
import { editDeleteCellFormatter } from './WarehouseTableFormatters' 

const makeFormatterComponent = component => props => (
	// console.log(props, '1') ||
	<DataTypeProvider
		// formatterComponent={(props) => component(props) }
		formatterComponent={component}
		{...props}	
	/>
)
export const EditDeleteFormatterProvider = makeFormatterComponent( editDeleteCellFormatter ) 
