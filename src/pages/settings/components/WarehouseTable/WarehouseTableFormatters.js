import React from 'react' 
import { connect } from 'react-redux' 
import { Dropdown } from 'semantic-ui-react'

import { openEditPopup, deleteWarehouse } from '../../actions' 

function editDeleteCell({row, deleteWarehouse, openEditPopup}) {

	return (
		<Dropdown icon='ellipsis vertical'>
			<Dropdown.Menu>
				<Dropdown.Item 
					text='Edit' 
					onClick={ () => openEditPopup(row) }
				/>
				<Dropdown.Item 
					text='Delete' 
					onClick={ () => deleteWarehouse(row.branchId) }
				/>
			</Dropdown.Menu>
		</Dropdown>	
	)
}

const mapDispatchToProps = {   
	openEditPopup,
	deleteWarehouse
} 

export const editDeleteCellFormatter = connect(null, mapDispatchToProps)(editDeleteCell) 