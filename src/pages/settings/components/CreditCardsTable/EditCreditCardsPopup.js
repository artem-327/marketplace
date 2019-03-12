import React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';

import { handleEditPopup, handleSubmitEditPopup } from '../../actions';

function EditBranchPopup(props) {
  const { handleEditPopup, handleSubmitEditPopup, popupValues } = props;
  const [ address, city ]  = popupValues.address.split(','); 

  return (					
    <div className="popup-wrapper col-xs-10 center-xs">      
      <Form 
        model="forms.settingsPopup.editCreditCard" 
        onSubmit={(value) => handleSubmitEditPopup(value, popupValues.branchId)}
        className="b-popup col-xs-8"
      >    
        <h2>{'Warehouse'} Profile</h2>
        <ul className="">
          <li className="inputs-wrapper">
            <label className="warehouse-label name" htmlFor="warehouse-name">                        
              Card Number
            <Control.text model=".cardNumber" className="warehouse-input" id="warehouse-name" defaultValue={ popupValues.cardNumber } />
            </label>
            <label className="warehouse-label address" htmlFor="warehouse-address">
              CVC
              <Control.text model=".CVC" className="warehouse-input" id="warehouse-address" defaultValue={ popupValues.CVC } />
            </label>              
          </li>
          <li className="inputs-wrapper">
            <label className="warehouse-label city" htmlFor="warehouse-city">
              Expiration Month
              <Control.text model=".expirationMonth" className="warehouse-input" id="warehouse-city" defaultValue={ popupValues.expirationMonth } />
            </label>            
            <label className="warehouse-label state" htmlFor="warehouse-state">  
              Expiration Year
              <Control.text model=".expirationYear" className="warehouse-input" id="warehouse-state" defaultValue={ popupValues.expirationYear } />               
            </label>
          </li>          
          <li className="inputs-wrapper buttons-wrapper">
            <input 
              type="button" 
              value="Cancel"
              onClick={ handleEditPopup }
              className="cancel-popup-btn"
            />
            <button className="submit-popup-btn" >Update Warehouse</button> 
          </li>
        </ul>
      </Form>
    </div>
  );
}

const mapDispatchToProps = {   
  handleEditPopup,
  handleSubmitEditPopup
};

const mapStateToProps = state => {
  return {
		popupValues: state.settings.popupValues
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditWarehousePopup);