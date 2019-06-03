import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import {
  closePopup,
  handlerSubmitWarehouseEditPopup,
  postNewWarehouseRequest
} from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui'
import * as Yup from 'yup'
import Router from "next/router"

const formValidation = Yup.object().shape({
  name: Yup.string().trim()
    .min(3, 'Too short')
    .required('Required'),
  contactName: Yup.string().trim()
    .min(3, 'Too short')
    .required('Required'),
  phone: Yup.string().trim()
    .min(3, 'Too short')
    .required('Required'),
  city: Yup.string().trim()
    .min(3, 'Too short')
    .required('Required'),
  address: Yup.string().trim()
    .min(3, 'Too short')
    .required('Required'),
  email: Yup.string().trim()
    .min(3, 'Too short')
    .required('Required'),
  zip: Yup.string().trim()
    .min(1, 'Too short')
    .required('Required'),
  country: Yup.string().trim()
    .min(1, 'Too short')
    .required('Required')
})

class WarehousePopup extends React.Component {
  submitHandler = (values, actions) => {
    if (this.props.popupValues) {
      this.props.handlerSubmitWarehouseEditPopup(
        {
          ...values,
          tab: this.props.currentTab.type === 'branches' ? 'branches' : null
        },
        this.props.popupValues.branchId
      )
    } else {
      this.props.postNewWarehouseRequest({
        ...values,
        tab: this.props.currentTab.type === 'branches' ? 'branches' : null
      })
    }
    actions.setSubmitting(false)
  }

  getInitialFormValues = () => {
    const { popupValues } = this.props
    const [address, city] =
      popupValues && popupValues.address
        ? popupValues.address.split(',')
        : ['', '']
    const {
      name = '',
      contactName = '',
      countryId = '',
      phone = '',
      email = '',
      zip = ''
    } = popupValues || {}

    return {
      name,
      contactName,
      address,
      city,
      zip,
      phone,
      email,
      country: countryId,
      zip
    }
  }

  render() {
    const { closePopup, popupValues, country, currentTab } = this.props
    const title = popupValues ? 'Edit ' : 'Add'

    const name = currentTab.type === 'branches' ? 'Branch Name' : 'Warehouse Name'
    const modalTitle = currentTab.type === 'branches' ? 'Branch' : 'Warehouse'

    return (
      <Modal open centered={false}>
        <Modal.Header>
          {`${title} `} {modalTitle}
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={this.getInitialFormValues()}
            validationSchema={formValidation}
            onReset={closePopup}
            onSubmit={this.submitHandler}
          >
            <FormGroup widths="equal">
              <Input type="text" label={name} name="name" />
              <Input type="text" label="Contact Name" name="contactName" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Street Address" name="address" />
              <Input type="text" label="City" name="city" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Zip" name="zip" />
              <Input type="text" label="Phone" name="phone" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Email" name="email" />
              <Dropdown label="Country" name="country" options={country} />
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
  postNewWarehouseRequest,
  handlerSubmitWarehouseEditPopup,
  closePopup
}
const mapStateToProps = state => {
  return {
    popupValues: state.settings.popupValues,
    country: state.settings.country,
    currentTab: Router && Router.router ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WarehousePopup)
