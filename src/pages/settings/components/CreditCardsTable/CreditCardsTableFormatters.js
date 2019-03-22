import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { bindActionCreators } from "redux" 

import {
	deleteCreditCard 
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
						text='Delete' 
						onClick={ () => this.props.deleteCreditCard(this.props.row.branchId) }
					/>
				</Dropdown.Menu>
			</Dropdown>	
		) 		
	}
}

const mapDispatchToProps = {
	deleteCreditCard
} 

const mapStateToProps = state => {
  return {
		state
  }
}

export const editDeleteCellFormatter =  connect(mapStateToProps, mapDispatchToProps)(editDeleteCell) 