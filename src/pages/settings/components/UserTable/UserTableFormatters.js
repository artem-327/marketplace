import React, {Component} from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
		<TextField
			select
			value={ value }
			// onChange={this.handleChangeFieldsCurrentValue('filterFieldCurrentValue')}
			variant="outlined"
			className={ "permissions-cell" }
		>
			{permissions.map(option => (
				<MenuItem 
					key={ option } 
					value={ option }
					className={ "formatter-input" }
				>
					{ option }
				</MenuItem>
			))}
		</TextField>
	)
};

export const editDeleteCellFormatter = props => {
	const options = ['Edit', 'Delete'];
	let open = false;

	return (
		<div>
			<IconButton
				aria-label="More"
				aria-owns={open ? 'long-menu' : undefined}
				aria-haspopup="true"
				onClick={ () => {}}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				anchorEl={ null }
				open={ open }
				onClose={ () => {}}
				PaperProps={{
					style: {
						maxHeight: 110,
						width: 80
					},
				}}
			>
				{options.map(option => (
					<MenuItem 
						key={option} 
						selected={ option === 'Pyxis' } 
						// onClick={ this.handleClose }
					>
						{ option }
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}