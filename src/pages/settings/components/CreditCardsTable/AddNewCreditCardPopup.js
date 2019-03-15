import React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';

// import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';

import { handleAddNewWarehousePopup, postNewCreditCardRequest } from '../../actions';

class EditWarehousePopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardNumber: '',
      cvc: '',
      expirationMonth: '',
      expirationYear: ''
    }
  }

  render() {
    const { 
      cardNumber,
      cvc,
      expirationMonth,
      expirationYear
    } = this.state
    const { 
      handleAddNewWarehousePopup,  
      postNewCreditCardRequest 
    } = this.props;

    return (					
      <div className="popup-wrapper col-xs-10 center-xs">      
        <Form 
          model="forms.settingsPopup.addNewCreditCard" 
          onSubmit={ (value) => postNewCreditCardRequest(value) }
          className="b-popup col-xs-10"
        >    
          <h2>{'Credit Card'} Profile</h2>
          <ul>
            <li className="add-warehouse-inputs-wrapper">
              <label className="settings-popup-label name" htmlFor="warehouse-name">                        
                Card Number
              <Control.text model=".cardNumber" className="popup-input" id="warehouse-name" defaultValue={ cardNumber } />
              </label>
              <label className="settings-popup-label address" htmlFor="warehouse-address">
                CVC
                <Control.text model=".cvc" className="popup-input" id="warehouse-address" defaultValue={ cvc } />
              </label>   
            </li>
            <li className="add-warehouse-inputs-wrapper">
              <label className="settings-popup-label city" htmlFor="warehouse-city">
                Expiration Month
                <Control.text model=".expirationMonth" className="popup-input" id="warehouse-city" defaultValue={ expirationMonth } />
              </label>            
              <label className="settings-popup-label state" htmlFor="warehouse-state">  
                Expiration Year
                <Control.text model=".expirationYear" className="popup-input" id="warehouse-state" defaultValue={ expirationYear } />               
              </label>    
            </li>
            <li className="add-new-handlers">             
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
  postNewCreditCardRequest
};

export default connect(null, mapDispatchToProps)(EditWarehousePopup);