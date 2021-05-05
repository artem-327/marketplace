import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import { Form, Input, Button } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'

import { changePassword, closeChangePasswordPopup } from '../actions'
import { initialFormValues, formValidation } from './constants/ChangePassword.constant'

const ChangePassword = props => {
  const {
    closeChangePasswordPopup,
    intl: { formatMessage }
  } = props

  return (
    <Modal closeIcon onClose={() => closeChangePasswordPopup()} open centered={false} size='small'>
      <Modal.Header>
        <FormattedMessage id='password.change' defaultMessage='Change Password' />
      </Modal.Header>
      <Modal.Content>
        <Form
          enableReinitialize
          initialValues={initialFormValues}
          validateOnChange={true}
          validationSchema={formValidation}
          onReset={closeChangePasswordPopup}
          onSubmit={async (values, actions) => {
            delete values['newPasswordRetype']
            props.changePassword(values)
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

ChangePassword.propTypes = {
  changePassword: PropTypes.func,
  closeChangePasswordPopup: PropTypes.func,
  intl: PropTypes.object
}

ChangePassword.defaultProps = {
  changePassword: () => {},
  closeChangePasswordPopup: () => {},
  intl: {}
}

const mapDispatchToProps = {
  changePassword,
  closeChangePasswordPopup
}

export default injectIntl(connect(null, mapDispatchToProps)(ChangePassword))
