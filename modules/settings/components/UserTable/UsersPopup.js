import React from "react"
import { connect } from "react-redux"

import { Modal, FormGroup, Item } from "semantic-ui-react"

import {
  closePopup,
  closeRolesPopup,
  handlerSubmitUserEditPopup,
  postNewUserRequest,
  putNewUserRoleRequest
} from "../../actions"
import { Form, Input, Button, Dropdown, Checkbox } from "formik-semantic-ui"
import * as Yup from "yup"

const formValidationNew = Yup.object().shape({
  name: Yup.string().trim()
    .min(3, "Too short")
    .required("Name is required"),
  email: Yup.string().trim()
    .email("Invalid email")
    .required("Emails is required"),
  homeBranchId: Yup.number()
    .required('Home Branch is required'),
  password: Yup.string().trim()
    .min(3, "Too short")
    .required("Password is required"),
  title: Yup.string().trim()
    .min(3, "Too short"),
  phone: Yup.string().trim()
    .min(3, "Too short"),
})

const formValidationEdit = Yup.object().shape({
  name: Yup.string().trim()
    .min(3, "Too short")
    .required("Name is required"),
  email: Yup.string().trim()
    .email("Invalid email")
    .required("Emails is required"),
  homeBranchId: Yup.number()
    .required('Home Branch is required'),
  /*title: Yup.string().trim()
    .min(3, "Too short"),
  phone: Yup.string().trim()
    .min(3, "Too short"),
    */
})

class UsersPopup extends React.Component {
  submitHandler = (values, actions) => {
    console.log('!!!!!!!!!! new user 1');
    if (this.props.userEditRoles) {
      this.props.putNewUserRoleRequest(
        this.addNewRole(values),
        this.props.popupValues.id
      )
      return
    }
    if (this.props.popupValues) {
      this.props.handlerSubmitUserEditPopup(values, this.props.popupValues.id)
    } else {
      this.props.postNewUserRequest(values)
    }
    actions.setSubmitting(false)
  }

  addNewRole(values) {
    const newRoles = []
    for (let key in values) {
      const id = Number(key.split("checkBoxId_")[1])
      if (values[`checkBoxId_${id}`]) {
        id && newRoles.push(id)
      }
    }

    return newRoles
  }

  render() {
    const {
      closePopup,
      popupValues,
      branchesAll,
      userEditRoles,
      closeRolesPopup,
      roles,
      userRoles
    } = this.props

    const {
      name = "",
      email = "",
      homeBranchId = "",
      preferredCurrency = "",
      title = "",
      phone = "",
      password = ""
    } = popupValues || {}

    const initialFormValues = {
      name,
      email,
      homeBranchId,
      preferredCurrency,
      title,
      phone,
      password
    }
    // this.props.roles.forEach(item => {
    //   let flag = this.props.popupValues.allUserRoles.some(
    //     role => role.id === item.id
    //   )
    //   initialFormValues[`checkBoxId_${item.id}`] = flag
    // })

    return (
      <Modal open centered={false} size={userEditRoles ? "mini" : null}>
        <Modal.Header>
          {(popupValues ? "Edit" : "Add") + (userEditRoles ? " Role" : " User")}
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={popupValues ? formValidationEdit : formValidationNew}
            onReset={userEditRoles ? closeRolesPopup : closePopup}
            onSubmit={this.submitHandler}
          >
            {userEditRoles ? (
              roles.map((role, i) => (
                <FormGroup key={i}>
                  <Checkbox
                      label={role.name}
                      name={`checkBoxId_${role.id}`}
                      inputProps={{defaultChecked: userRoles.includes(role.id)}}
                  />
                </FormGroup>
              ))
            ) : (
              <>
                <FormGroup widths="equal">
                  <Input type="text" label="Name" name="name" />
                  <Input type="text" label="Email" name="email" />
                </FormGroup>
                {!popupValues ? (
                <FormGroup widths="equal">
                  <Input type="text" label="Job Title" name="title" />
                  <Input type="text" label="Phone" name="phone" />
                </FormGroup>) : null }
                <FormGroup widths="equal">
                  <Dropdown
                    label="Home Branches"
                    name="homeBranchId"
                    options={branchesAll}
                  />
                  {!popupValues ? (<Input type="text" label="Password" name="password" />) : null}
                </FormGroup>
              </>
            )}
            <div style={{ textAlign: "right" }}>
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
  putNewUserRoleRequest,
  closePopup,
  closeRolesPopup,
  handlerSubmitUserEditPopup
}

const mapStateToProps = state => {
  console.warn(state.settings)
  return {
    popupValues: state.settings.popupValues,
    userRoles: state.settings.popupValues && state.settings.popupValues.allUserRoles.map(r => (
        r.id
    )),
    branchesAll: state.settings.branchesAll,
    roles: state.settings.roles,
    userEditRoles: state.settings.userEditRoles
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPopup)
