import React from "react"
import { connect } from "react-redux"

import { Modal, FormGroup } from "semantic-ui-react"

import { closeAddPopup, postNewWarehouseRequest } from "../../actions"
import { Form, Input, Button } from "formik-semantic-ui"
import * as Yup from "yup"

const initialFormValues = {
  warehouseName: "",
  contactName: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  phone: "",
  email: ""
}
const formValidation = Yup.object().shape({
  warehouseName: Yup.string()
    .min(3, "Too short")
    .required("Required"),
  contactName: Yup.string()
    .min(3, "Too short")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
})

class AddNewWarehousePopup extends React.Component {
  render() {
    const { closeAddPopup, postNewWarehouseRequest } = this.props

    return (
      <Modal open centered={false}>
        <Modal.Header>Add warehouse</Modal.Header>
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
              <Input type="text" label="Warehouse name" name="warehouseName" />
              <Input type="text" label="Contact Name" name="contactName" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Address" name="address" />
              <Input type="text" label="City" name="city" />
              <Input type="text" label="State" name="state" />
              <Input type="text" label="Zipcode" name="zipCode" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Phone" name="phone" />
              <Input type="text" label="Email" name="email" />
            </FormGroup>

            <div style={{ textAlign: "right" }}>
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

export default connect(
  null,
  mapDispatchToProps
)(AddNewWarehousePopup)
