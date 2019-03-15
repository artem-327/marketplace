import React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';

// import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';

import { handleAddNewWarehousePopup, postNewBankAccountRequest } from '../../actions';

class AddNewProductCatalogPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      productName: '',
      productNumber: '',
      productId: '',
      productType: '',
      productSize: ''
    }
  }

  render() {
    const {
      searchValue,
      productName,
      productNumber,
      productId,
      productType,
      productSize
    } = this.state
    const { 
      handleAddNewWarehousePopup,  
      postNewBankAccountRequest 
    } = this.props;

    return (					
      <div className="popup-wrapper col-xs-10 center-xs">      
        <Form 
          model="forms.settingsPopup.addNewBankAccount" 
          onSubmit={ (value) => postNewBankAccountRequest(value) }
          className="b-popup col-xs-10"
        >    
          <h2>{'Bank Account'} Profile</h2>
          <ul>
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
            <li className="add-warehouse-inputs-wrapper">                         
              <div className="buttons-wrapper">
                <input 
                  type="button" 
                  defaultValue="Cancel"
                  onClick={ handleAddNewWarehousePopup }
                  className="cancel-popup-btn"
                />
                <button className="save-btn">Save</button>
              </div>
            </li>          
          </ul>
        </Form>
      </div>
    );    
  }
}

const mapDispatchToProps = {   
  handleAddNewWarehousePopup,
  postNewBankAccountRequest
};

export default connect(null, mapDispatchToProps)(AddNewProductCatalogPopup);