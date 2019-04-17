import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import {
  closePopup,
  closeRolesPopup,
  handlerSubmitUserEditPopup,
  postNewUserRequest
} from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui'
import * as Yup from 'yup'

const formValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Too short')
    .required('Required'),
  lastName: Yup.string()
    .min(3, 'Too short')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Emails is required')
})

class UsersPopup extends React.Component {
  submitHandler = (values, actions) => {
    console.log('values', values)
    if (this.props.popupValues) {
      this.props.handlerSubmitUserEditPopup(values, this.props.popupValues.id)
    } else {
      this.props.postNewUserRequest(values)
    }
    actions.setSubmitting(false)
  }

  render() {
    const {
      closePopup,
      popupValues,
      branchesAll,
      userEditRoles,
      closeRolesPopup
    } = this.props

    const [firstName, lastName] =
      popupValues && popupValues.userName
        ? popupValues.userName.split(' ')
        : ['', '']
    const {
      middleName = '',
      email = '',
      homeBranchId = '',
      preferredCurrency = ''
    } = popupValues || {}
    const initialFormValues = {
      firstName,
      lastName,
      middleName,
      email,
      homeBranchId,
      preferredCurrency
    }
    // console.log('branchesAll', initialFormValues)
    const title = popupValues ? 'Edit' : 'Add'

    return (
      <Modal open centered={false}>
        <Modal.Header>{`${title} `} User</Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={userEditRoles ? closeRolesPopup : closePopup}
            onSubmit={this.submitHandler}
          >
            {userEditRoles ? (
              <Form.Checkbox label="I agree to the Terms and Conditions" />
            ) : (
              <div>
                <FormGroup widths="equal">
                  <Input type="text" label="First Name" name="firstName" />
                  <Input type="text" label="Last Name" name="lastName" />
                </FormGroup>
                <FormGroup widths="equal">
                  <Input type="text" label="Middle Name" name="middleName" />
                  <Input type="text" label="Email" name="email" />
                </FormGroup>
                <FormGroup widths="equal">
                  <Dropdown
                    label="Home Branches"
                    name="homeBranchId"
                    options={branchesAll}
                  />
                </FormGroup>
              </div>
            )}
            <div style={{ textAlign: 'right' }}>
              <Button.Reset
                onClick={userEditRoles ? closeRolesPopup : closePopup}
              >
                Cancel
              </Button.Reset>
              <Button.Submit>Save</Button.Submit>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  postNewUserRequest,
  closePopup,
  closeRolesPopup,
  handlerSubmitUserEditPopup
}

// const mapStateToProps = ({ settings: { popupValues } }) => ({ popupValues })
const mapStateToProps = state => {
  return {
    popupValues: state.settings.popupValues,
    branchesAll: state.settings.branchesAll,
    roles: state.settings.roles,
    userEditRoles: state.settings.userEditRoles
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPopup)
