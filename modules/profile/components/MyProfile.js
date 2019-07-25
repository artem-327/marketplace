import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup, Divider, ButtonToolbar, Label } from 'semantic-ui-react'
import { Form, Input, Button, Dropdown } from "formik-semantic-ui";
import * as Yup from "yup"


import { getSafe } from '~/utils/functions'

import { FormattedDateTime } from '~/components/formatted-messages/'

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
    .min(3, "Too short")
    .required("Name is required"),
  phone: Yup.string().trim()
    .min(3, "Too short")
    .matches(
      /([0-9\(\)\-\+\s])/
      , 'Please, enter valid phone number (numbers and \'+-()\' characters can be used)')
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
      popupValues
    } = this.props

    return (
      <Modal open centered={false} size="small">
        <Modal.Header>My Profile</Modal.Header>
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
          >
            <Input type="text" label="E-mail" name="email" inputProps={{ readOnly: true }} />
            <Input type="text" label="Name" name="name" />

            <Input type="text" label="Phone" name="phone" />
            <Input type="text" label="Title" name="jobTitle" inputProps={{ readOnly: true }} />
            <Dropdown label="Currency" name="preferredCurrency" options={currencies} />

            Last login at: {popupValues && popupValues.lastLoginAt}

            <div style={{ textAlign: 'right' }}>
              <Button style={{ "margin-bottom": '10px' }} onClick={this.handleChangePassword} >Change Password</Button>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Button.Reset>Cancel</Button.Reset>
              <Button.Submit>Save</Button.Submit>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)