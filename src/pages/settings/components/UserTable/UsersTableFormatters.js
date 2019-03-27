import React from 'react' 
import { connect } from 'react-redux' 
import { Dropdown } from 'semantic-ui-react'

import { handleEditPopup, deleteWarehouse } from '../../actions' 

function dropdownEditDelete(props) {
	return (
		<Dropdown icon='ellipsis vertical'>
			<Dropdown.Menu>
				<Dropdown.Item 
					text='Edit' 
					onClick={ () => props.handleEditPopup(props.row) }
				/>
				<Dropdown.Item 
					text='Delete' 
					// onClick={ () => props.deleteWarehouse(this.props.row.branchId) }
				/>
			</Dropdown.Menu>
		</Dropdown>	
	)
}

const mapDispatchToProps = {   
		handleEditPopup,
		deleteWarehouse
} 

export const dropdownEditDeleteFormatter =  connect(null, mapDispatchToProps)(dropdownEditDelete) 
// import React from 'react' 

// import Checkbox from '@material-ui/core/Checkbox' 

// export const checkboxFormatter = props => {
// 	return (
// 		<Checkbox 
// 			color="default" 
// 			value="checkedG"
// 			className="user-checkbox"
// 		/>
// 	)
// }

export const permissionCellFormatter = ({ value }) => {
	const permissions = [ 'Admin', 'User', 'Super Admin' ].map(p => ({
		text: p,
		value: p,
		key: p
	}))

	return (
		<Dropdown style={{margin: -6}}
			placeholder='Select permission'
			selection
			defaultValue={permissions[0].value}
			options={permissions}
		/>
	)
}

