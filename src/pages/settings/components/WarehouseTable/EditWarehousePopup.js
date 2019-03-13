import React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';

import { handleEditPopup, handleSubmitEditPopup } from '../../actions';

function EditWarehousePopup(props) {
  const { handleEditPopup, handleSubmitEditPopup, popupValues } = props;
  const [ address, city ]  = popupValues.address.split(','); 

  return (					
    <div className="popup-wrapper col-xs-10 center-xs">      
      <Form 
        model="forms.settingsPopup.editWarehouse" 
        onSubmit={(value) => handleSubmitEditPopup(value, popupValues.branchId)}
        className="b-popup col-xs-8"
      >    
        <h2>{'Warehouse'} Profile</h2>
        <ul className="">
          <li className="inputs-wrapper">
            <label className="warehouse-label name" htmlFor="warehouse-name">                        
              Warehouse name
            <Control.text model=".warehouseName" className="warehouse-input" id="warehouse-name" defaultValue={ popupValues.warehouseName } />
            </label>            
            <label className="warehouse-label contact-name" htmlFor="warehouse-contactName">
              Contact name
              <Control.text model=".contactName" className="warehouse-input" id="warehouse-contactName" defaultValue={ popupValues.contactName } />
            </label>             
          </li>
          <li className="inputs-wrapper">
            <label className="warehouse-label email" htmlFor="warehouse-email">  
              E-mail
              <Control.text model=".email" className="warehouse-input" id="warehouse-email" defaultValue={ popupValues.email } />
            </label>            
            <label className="warehouse-label phone" htmlFor="warehouse-phone">
              Phone
              <Control.text model=".phone" className="warehouse-input" id="warehouse-phone" defaultValue={ popupValues.phone } />
            </label>            
          </li>
          <li className="inputs-wrapper">
            <label className="warehouse-label address" htmlFor="warehouse-address">
              Address
              <Control.text model=".address" className="warehouse-input" id="warehouse-address" defaultValue={ address } />
            </label>
            <label className="warehouse-label address" htmlFor="warehouse-city">
              City
              <Control.text model=".city" className="warehouse-input" id="warehouse-city" defaultValue={ city } />
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