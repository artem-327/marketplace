import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import { FormattedMessage, injectIntl } from 'react-intl'


import { getSafe } from '~/utils/functions'

import { FormattedDateTime } from '~/components/formatted-messages/'
import { errorMessages, phoneValidation } from '~/constants/yupValidation'

import {
  closePopup,
  getUserMeData,
  getCurrencies,
  updateMyProfile,
  openChangePasswordPopup
} from '../actions'



const initialFormValues = {
  'name': '',
  'email': '',
  'phone': '',
  'jobTitle': '',
  'preferredCurrency': '',
}

const formValidation = Yup.object().shape({
  name: Yup.string().trim()
    .min(3, errorMessages.minLength(3))
    .required(errorMessages.requiredMessage),
  phone: phoneValidation()
})

class MyProfile extends Component {

  componentDidMount() {
    this.props.getUserMeData()
    this.props.getCurrencies()
  }

  handleChangePassword = () => {
    this.props.openChangePasswordPopup()
  }

  render() {
    const {
      closePopup,
      currencies,
      popupValues,
      intl: { formatMessage }
    } = this.props

    return (
      <Modal open centered={false} size='small'>
        <Modal.Header><FormattedMessage id='profile.myProfile' defaultMessage='My Profile' /></Modal.Header>
        <Modal.Content>
          <Form
            enableReinitialize
            validationSchema={formValidation}
            initialValues={popupValues ? popupValues : initialFormValues}
            onReset={closePopup}
            onSubmit={async (values, actions) => {
              delete values['email']
              delete values['jobTitle']
              this.props.updateMyProfile(values)
              actions.setSubmitting(false)
            }}
            data-test='my_profile_userData_inp'
          >
            <Input
              type='text'
              label={formatMessage({ id: 'global.email', defaultMessage: 'E-mail' })}
              name='email' inputProps={{ readOnly: true }} />
            <Input
              type='text'
              label={formatMessage({ id: 'global.name', defaultMessage: 'Name' })}
              name='name' />
            <Input
              type='text'
              label={formatMessage({ id: 'global.phone', defaultMessage: 'Phone' })}
              name='phone' />
            <Input
              type='text'
              label={formatMessage({ id: 'global.title', defaultMessage: 'Title' })}
              name='jobTitle'
              inputProps={{ readOnly: true }} />
            <Dropdown
              label={formatMessage({ id: 'global.currency', defaultMessage: 'Currency' })}
              name='preferredCurrency'
              options={currencies}
              inputProps={{ 'data-test': 'my_profile_currency_drpdn' }} />

            <FormattedMessage id='profile.lastLoginAt' defaultMessage='Last login at:' /> {popupValues && popupValues.lastLoginAt}

            <div style={{ textAlign: 'right' }}>
              <Button style={{ 'margin-bottom': '10px' }} onClick={this.handleChangePassword} data-test='my_profile_change_password_btn'>
                <FormattedMessage id='password.change' defaultMessage='Change Password' />
              </Button>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Button.Reset data-test='my_profile_reset_btn'><FormattedMessage id='global.cancel' defaultMessage='Cancel' /></Button.Reset>
              <Button.Submit data-test='my_profile_submit_btn'><FormattedMessage id='global.save' defaultMessage='Save' /></Button.Submit>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closePopup,
  getUserMeData,
  getCurrencies,
  updateMyProfile,
  openChangePasswordPopup
}

const mapStateToProps = state => {
  const popupValues = state.profile.usersMe
  return {
    popupValues: popupValues ? {
      email: popupValues.email,
      name: popupValues.name,
      phone: popupValues.phone,
      jobTitle: popupValues.jobTitle,
      preferredCurrency: popupValues.preferredCurrency && popupValues.preferredCurrency.id,
      lastLoginAt: <FormattedDateTime dateTime={getSafe(() => state.auth.identity.lastLoginAt, null)} />
    } : null,
    currencies: state.profile.currency && state.profile.currency.map(d => {
      return {
        id: d.id,
        text: d.code,
        value: d.id
      }
    }),
    changePasswordPopup: state.profile.changePasswordPopup,
  }
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(MyProfile))