import React, { Component } from 'react' 
import { connect } from 'react-redux' 
import { bindActionCreators } from "redux"

import { handleEditPopup, deleteWarehouse } from '../../actions' 

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
			<div className="editDelete-wrapper">			
				<div onClick={ (e) => this.handler(e) } className="three-dots-menu__opener">
            <span id='three-dots' className={ this.state.treeDotsIsActive } />
        </div>
				{
					this.state.treeDotsIsOpen ? 
					<ul className="three-dots-menu">
						<li
							onClick={ () => this.props.handleEditPopup(this.props.row) }
						>
							Edit
						</li>
						<li
							onClick={ () => this.props.deleteWarehouse(this.props.row.branchId) }
						>
							Delete
						</li>
					</ul> 
					: null
				}
			</div>		
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