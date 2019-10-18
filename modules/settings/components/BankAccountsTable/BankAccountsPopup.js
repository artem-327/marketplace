import React from 'react'
import { connect } from 'react-redux'

import { withToastManager } from 'react-toast-notifications'
import { Modal, FormGroup } from 'semantic-ui-react'

import {
  closePopup,
  putBankAccountRequest,
  postNewBankAccountRequest
} from '../../actions'

import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import Router from 'next/router'
import * as Yup from 'yup'
import { FormattedMessage, injectIntl } from 'react-intl'

import { currency } from '~/constants/index'
import { generateToastMarkup } from '~/utils/functions'
import { errorMessages } from '~/constants/yupValidation'

const initialFormValues = {
  accountNumber: '',
  bankAccountType: '',
  name: '',
  routingNumber: ''
}


const formValidation = Yup.object().shape({
  accountNumber: Yup.string().trim()
    .min(4, errorMessages.minLength(4))
    .max(17, errorMessages.maxLength(17))
    .test('numeric-string', errorMessages.mustBeNumber, (value) => /^[0-9]*$/gm.test(value))
    .required(errorMessages.requiredMessage),
  bankAccountType: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
  name: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
  routingNumber: Yup.string().trim().matches(/^\d{9}$/, errorMessages.exactLength(9)).required(errorMessages.requiredMessage)
})

const bankAccountType = [
  {
    key: 1,
    text: <FormattedMessage id='settings.checking' defaultMessage='Checking' />,
    value: 'checking',
  },
  {
    key: 2,
    text: <FormattedMessage id='settings.savings' defaultMessage='Savings' />,
    value: 'savings',
  }
]

class BankAccountsPopup extends React.Component {
  submitHandler = async (values, { setSubmitting }) => {
    const { postNewBankAccountRequest, toastManager } = this.props

    try {
      await postNewBankAccountRequest(values)

      toastManager.add(generateToastMarkup(
        <FormattedMessage id='notifications.bankAccountCreated.header' />,
        <FormattedMessage id='notifications.bankAccountCreated.content' values={{ name: values.name }} />
      ), {
          appearance: 'success'
        })
    }
    catch { }
    finally { setSubmitting(false) }
  }

  render() {
    const {
      closePopup,
      popupValues,
      intl: { formatMessage }
    } = this.props

    return (
      <Modal closeIcon onClose={() => closePopup()} open centered={false}>
        <Modal.Header>
          {popupValues
            ? <FormattedMessage id='settings.EditBankAcc' defaultMessage='Edit Bank Account' />
            : <FormattedMessage id='settings.AddBankAcc' defaultMessage='Add Bank Account' />
          }
        </Modal.Header>
        <Modal.Content>
          <Form
            enableReinitialize
            initialValues={{
              ...initialFormValues,
              ...popupValues
            }}
            validationSchema={formValidation}
            onReset={closePopup}
            onSubmit={this.submitHandler}
            // validateOnChange={false}
            validateOnBlur={false}
          >
            <FormGroup widths='equal' data-test='settings_bank_account_accountNumber_inp'>
              <Input
                type='text'
                label={formatMessage({ id: 'settings.accountNumber', defaultMessage: 'Account Number' })}
                name='accountNumber'
              />
              <Dropdown
                label={formatMessage({ id: 'settings.accountType', defaultMessage: 'Account Type' })}
                name='bankAccountType'
                options={bankAccountType}
                inputProps={{ 'data-test': 'settings_bank_account_popup_type_drpdn' }} />
            </FormGroup>
            <FormGroup widths='equal' data-test='settings_bank_account_nameNumber_inp'>
              <Input
                type='text'
                label={formatMessage({ id: 'global.name', defaultMessage: 'Name' })}
                name='name'
              />
              <Input
                type='text'
                label={formatMessage({ id: 'settings.routingNumber', defaultMessage: 'Routing Number' })}
                name='routingNumber'
              />
            </FormGroup>
            <div style={{ textAlign: 'right' }}>
              <Button.Reset onClick={closePopup} data-test='settings_bank_account_popup_reset_btn'>
                <FormattedMessage id='global.cancel' defaultMessage='Cancel'>{(text) => text}</FormattedMessage>
              </Button.Reset>
              <Button.Submit data-test='settings_bank_account_popup_submit_btn'>
                <FormattedMessage id='global.save' defaultMessage='Save'>{(text) => text}</FormattedMessage>
              </Button.Submit>
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
    currency: gettSafe(() => state.settings.currency, currency),
    currentTab: Router && Router.router && Router.router.query && Router.router.query.type ?
      state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
  }
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(BankAccountsPopup)))
