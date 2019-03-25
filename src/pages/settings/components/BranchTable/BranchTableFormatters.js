import React, { Component } from 'react' 
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'

import { handleEditPopup, deleteWarehouse } from '../../actions' 

class editDeleteCell extends Component {
	render() {
		const {row, handleEditPopup, deleteWarehouse} = this.props

		return (
			<Dropdown icon='ellipsis vertical'>
				<Dropdown.Menu>
					<Dropdown.Item 
						text='Edit' 
						onClick={ () => handleEditPopup(row) } 
					/>
					<Dropdown.Item 
						text='Delete' 
						onClick={ () => deleteWarehouse(row.branchId) }
					/>
				</Dropdown.Menu>
			</Dropdown>	
		) 		
	}
}

const mapDispatchToProps = {   
	handleEditPopup,
	deleteWarehouse
} 

const mapStateToProps = state => {
  return {
		state
  }
}

export const editDeleteCellFormatter =  connect(mapStateToProps, mapDispatchToProps)(editDeleteCell) 