import React from "react"
import { connect } from "react-redux"

import { Modal, FormGroup } from "semantic-ui-react"

import { closeAddPopup, postNewUserRequest } from "../../actions"
import { Form, Input, Button } from "formik-semantic-ui"
import * as Yup from "yup"

const initialFormValues = {
  firstName: "",
  lastName: "",
  middleName: "",
  email: ""
}
const formValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Too short")
    .required("Required"),
  lastName: Yup.string()
    .min(3, "Too short")
    .required("Required"),
  middleName: Yup.string()
    .min(3, "Too short")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Emails is required")
})

class AddNewUsersPopup extends React.Component {
  render() {
    const { closeAddPopup, postNewUserRequest } = this.props

    return (
      <Modal open centered={false}>
        <Modal.Header>Add user</Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={closeAddPopup}
            onSubmit={(values, actions) => {
              postNewUserRequest(values)
              actions.setSubmitting(false)
            }}
          >
            <FormGroup widths="equal">
              <Input type="text" label="First name" name="firstName" />
              <Input type="text" label="Last Name" name="lastName" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Middle Name" name="middleName" />
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
  postNewUserRequest
}

export default connect(
  null,
  mapDispatchToProps
)(AddNewUsersPopup)
