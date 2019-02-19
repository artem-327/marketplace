import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';

export const checkboxFormatter = props => {
	return (
		<Checkbox 
			color="default" 
			value="checkedG" 
		/>
	)
}

export const permissionCellFormatter = ({ value }) => {
	const permissions = [ 'Admin', 'Default user', 'Super Admin' ];

	return (		
		<select className={ 'wrapper-permissions' }>
			{permissions.map(option => (
				<option 
					key={ option } 
					value={ option }
					className={ 'permissions-input' }
				>
					{ option }
				</option>
			))}
		</select>	
	)
};

export const editDeleteCellFormatter = props => {
	const options = ['Edit', 'Delete'];
	let open = false;

	return (
		<div className="editDelete-wrapper">
			<button className="editDelete-btn" />
			<ul className="popup-menu">
				{options.map(option => (
				<li
					key={ option }
				>
					{ option }
				</li>
				))}
			</ul>
		</div>		
	);
}