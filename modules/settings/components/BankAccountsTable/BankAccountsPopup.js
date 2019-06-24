import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import {
  closePopup,
  putBankAccountRequest,
  postNewBankAccountRequest
} from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui'
import Router from "next/router"
import * as Yup from 'yup'


const initialFormValues = {
  accountNumber: '',
  bankAccountType: '',
  name: '',
  routingNumber: ''
}

const formValidation = Yup.object().shape({
  accountNumber: Yup.string().trim().min(3, 'Too short').required('Required'),
  bankAccountType: Yup.string().trim().min(3, 'Too short').required('Required'),
  name: Yup.string().trim().min(3, 'Too short').required('Required'),
  routingNumber: Yup.string().trim().min(9, 'Routing number must be 9 characters long').required('Required')
})

const bankAccountType = [
  {
    key: 1,
    text: 'checking',
    value: 'checking',
  },
  {
    key: 2,
    text: 'savings',
    value: 'savings',
  }
]

class BankAccountsPopup extends React.Component {
  submitHandler = (values, actions) => {
    if (this.props.popupValues) {
      this.props.putBankAccountRequest(
        {
          ...values,
          tab: this.props.currentTab.type === 'bank-accounts' ? 'bank' : null
        },
        this.props.popupValues.branchId
      )
    } else {
      this.props.postNewBankAccountRequest(values)
    }
    actions.setSubmitting(false)
  }

  render() {
    const {
      closePopup,
      popupValues
    } = this.props
    const title = popupValues ? 'Edit' : 'Add'

    return (
      <Modal open centered={false}>
        <Modal.Header>
          {`${title} `} Bank Account
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={closePopup}
            onSubmit={this.submitHandler}
            validateOnChange={false}
            validateOnBlur={false}
          >
            <FormGroup widths="equal">
              <Input 
                type="text"
                label="Account Number"
                name="accountNumber"
              />
              <Dropdown  label="Account Type" name="bankAccountType" options={bankAccountType} />
            </FormGroup>
            <FormGroup widths="equal">
              <Input 
                type="text"
                label="Name"
                name="name"
              />
              <Input 
                type="text"
                label="Routing Number"
                name="routingNumber"
              />
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
    currentTab: Router && Router.router && Router.router.query && Router.router.query.type ?
        state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankAccountsPopup)
