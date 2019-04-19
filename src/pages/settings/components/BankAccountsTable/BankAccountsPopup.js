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

const formValidation = Yup.object().shape({
  accountHolderName: Yup.string()
    .min(3, 'Too short')
    .required('Required'),
  accountHolderType: Yup.string()
    .min(3, 'Too short')
    .required('Required'),
  account: Yup.string()
    .min(3, 'Too short')
    .required('Required'),
  currency: Yup.string()
    .min(3, 'Too short')
    .required('Required'),
  routingNumber: Yup.string()
    .min(3, 'Too short')
    .required('Required')
})

class BankAccountsPopup extends React.Component {
  submitHandler = (values, actions) => {
    if (this.props.popupValues) {
      this.props.handlerSubmitWarehouseEditPopup(
        {
          ...values,
          tab: this.props.currentTab === 'Bank accounts' ? 'bank' : null
        },
        this.props.popupValues.branchId
      )
    } else {
      this.props.postNewWarehouseRequest({
        ...values,
        tab: this.props.currentTab === 'Bank accounts' ? 'bank' : null
      })
    }
    actions.setSubmitting(false)
  }

  getInitialFormValues = () => {
    const { popupValues } = this.props

    const {
      accountHolderName = '',
      accountHolderType = '',
      account = '',
      currency = '',
      routingNumber = ''
    } = popupValues || {}

    return {
      accountHolderName,
      accountHolderType,
      account,
      currency,
      routingNumber
    }
  }

  render() {
    const { closePopup, popupValues, country, currentTab } = this.props
    const title = popupValues ? 'Edit' : 'Add'

    return (
      <Modal open centered={false}>
        <Modal.Header>
          {`${title} `} {currentTab}
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={this.getInitialFormValues()}
            validationSchema={formValidation}
            onReset={closePopup}
            onSubmit={this.submitHandler}
          >
            <FormGroup widths="equal">
              <Input
                type="text"
                label="Account Holder Name"
                name="accountHolderName"
              />
              <Input
                type="text"
                label="Account Holder Type"
                name="accountHolderType"
              />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Account Number" name="account" />
              <Dropdown label="Country" name="country" options={country} />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Currency" name="currency" />
              <Input type="text" label="Routing Number" name="routingNumber" />
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
    currentTab: state.settings.currentTab
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankAccountsPopup)
