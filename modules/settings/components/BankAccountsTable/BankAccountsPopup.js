import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import {
  closePopup,
  putBankAccountRequest,
  postNewBankAccountRequest
} from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui'

class BankAccountsPopup extends React.Component {
  submitHandler = (values, actions) => {
    if (this.props.popupValues) {
      this.props.putBankAccountRequest(
        {
          ...values,
          tab: this.props.currentTab.name === 'Bank accounts' ? 'bank' : null
        },
        this.props.popupValues.branchId
      )
    } else {
      this.props.postNewBankAccountRequest({
        ...values,
        tab: this.props.currentTab.name === 'Bank accounts' ? 'bank' : null
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
      routingNumber = ''
    } = popupValues || {}

    return {
      accountHolderName,
      accountHolderType,
      account,
      routingNumber
    }
  }

  render() {
    const {
      closePopup,
      popupValues,
      country,
      currency,
      currentTab
    } = this.props
    const title = popupValues ? 'Edit' : 'Add'

    return (
      <Modal open centered={false}>
        <Modal.Header>
          {`${title} `} {currentTab.name}
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={this.getInitialFormValues()}
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
              <Dropdown label="Currency" name="currency" options={currency} />
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
  postNewBankAccountRequest,
  putBankAccountRequest,
  closePopup
}
const mapStateToProps = state => {
  return {
    popupValues: state.settings.popupValues,
    country: state.settings.country,
    currency: state.settings.currency,
    currentTab: state.settings.currentTab
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankAccountsPopup)
