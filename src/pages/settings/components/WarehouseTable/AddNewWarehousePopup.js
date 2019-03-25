import React from 'react'
import { connect } from 'react-redux'
import { Control, Form } from 'react-redux-form'

import { Modal, Button } from 'semantic-ui-react'

import { handleAddNewWarehousePopup, postNewWarehouseRequest } from '../../actions'

class EditWarehousePopup extends React.Component {

  render() {
    const {
      handleAddNewWarehousePopup,
      postNewWarehouseRequest
    } = this.props

    return (
      <Modal open={true}>
        <Modal.Header>Add new warehouse</Modal.Header>
        <Modal.Content>
          <div className="popup-wrapper col-xs-10 center-xs">
            <Form
              model="forms.settingsPopup.addNewWarehouse"
              onSubmit={(value) => postNewWarehouseRequest(value)}
              className="b-popup col-xs-10"
            >
              <h2>{'Warehouse'} Profile</h2>
              <ul>
                <li className="add-warehouse-inputs-wrapper">
                  <label className="settings-popup-label name" htmlFor="warehouse-name">
                    Warehouse name
              <Control.text model=".warehouseName" className="popup-input" id="warehouse-name" defaultValue={''} />
                  </label>
                  <label className="settings-popup-label address" htmlFor="warehouse-address">
                    Address
                <Control.text model=".address" className="popup-input" id="warehouse-address" defaultValue={''} />
                  </label>
                  <label className="settings-popup-label city" htmlFor="warehouse-city">
                    City
                <Control.text model=".city" className="popup-input" id="warehouse-city" defaultValue={''} />
                  </label>
                  <label className="settings-popup-label state" htmlFor="warehouse-state">
                    State
                <Control.text model=".state" className="popup-input" id="warehouse-state" defaultValue={''} />
                    {/* <TextField
                  select
                  className="b-search__select-field col-xs-3"
                  onChange={ handleChangeFieldsCurrentValue('filterFieldCurrentValue') }
                  variant="outlined"
                  onClick={ (e) => { 
                      if(e.target.value === undefined) return 
                      return 123 
                    } 
                  }
                > 
                  {unitedStates.map(option => (
                    <MenuItem 
                      key={ option.name }  
                      value={ option.name }
                    >
                      { option.name }
                    </MenuItem>
                  ))}
                </TextField>  */}
                  </label>
                  <label className="settings-popup-label zip-code" htmlFor="warehouse-zip-code">
                    Zip Code
                <Control.text model=".zipCode" className="popup-input" id="warehouse-zip-code" defaultValue={''} />
                  </label>
                </li>
                <li className="add-warehouse-inputs-wrapper">
                  <label className="settings-popup-label contact-name" htmlFor="warehouse-contactName">
                    Contact name
                <Control.text model=".contactName" className="popup-input" id="warehouse-contactName" defaultValue={''} />
                  </label>
                  <label className="settings-popup-label phone" htmlFor="warehouse-phone">
                    Phone number
                <Control.text model=".phone" className="popup-input" id="warehouse-phone" defaultValue={''} />
                  </label>
                  <label className="settings-popup-label email" htmlFor="warehouse-email">
                    E-mail
                <Control.text model=".email" className="popup-input" id="warehouse-email" defaultValue={''} />
                  </label>
                  <div className="buttons-wrapper">
                    <input
                      type="button"
                      defaultValue="Cancel"
                      onClick={handleAddNewWarehousePopup}
                      className="cancel-popup-btn"
                    />
                    <button className="save-btn">Save</button>
                  </div>
                </li>
              </ul>
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleAddNewWarehousePopup}>Cancel</Button>
          <Button primary>Save</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  handleAddNewWarehousePopup,
  postNewWarehouseRequest
}

export default connect(null, mapDispatchToProps)(EditWarehousePopup) 