import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { bindActionCreators } from "redux" 

import { 
	handleEditPopup, 
	deleteBankAccount 
} from '../../actions' 

class editDeleteCell extends Component {
	state = {
		treeDotsIsOpen: false,
		treeDotsIsActive: 'threeDots small'
	}

	handler	= (e) => {		
		this.setState({
			treeDotsIsOpen: !this.state.treeDotsIsOpen,
			treeDotsIsActive: this.state.treeDotsIsActive === 'threeDots small' ? 'threeDots small active' : 'threeDots small'
		})
	}

	render() {
		return (
			<Dropdown icon='ellipsis vertical'>
				<Dropdown.Menu>
					<Dropdown.Item 
						text='Edit' 
						onClick={ () => this.props.handleEditPopup(this.props.row) }
					/>
					<Dropdown.Item 
						text='Delete' 
						onClick={ () => this.props.deleteWarehouse(this.props.row.branchId) }
					/>
				</Dropdown.Menu>
			</Dropdown>		
		) 		
	}
}

const mapDispatchToProps = {   
	handleEditPopup,
	deleteBankAccount
} 

const mapStateToProps = state => {
  return {
		state
  }
}

export const editDeleteCellFormatter =  connect(mapStateToProps, mapDispatchToProps)(editDeleteCell) 