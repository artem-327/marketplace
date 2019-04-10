import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import {
  closePopup,
  handlerSubmitUserEditPopup,
  postNewUserRequest
} from '../../actions'
import { Form, Input, Button } from 'formik-semantic-ui'
import * as Yup from 'yup'

const formValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Too short')
    .required('Required'),
  lastName: Yup.string()
    .min(3, 'Too short')
    .required('Required'),
  middleName: Yup.string()
    .min(3, 'Too short')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Emails is required')
})

class UsersPopup extends React.Component {
  submitHandler = (values, actions) => {
    console.log(this.props.popupValues)
    if (this.props.popupValues) {
      this.props.handlerSubmitUserEditPopup(values, this.props.popupValues.id)
    } else {
      this.props.postNewUserRequest(values)
    }
    actions.setSubmitting(false)
  }

  render() {
    console.log(this.props)
    const { closePopup, popupValues } = this.props
    const [firstName, lastName] =
      popupValues && popupValues.userName
        ? popupValues.userName.split(' ')
        : ['', '']
    const { middleName = '', email = '' } = popupValues || {}
    const initialFormValues = { firstName, lastName, middleName, email }
    const title = popupValues ? 'Edit' : 'Add'

    return (
      <Modal open centered={false}>
        <Modal.Header>{`${title} `} User</Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={closePopup}
            onSubmit={this.submitHandler}
          >
            <FormGroup widths="equal">
              <Input type="text" label="First Name" name="firstName" />
              <Input type="text" label="Last Name" name="lastName" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Middle Name" name="middleName" />
              <Input type="text" label="Email" name="email" />
            </FormGroup>
            <div style={{ textAlign: 'right' }}>
              <Button.Reset onClick={closePopup}>Cancel</Button.Reset>
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
  handlerSubmitUserEditPopup
}

const mapStateToProps = ({ settings: { popupValues } }) => ({ popupValues })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPopup)
