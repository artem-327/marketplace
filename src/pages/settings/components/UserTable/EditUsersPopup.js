import React from 'react' 
import { connect } from 'react-redux' 
import { Control, Form } from 'react-redux-form' 
import { Modal, Button, FormField, FormGroup, Form as SForm } from 'semantic-ui-react'

import { closeAddPopup, handlerSubmitUserEditPopup } from '../../actions' 

function EditPopupBoolean(props) { 

  const [firstName, lastName] = props.popupValues.userName ? props.popupValues.userName.split(' ') : ['',''];
  const { popupValues, handleEditPopup, closeAddPopup, handlerSubmitUserEditPopup } = props;
  console.log(firstName, lastName, '1111111')
  console.log(popupValues, 'props.popupValue')

  return (	
    <Modal open centered={false}>
        <Modal.Header>Edit user profile</Modal.Header>
        <Modal.Content>
          <Form
            model="forms.settingsPopup.editUser"
            onSubmit={value => handlerSubmitUserEditPopup(value, popupValues.id)}
            component={SForm}
          >
            <FormGroup widths="equal">
              <FormField label="First Name" control={Control.text} model=".firstName" defaultValue={firstName} />
              <FormField label="Last Name" control={Control.text} model=".lastName" defaultValue={lastName} />
            </FormGroup>
            <FormGroup widths="equal">
            <FormField label="E-mail" control={Control.text} model=".email" defaultValue={popupValues.email} />
              <FormField label="Middlename" control={Control.text} model=".middleName" defaultValue={popupValues.middleName} />
            </FormGroup>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeAddPopup}>Cancel</Button>
          <Button primary>Save</Button>
        </Modal.Actions>
      </Modal>
  ) 
}

const mapDispatchToProps = {   
  // handleEditPopup,
  closeAddPopup,
  handlerSubmitUserEditPopup
} 

const mapStateToProps = state => {
  return {
		popupValues: state.settings.popupValues
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPopupBoolean) 