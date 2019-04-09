import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import { closeAddPopup, postNewWarehouseRequest } from '../../actions'
import { Form, Input, Button } from 'formik-semantic-ui'
import * as Yup from 'yup'


const initialFormValues = {
  warehouseName: '',
  contactName: '',
  address: '',
  city: '',
  country: '',
  state: '',
  zipCode: '',
  phone: '',
  email: ''
}
const formValidation = Yup.object().shape({
  warehouseName: Yup.string()
      .min(3, "Too short")
      .required("Required"),
  address: Yup.string()
      .min(3, "Too short")
      .required("Required"),
  city: Yup.string()
      .min(3, "Too short")
      .required("Required"),
  country: Yup.string()
      .min(3, "Too short")
      .required("Required"),
  zipCode: Yup.string()
      .min(3, "Too short")
      .required("Required"),
  phone: Yup.string()
      .min(3, "Too short")
      .required("Required"),
})

class AddNewWarehousePopup extends React.Component {
  render() {
    const {
      closeAddPopup,
      postNewWarehouseRequest
    } = this.props

    return (
      <Modal open centered={false}>
        <Modal.Header>Add Warehouse</Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={closeAddPopup}
            onSubmit={(values, actions) => {
              postNewWarehouseRequest(values)
            }}
          >
            <FormGroup widths="equal">
              <Input type="text" label="Warehouse Name" name="warehouseName" />
              <Input type="text" label="Contact Name" name="contactName" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Address" name="address" />
              <Input type="text" label="City" name="city" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Country" name="country" />
              <Input type="text" label="State" name="state" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Zip Code" name="zipCode" />
              <Input type="text" label="Phone" name="phone" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Email" name="email" />
            </FormGroup>
            <div style={{ textAlign: 'right' }}>
              <Button.Reset>Cancel</Button.Reset>
              <Button.Submit>Save</Button.Submit>
            </div>
            
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closeAddPopup,
  postNewWarehouseRequest
}

export default connect(null, mapDispatchToProps)(AddNewWarehousePopup) 
