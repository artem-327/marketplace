import React from 'react' 

import {Checkbox, Dropdown} from 'semantic-ui-react'

export const checkboxFormatter = props => {
	return (
		<Checkbox 
			color="default" 
			value="checked"
		/>
	)
}

export const permissionCellFormatter = ( ({ value }) => {
	const permissions = [ 'Admin', 'User', 'Super Admin' ].map(o => ({text: o, key: o, value: o}))

	return (
		<Dropdown style={{margin: -6}}
			placeholder='Select permission'
			selection
			defaultValue={permissions[0].value}
			options={permissions}
		/>
	)
}) 

export const editDeleteCellFormatter = () => {
	return (
		<Dropdown icon='ellipsis vertical'>
			<Dropdown.Menu>
				<Dropdown.Item 
					text='Edit' 
					onClick={ () => {} }
				/>
				<Dropdown.Item 
					text='Delete' 
					onClick={ () => {} }
				/>
			</Dropdown.Menu>
		</Dropdown>	
	)
}