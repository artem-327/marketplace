import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';

export const checkboxFormatter = props => {
	return (
		<Checkbox 
			color="default" 
			value="checkedG"
			className="user-checkbox"
		/>
	)
}

export const permissionCellFormatter = ( ({ value }) => {
	const permissions = [ 'Admin', 'User', 'Super Admin' ];

	return (		
		<select 
			className={ 'wrapper-permissions' }
			defaultValue={ 'User' }
		>
			{permissions.map(option => (
				<option 
					key={ option } 
					defaultValue={ option }
					className={ 'permissions-input' }
				>
					{ option }
				</option>
			))}
		</select>	
	)
});

export const editDeleteCellFormatter = props => {

	return (
		<div className="editDelete-wrapper">
			<button className="editDelete-btn" />
			<div className="handlers-row-menu">
				<input 
					defaultValue={'Edit'}
					className="handlers-row-menu__btn"
				/>
				<input 
					defaultValue={'Delete'}
					className="handlers-row-menu__btn"
				/>
			</div>
		</div>		
	);
}