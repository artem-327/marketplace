import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import { Form, Input, Button } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import { FormattedMessage, injectIntl } from 'react-intl'

import { changePassword, closeChangePasswordPopup } from '../actions'
import { errorMessages, passwordValidation } from '~/constants/yupValidation'

const initialFormValues = {
  oldPassword: '',
  newPassword: '',
  newPasswordRetype: ''
}

const formValidation = () =>
  Yup.lazy(values =>
    Yup.object().shape({
      oldPassword: Yup.string()
        .trim()
        .min(3, errorMessages.minLength(3))
        .required(errorMessages.requiredMessage),
      newPassword: passwordValidation(),
      newPasswordRetype: Yup.string(errorMessages.passwordsMustMatch).oneOf(
        [values.newPassword],
        errorMessages.passwordsMustMatch
      )
    })
  )

class ChangePassword extends Component {
  render() {
    const {
      closeChangePasswordPopup,
      intl: { formatMessage }
    } = this.props

    return (
      <Modal closeIcon onClose={() => closeChangePasswordPopup()} open centered={false} size='small'>
        <Modal.Header>
          <FormattedMessage id='password.change' defaultMessage='Change Password' />
        </Modal.Header>
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
            data-test='profile_change_password_inp'>
            <Input
              inputProps={{ type: 'password' }}
              type='text'
              label={formatMessage({ id: 'password.current', defaultMessage: 'Current Password' })}
              name='oldPassword'
            />
            <Input
              inputProps={{ type: 'password' }}
              type='text'
              label={formatMessage({ id: 'password.new', defaultMessage: 'New Password' })}
              name='newPassword'
            />
            <Input
              inputProps={{ type: 'password' }}
              type='text'
              label={formatMessage({ id: 'password.retype', defaultMessage: 'Re-type Password' })}
              name='newPasswordRetype'
            />

            <div style={{ textAlign: 'right' }}>
              <Button.Reset data-test='profile_change_password_reset_btn'>
                <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
              </Button.Reset>
              <Button.Submit data-test='profile_change_password_submit_btn'>
                <FormattedMessage id='global.save' defaultMessage='Save' />
              </Button.Submit>
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

export default injectIntl(connect(null, mapDispatchToProps)(ChangePassword))
