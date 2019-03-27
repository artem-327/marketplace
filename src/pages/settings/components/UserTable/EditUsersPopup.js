import React from 'react' 
import { connect } from 'react-redux' 
import { Control, Form } from 'react-redux-form' 

import { handleEditPopup, handlerSubmitUserEditPopup } from '../../actions' 

function editPopupBoolean(props) { 

  const [firstName, lastName] = props.popupValues.userName ? props.popupValues.userName.split(' ') : ['',''];
  const { popupValues, handleEditPopup } = props;
  console.log(firstName, lastName, '1111111')
  console.log(popupValues, 'props.popupValue')

  return (					
    <div className="popup-wrapper col-xs-10 center-xs">      
      <Form 
        model="forms.settingsPopup.editUser" 
        onSubmit={ value => props.handlerSubmitUserEditPopup(value, popupValues.id) }
        className="b-popup col-xs-8"
      >    
        <h2>{'Warehouse'} Profile</h2>
        <ul className="">
          <li className="inputs-wrapper">
            <label className="settings-popup-label name" htmlFor="warehouse-name">                        
              First Name
              <Control.text model=".firstName" className="popup-input" id="warehouse-name" defaultValue={ firstName } />
            </label>            
            <label className="settings-popup-label contact-name" htmlFor="warehouse-contactName">
              Last Name
              <Control.text model=".lastName" className="popup-input" id="warehouse-contactName" defaultValue={ lastName } />
            </label>             
          </li>
          <li className="inputs-wrapper">
            <label className="settings-popup-label email" htmlFor="warehouse-email">  
              E-mail
              <Control.text model=".email" className="popup-input" id="warehouse-email" defaultValue={ popupValues.email } />
            </label>
             <label className="settings-popup-label email" htmlFor="warehouse-email">  
              Middlename
              <Control.text model=".middleName" className="popup-input" id="warehouse-email" defaultValue={ popupValues.middleName } />
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
  ) 
}

const mapDispatchToProps = {   
  handleEditPopup,
  handlerSubmitUserEditPopup
} 

const mapStateToProps = state => {
  return {
		popupValues: state.settings.popupValues
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(editPopupBoolean) 