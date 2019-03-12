import React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';

// import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';

import { handleAddNewWarehousePopup, postNewBankAccountRequest } from '../../actions';

class EditWarehousePopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accountHolderName: '',
      accountHolderType: '',
      accountNumber: '',
      country: '',
      currency: '',
      routingNumber: ''
    }
  }

  render() {
    const { 
      accountHolderName,
      accountHolderType,
      accountNumber,
      country,
      currency,
      routingNumber 
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
            <li className="add-warehouse-inputs-wrapper">
              <label className="warehouse-label name" htmlFor="warehouse-name">                        
                Account Holder Name
              <Control.text model=".accountHolderName" className="warehouse-input" id="warehouse-name" defaultValue={ accountHolderName } />
              </label>
              <label className="warehouse-label address" htmlFor="warehouse-address">
                Account Holder Type
                <Control.text model=".accountHolderType" className="warehouse-input" id="warehouse-address" defaultValue={ accountHolderType } />
              </label>
              <label className="warehouse-label city" htmlFor="warehouse-city">
                Account Number
                <Control.text model=".accountNumber" className="warehouse-input" id="warehouse-city" defaultValue={ accountNumber } />
              </label>            
            </li>
            <li className="add-warehouse-inputs-wrapper">
              <label className="warehouse-label state" htmlFor="warehouse-state">  
                Country
                <Control.text model=".country" className="warehouse-input" id="warehouse-state" defaultValue={ country } />               
              </label>            
              <label className="warehouse-label zip-code" htmlFor="warehouse-zip-code">
                Currency
                <Control.text model=".currency" className="warehouse-input" id="warehouse-zip-code" defaultValue={ currency } />
              </label>
              <label className="warehouse-label contact-name" htmlFor="warehouse-contactName">
                Routing Number
                <Control.text model=".routingNumber" className="warehouse-input" id="warehouse-contactName" defaultValue={ routingNumber } />
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

export default connect(null, mapDispatchToProps)(EditWarehousePopup);