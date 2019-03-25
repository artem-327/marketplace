import React from 'react'
import { connect } from 'react-redux'
import { Control, Form } from 'react-redux-form'

import { Modal, Button, FormField, Header, Segment, FormGroup, Form as SForm } from 'semantic-ui-react'

import { handleAddNewWarehousePopup, postNewWarehouseRequest } from '../../actions'

class EditWarehousePopup extends React.Component {

  render() {
    const {
      handleAddNewWarehousePopup,
      postNewWarehouseRequest
    } = this.props

    return (
      <Segment padded="very" basic style={{width: '80%', margin: 'auto'}}>
        <Header>Add new warehouse</Header>
          <Form
            model="forms.settingsPopup.addNewWarehouse"
            onSubmit={(value) => postNewWarehouseRequest(value)}
            component={SForm}
          >
            <FormGroup widths="equal">
              <FormField label="Warehouse name" control={Control.text} model=".warehouseName" defaultValue={''}/>
              <FormField label="Contact Name" control={Control.text} model=".contactName" defaultValue={''} />
            </FormGroup>
            <FormGroup widths="equal">
              <FormField label="Address" control={Control.text} model=".address" defaultValue={''} />
              <FormField label="City" control={Control.text} model=".city" defaultValue={''} />
              <FormField label="State" control={Control.text} model=".state" defaultValue={''} />
              <FormField label="Zipcode" control={Control.text} model=".zipCode" defaultValue={''} />
            </FormGroup>
            <FormGroup widths="equal">
              <FormField label="Phone" control={Control.text} model=".phone" defaultValue={''} />
              <FormField label="e-mail" control={Control.text} model=".email" defaultValue={''} />
            </FormGroup>
          </Form>
        
          <div>
            <Button floated="right" onClick={handleAddNewWarehousePopup}>Cancel</Button>
            <Button floated="right" primary>Save</Button>
          </div>
      </Segment>
    )
  }
}

const mapDispatchToProps = {
  handleAddNewWarehousePopup,
  postNewWarehouseRequest
}

export default connect(null, mapDispatchToProps)(EditWarehousePopup) 