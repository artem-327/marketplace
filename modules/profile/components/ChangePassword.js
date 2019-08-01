import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup, Divider, ButtonToolbar } from 'semantic-ui-react'
import { Form, Input, Button, Dropdown } from "formik-semantic-ui";
import * as Yup from "yup"

import {
  changePassword,
  closeChangePasswordPopup
} from '../actions'

const initialFormValues = {
  'oldPassword':        '',
  'newPassword':        '',
  'newPasswordRetype':  ''
}

const formValidation = () => Yup.object().shape({
  oldPassword: Yup.string().trim()
    .min(3, "Too short")
    .required("Current Password is required"),
  newPassword: Yup.string().trim()
    .min(8, "Too short")
    .required("New Password is required")
    .matches(/[a-z]/, 'at least one lowercase char')
    .matches(/[A-Z]/, 'at least one uppercase char')
    .matches(/[^a-zA-Z\s]+/, 'at least 1 number or special char (@,!,#, etc).'),
  newPasswordRetype: Yup.string().trim()
    .required("New Password is required")
    .test('Passwords match', 'Passwords must match', function(value) {
      return this.parent.newPassword === value;
    })
})

class ChangePassword extends Component {

  render() {
    const {
      closeChangePasswordPopup
    } = this.props

    return (
      <Modal open centered={false} size="small">
        <Modal.Header>Change Password</Modal.Header>
        <Modal.Content>
          <Form
            enableReinitialize
            initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={closeChangePasswordPopup}
            onSubmit={async (values, actions) => {
              delete values['newPasswordRetype']
              this.props.changePassword(values)
              actions.setSubmitting(false)
            }}
            data-test='profile_change_password_inp'
          >
            <Input type="text" label="Current Password" name="oldPassword" />
            <Input type="text" label="New Password" name="newPassword" />
            <Input type="text" label="Re-type Password" name="newPasswordRetype" />

            <div style={{ textAlign: 'right' }}>
              <Button.Reset data-test='profile_change_password_reset_btn'>Cancel</Button.Reset>
              <Button.Submit data-test='profile_change_password_submit_btn'>Save</Button.Submit>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  changePassword,
  closeChangePasswordPopup
}

export default connect(null, mapDispatchToProps)(ChangePassword)