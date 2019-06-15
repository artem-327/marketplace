import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup, Divider } from 'semantic-ui-react'
import { Form, Input, Button, Dropdown } from "formik-semantic-ui";


import {
  closePopup,
  getUserMeData,
  getCurrencies,
  //updateDeliveryAddresses,
} from '../actions'

const initialFormValues = {
  'name':    '',
  'email':        '',
  'phone':  '',
  'jobTitle':  '',
  'preferredCurrency':  '',
}

class Profile extends Component {

  componentDidMount() {
    this.props.getUserMeData()
    this.props.getCurrencies()
  }


  render() {
    const {
      closePopup,
      currencies,
      popupValues
    } = this.props

    return (
      <Modal open centered={false} size="small">
        <Modal.Header>User Profile</Modal.Header>
        <Modal.Content>
          <Form
            enableReinitialize
            initialValues={popupValues ? popupValues : initialFormValues}
            onReset={closePopup}
            onSubmit={async (values, actions) => {
              console.log('!!!!!!!!!!! Profile', values)
              // delete email field, delete empty fields

              actions.setSubmitting(false)
            }}
          >
            <Input type="text" label="E-mail" name="email" inputProps={{readOnly: true}} />
            <Input type="text" label="Name" name="name" />

            <Input type="text" label="Phone" name="phone" />
            <Input type="text" label="Title" name="jobTitle" />
            <Dropdown label="Currency" name="preferredCurrency" options={currencies} />


            <div style={{ textAlign: 'right' }}>
              <Button>Change Password</Button>
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
  getCurrencies
}

const mapStateToProps = state => {
  const popupValues = state.profile.usersMe
  return {
    popupValues: popupValues ? {
      email: popupValues.email,
      name: popupValues.name,
      phone: popupValues.phone,
      jobTitle: popupValues.jobTitle,
      preferredCurrency: popupValues.preferredCurrency.id
    } : null,
    currencies: state.profile.currency && state.profile.currency.map(d => {
      return {
        id: d.id,
        text: d.code,
        value: d.id
      }}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)