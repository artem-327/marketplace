import React from 'react' 
import { connect } from 'react-redux' 
import { Control, Form } from 'react-redux-form' 
import { Modal, Button, FormField, FormGroup, Form as SForm } from 'semantic-ui-react'

import { closeEditPopup, handleSubmitEditPopup } from '../../actions' 

function EditWarehousePopup(props) {
  const { closeEditPopup, handleSubmitEditPopup, popupValues } = props 
  const [ address, city ]  = popupValues.address.split(',')  

  return (	
    <Modal open centered={false}>
        <Modal.Header>Add new warehouse</Modal.Header>
        <Modal.Content>
          <Form
            model="forms.settingsPopup.editWarehouse"
            onSubmit={(value) => handleSubmitEditPopup(value, popupValues.branchId)}
            component={SForm}
          >
            <FormGroup widths="equal">
              <FormField label="Warehouse name" control={Control.text} model=".warehouseName" defaultValue={popupValues.warehouseName} />
              <FormField label="Contact Name" control={Control.text} model=".contactName" defaultValue={popupValues.contactName} />
            </FormGroup>
            <FormGroup widths="equal">
              <FormField label="Address" control={Control.text} model=".address" defaultValue={address} />
              <FormField label="City" control={Control.text} model=".city" defaultValue={city} />
            </FormGroup>
            <FormGroup widths="equal">
              <FormField label="Phone" control={Control.text} model=".phone" defaultValue={popupValues.phone} />
              <FormField label="e-mail" control={Control.text} model=".email" defaultValue={popupValues.email} />
            </FormGroup>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeEditPopup}>Cancel</Button>
          <Button primary>Update Warehouse</Button>
        </Modal.Actions>
      </Modal>
  ) 
}

const mapDispatchToProps = {   
  closeEditPopup,
  handleSubmitEditPopup
} 

const mapStateToProps = state => {
  return {
		popupValues: state.settings.popupValues
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditWarehousePopup) 