import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup, Item } from 'semantic-ui-react'

import {
  closePopup,
  closeRolesPopup,
  handlerSubmitUserEditPopup,
  postNewUserRequest
} from '../../actions'
import { Form, Input, Button, Dropdown, Checkbox } from 'formik-semantic-ui'
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
    // console.log(
    //   'this.props.popupValues',
    //   Object.keys(values).reduce(
    //     (acm, item) => {
    //       if (item.includes('check-box-id')) {
    //         const [_, id, name] = item.split('_')
    //         acm.permissions.push({
    //           id,
    //           name
    //         })
    //       } else {
    //         acm[item] = values[item]
    //       }
    //       return acm
    //     },
    //     {
    //       permissions: []
    //     }
    //   )
    // )

    this.addNewRole(values)

    console.log('value', values)

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
      const id = key.split('check-box-id_')[1]
      if (id) {
        this.props.roles.forEach(role => {
          console.log('OOOO', role)
        })
      }
    }
  }

  render() {
    const {
      closePopup,
      popupValues,
      branchesAll,
      userEditRoles,
      closeRolesPopup,
      roles
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
    const title = popupValues ? 'Edit' : 'Add'

    return (
      <Modal open centered={false} size={userEditRoles ? 'mini' : null}>
        <Modal.Header>
          {title + (userEditRoles ? ' Role' : ' User')}
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={userEditRoles ? closeRolesPopup : closePopup}
            onSubmit={this.submitHandler}
          >
            {userEditRoles ? (
              roles.map((role, i) => (
                <FormGroup key={i}>
                  <Checkbox
                    label={role.name}
                    // name={`check-box-id_${role.id}_${role.name}`}
                    name={`check-box-id_${role.id}`}
                  />
                </FormGroup>
              ))
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
