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
        model="forms.settingsPopup.editBankAccount" 
        onSubmit={(value) => handleSubmitEditPopup(value, popupValues.branchId)}
        className="b-popup col-xs-8"
      >    
        <h2>{'Warehouse'} Profile</h2>
        <ul className="">
          <li className="inputs-wrapper">
            <label className="settings-popup-label name" htmlFor="product-search">                        
              CAS Number / Product Search
              <input className="popup-input" id="product-search" defaultValue={ searchValue } />
            </label>            
          </li>
          <li className="inputs-wrapper">
            <label className="settings-popup-label name" htmlFor="product-name">                        
              Product Name
              <Control.text model=".accountHolderName" className="popup-input" id="product-name" defaultValue={ productName } />
            </label>
            <label className="settings-popup-label address" htmlFor="product-number">
              Product Number
              <Control.text model=".accountHolderType" className="popup-input" id="product-number" defaultValue={ productNumber } />
            </label>
            <label className="settings-popup-label city" htmlFor="product-id">
              Product ID
              <Control.text model=".accountNumber" className="popup-input" id="product-id" defaultValue={ productId } />
            </label>
          </li>
          <li className="inputs-wrapper">
            <label className="settings-popup-label state" htmlFor="product-packaging-type">  
              Packaging Type
              <Control.text model=".country" className="popup-input" id="product-packaging-type" defaultValue={ productType } />
            </label>
            <label className="settings-popup-label zip-code" htmlFor="product-packaging-size">
              Packaging Size
              <Control.text model=".currency" className="popup-input" id="product-packaging-size" defaultValue={ productSize } />
            </label>
          </li>
          <li className="inputs-wrapper buttons-wrapper">
            <input 
              type="button" 
              value="Cancel"
              onClick={ handleEditPopup }
              className="cancel-popup-btn"
            />
            <button className="submit-popup-btn" >Save Mapping</button> 
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