import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import { closeAddPopup, handlerSubmitUserEditPopup } from '../../actions'
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

class AddNewUsersPopup extends React.Component {
  render() {
    const {
      closeAddPopup,
      handlerSubmitUserEditPopup,
      popupValues
    } = this.props
    const [firstName, lastName] = popupValues.userName
      ? popupValues.userName.split(' ')
      : ['', '']
    const { middleName, email, id } = popupValues
    const initialFormValues = { firstName, lastName, middleName, email }

    return (
      <Modal open centered={false}>
        <Modal.Header>Edit user</Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={closeAddPopup}
            onSubmit={(values, actions) => {
              handlerSubmitUserEditPopup(values, id)
              actions.setSubmitting(false)
            }}
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
  handlerSubmitUserEditPopup
}
const mapStateToProps = state => {
  return {
    popupValues: state.settings.popupValues
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewUsersPopup)
