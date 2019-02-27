import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { handleEditPopup } from '../../../../modules/settings';

const editDeleteCell = props => {
	// console.log(props, 'props')

	return (
		<div className="editDelete-wrapper">
			<button className="editDelete-btn" />
			<div className="handlers-row-menu">
				<button 
					className="handlers-row-menu__btn"
					onClick={ () => props.handleEditPopup(props.row) }
				>
					{'Edit'}
				</ button>
				<button 
					className="handlers-row-menu__btn"
				>
					{'Delete'}
				</ button>
			</div>
		</div>		
	);
}

const mapDispatchToProps = {   
	handleEditPopup
};

const mapStateToProps = store => {
  return {
		store
  }
}

export const editDeleteCellFormatter =  connect(mapStateToProps, mapDispatchToProps)(editDeleteCell);