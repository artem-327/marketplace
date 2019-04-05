import React from "react"
import { connect } from "react-redux"

import { Modal, FormGroup } from "semantic-ui-react"

import { closeAddPopup, handleSubmitEditPopup } from "../../actions"
import { Form, Input, Button } from "formik-semantic-ui"
import * as Yup from "yup"

const formValidation = Yup.object().shape({
  warehouseName: Yup.string()
    .min(3, "Too short")
    .required("Required"),
  contactName: Yup.string()
    .min(3, "Too short")
    .required("Required"),
  address: Yup.string()
    .min(3, "Too short")
    .required("Required"),
  city: Yup.string()
    .min(3, "Too short")
    .required("Required"),
  phone: Yup.string()
    .min(3, "Too short")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Emails is required")
})

class EditWarehousePopup extends React.Component {
  render() {
    const { closeAddPopup, handleSubmitEditPopup, popupValues } = this.props
    const [address, city] = popupValues.address.split(",")
    // const { middleName, email, id } = popupValues;
    const {
      warehouseName,
      contactName,
      phone,
      email,
      id: branchId
    } = popupValues
    const initialFormValues = {
      warehouseName,
      contactName,
      address,
      city,
      phone,
      email
    }

    console.log("Popup id", branchId)

    return (
      <Modal open centered={false}>
        <Modal.Header>Edit user profile</Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={closeAddPopup}
            onSubmit={(values, actions) => {
              handleSubmitEditPopup(values, branchId)
              actions.setSubmitting(false)
            }}
          >
            <FormGroup widths="equal">
              <Input type="text" label="Warehouse name" name="warehouseName" />
              <Input type="text" label="Contact Name" name="contactName" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Address" name="address" />
              <Input type="text" label="City" name="city" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Phone" name="phone" />
              <Input type="text" label="e-mail" name="email" />
            </FormGroup>
            <div style={{ textAlign: "right" }}>
              <Button.Reset onClick={closeAddPopup}>Cancel</Button.Reset>
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
  handleSubmitEditPopup
}
const mapStateToProps = state => {
  return {
    popupValues: state.settings.popupValues
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditWarehousePopup)
